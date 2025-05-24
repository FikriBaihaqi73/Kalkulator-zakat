import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatRikaz } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatRikazPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nilaiTemuan: '',
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

    if (!formData.nilaiTemuan || parseFloat(formData.nilaiTemuan) <= 0) {
      newErrors.nilaiTemuan = 'Nilai barang temuan harus diisi dan lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const calculationResult = calculateZakatRikaz(
      parseFloat(formData.nilaiTemuan)
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      nilaiTemuan: '',
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Rikaz (Barang Temuan)">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Rikaz (Barang Temuan)</h1>
          <p className={styles.description}>
            Hitung zakat dari barang temuan (rikaz) sebesar 20% dari nilai total.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Nilai Total Barang Temuan"
                  type="number"
                  value={formData.nilaiTemuan}
                  onChange={(value) => handleInputChange('nilaiTemuan', value)}
                  placeholder="Masukkan nilai total barang temuan"
                  required
                  error={errors.nilaiTemuan}
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
              {/* Ensure result is not null before passing */}
              {result && <ResultDisplay result={result} zakatType="rikaz" />}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatRikazPage;