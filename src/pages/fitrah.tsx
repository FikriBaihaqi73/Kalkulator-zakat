import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatFitrah } from '@/utils/zakatCalculations';
// import { validateZakatForm } from '@/utils/validation'; // Removed unused import
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, ZAKAT_FITRAH } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatFitrahPage: React.FC = () => {
  const [formData, setFormData] = useState({
    jumlahKeluarga: '',
    hargaBeras: DEFAULT_PRICES.BERAS_PER_KG.toString(),
    beratPerOrang: ZAKAT_FITRAH.BERAS_PER_ORANG.toString()
  });
  
  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleCalculate = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validation
    if (!formData.jumlahKeluarga || parseInt(formData.jumlahKeluarga) <= 0) {
      newErrors.jumlahKeluarga = 'Jumlah anggota keluarga harus lebih dari 0';
    }
    
    if (!formData.hargaBeras || parseFloat(formData.hargaBeras) <= 0) {
      newErrors.hargaBeras = 'Harga beras harus lebih dari 0';
    }
    
    if (!formData.beratPerOrang || parseFloat(formData.beratPerOrang) <= 0) {
      newErrors.beratPerOrang = 'Berat per orang harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Calculate
    const calculationResult = calculateZakatFitrah(
      parseInt(formData.jumlahKeluarga),
      parseFloat(formData.hargaBeras),
      parseFloat(formData.beratPerOrang)
    );
    
    setResult(calculationResult);
  };
  
  const handleReset = () => {
    setFormData({
      jumlahKeluarga: '',
      hargaBeras: DEFAULT_PRICES.BERAS_PER_KG.toString(),
      beratPerOrang: ZAKAT_FITRAH.BERAS_PER_ORANG.toString()
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <Layout title="Kalkulator Zakat Fitrah">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Fitrah</h1>
          <p className={styles.description}>
            Zakat fitrah adalah zakat yang wajib dikeluarkan oleh setiap Muslim menjelang Idul Fitri.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Jumlah Anggota Keluarga"
                  type="number"
                  value={formData.jumlahKeluarga}
                  onChange={(value) => handleInputChange('jumlahKeluarga', value)}
                  placeholder="Masukkan jumlah anggota keluarga"
                  required
                  error={errors.jumlahKeluarga}
                  suffix="orang"
                />
                
                <InputField
                  label="Harga Beras per Kg"
                  type="number"
                  value={formData.hargaBeras}
                  onChange={(value) => handleInputChange('hargaBeras', value)}
                  placeholder="Masukkan harga beras per kg"
                  required
                  error={errors.hargaBeras}
                  prefix="Rp"
                  useThousandSeparator={true} // Tambahkan ini
                />
                
                <InputField
                  label="Berat Beras per Orang"
                  type="number"
                  value={formData.beratPerOrang}
                  onChange={(value) => handleInputChange('beratPerOrang', value)}
                  placeholder="2.5 - 3.5 kg"
                  required
                  error={errors.beratPerOrang}
                  suffix="kg"
                />
                
                <div className={styles.buttonGroup}>
                  <Button onClick={handleCalculate} variant="primary">
                    Hitung Zakat
                  </Button>
                  <Button onClick={handleReset} variant="secondary">
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {result && (
            <div className={styles.resultSection}>
              <ResultDisplay result={result} />
            </div>
          )}
        </div>
        
        <div className={styles.info}>
          <Card title="ℹ️ Informasi Zakat Fitrah">
            <ul className={styles.infoList}>
              <li>Zakat fitrah wajib bagi setiap Muslim yang mampu</li>
              <li>Dibayarkan sebelum shalat Idul Fitri</li>
              <li>Ukuran standar: 2.5-3.5 kg beras per orang</li>
              <li>Dapat dibayar dalam bentuk uang senilai beras</li>
              <li>Diberikan kepada fakir miskin dan mustahik lainnya</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatFitrahPage;