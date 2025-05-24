import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatAsetProduktif } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatAsetProduktifPage: React.FC = () => {
  const [formData, setFormData] = useState({
    pendapatanSewa: '',
    biayaOperasional: '',
    hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
  });

  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalculate = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.pendapatanSewa || parseFloat(formData.pendapatanSewa) < 0) {
      newErrors.pendapatanSewa = 'Pendapatan sewa harus diisi dan tidak boleh negatif';
    }

    if (!formData.biayaOperasional || parseFloat(formData.biayaOperasional) < 0) {
      newErrors.biayaOperasional = 'Biaya operasional harus diisi dan tidak boleh negatif';
    }

    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const calculationResult = calculateZakatAsetProduktif(
      parseFloat(formData.pendapatanSewa),
      parseFloat(formData.biayaOperasional),
      parseFloat(formData.hargaEmas)
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      pendapatanSewa: '',
      biayaOperasional: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Aset Produktif">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Aset Produktif</h1>
          <p className={styles.description}>
            Hitung zakat dari aset produktif seperti properti yang disewakan.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Pendapatan Sewa Tahunan"
                  type="number"
                  value={formData.pendapatanSewa}
                  onChange={(value) => handleInputChange('pendapatanSewa', value)}
                  placeholder="Masukkan total pendapatan sewa setahun"
                  required
                  error={errors.pendapatanSewa}
                  prefix="Rp"
                />

                <InputField
                  label="Biaya Operasional Tahunan"
                  type="number"
                  value={formData.biayaOperasional}
                  onChange={(value) => handleInputChange('biayaOperasional', value)}
                  placeholder="Masukkan total biaya operasional setahun"
                  required
                  error={errors.biayaOperasional}
                  prefix="Rp"
                />

                <InputField
                  label="Harga Emas per Gram Saat Ini"
                  type="number"
                  value={formData.hargaEmas}
                  onChange={(value) => handleInputChange('hargaEmas', value)}
                  placeholder="Masukkan harga emas per gram"
                  required
                  error={errors.hargaEmas}
                  prefix="Rp"
                />

                <div className={styles.buttonGroup}>
                  <Button onClick={handleCalculate} variant="primary">Hitung Zakat</Button>
                  <Button onClick={handleReset} variant="secondary">Reset</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.resultSection}>
            <Card title="Hasil Perhitungan">
              <ResultDisplay result={result} />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatAsetProduktifPage;