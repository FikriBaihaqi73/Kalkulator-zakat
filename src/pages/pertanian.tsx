import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatPertanian } from '@/utils/zakatCalculations';
import { /* formatCurrency, */ parseNumber } from '@/utils/formatCurrency'; // Removed unused import
import { validatePositiveNumber } from '@/utils/validation';
import styles from '@/styles/pages/ZakatPage.module.css';
import { ZakatCalculationResult } from '@/types/zakat'; // Import ZakatCalculationResult
import dropdownStyles from '@/styles/components/Dropdown.module.css'; // Import new styles

const ZakatPertanianPage: React.FC = () => {
  const [formData, setFormData] = useState({
    hasilPanen: '',
    jenisIrigasi: 'hujan' as 'hujan' | 'irigasi' | 'campuran',
    hargaPerKg: ''
  });

  const [result, setResult] = useState<ZakatCalculationResult | null>(null); // Use specific type
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string | 'hujan' | 'irigasi' | 'campuran') => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalculate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!validatePositiveNumber(parseNumber(formData.hasilPanen))) {
      newErrors.hasilPanen = 'Hasil panen harus lebih dari 0';
    }
    
    if (!validatePositiveNumber(parseNumber(formData.hargaPerKg))) {
      newErrors.hargaPerKg = 'Harga per kg harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const calculationResult = calculateZakatPertanian(
      parseNumber(formData.hasilPanen),
      formData.jenisIrigasi,
      parseNumber(formData.hargaPerKg)
    );
    
    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      hasilPanen: '',
      jenisIrigasi: 'hujan',
      hargaPerKg: ''
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Pertanian">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Pertanian</h1>
          <p className={styles.description}>
            Zakat pertanian wajib dikeluarkan dari hasil panen tanaman yang memiliki nilai ekonomis.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Hasil Panen"
                  type="number"
                  value={formData.hasilPanen}
                  onChange={(value) => handleInputChange('hasilPanen', value)}
                  placeholder="Masukkan total hasil panen dalam kg"
                  required
                  error={errors.hasilPanen}
                  suffix="kg"
                  useThousandSeparator={true} // Tambahkan ini
                />
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Jenis Pengairan <span className={styles.required}>*</span>
                  </label>
                  <select
                    value={formData.jenisIrigasi}
                    onChange={(e) => handleInputChange('jenisIrigasi', e.target.value as 'hujan' | 'irigasi' | 'campuran')}
                    className={dropdownStyles.dropdown} // Use new styles
                  >
                    <option value="hujan">Air Hujan / Sungai (10%)</option>
                    <option value="irigasi">Irigasi (5%)</option>
                    <option value="campuran">Campuran (7.5%)</option>
                  </select>
                </div>
                
                <InputField
                  label="Harga Hasil Panen per Kg"
                  type="number"
                  value={formData.hargaPerKg}
                  onChange={(value) => handleInputChange('hargaPerKg', value)}
                  placeholder="Masukkan harga per kg hasil panen"
                  required
                  error={errors.hargaPerKg}
                  prefix="Rp"
                  useThousandSeparator={true} // Tambahkan ini
                />
                
                <div className={styles.buttonGroup}>
                  <Button onClick={handleCalculate}>Hitung Zakat</Button>
                  <Button onClick={handleReset} variant="secondary">Reset</Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className={styles.resultSection}>
            <ResultDisplay result={result} />
          </div>
          <div className={styles.info}>
              <Card title="Informasi Zakat Pertanian">
                <ul className={styles.infoList}>
                  <li>Nishab zakat pertanian adalah 653 kg hasil panen.</li>
                  <li>Kadar zakat: 10% jika diairi dengan air hujan atau sungai (tanpa biaya irigasi).</li>
                  <li>Kadar zakat: 5% jika diairi dengan irigasi (menggunakan biaya).</li>
                  <li>Kadar zakat: 7.5% jika diairi dengan campuran keduanya.</li>
                  <li>Zakat dikeluarkan setiap kali panen.</li>
                </ul>
              </Card>
            </div>
        </div>
      </div>

    </Layout>
  );
};

export default ZakatPertanianPage;