import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatRikaz } from '@/utils/zakatCalculations'; // Using Rikaz calculation for Tambang
import { ZakatCalculationResult } from '@/types/zakat';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatTambangLautPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nilaiTambang: '',
    // Add fields for Hasil Laut later if needed
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

    if (!formData.nilaiTambang || parseFloat(formData.nilaiTambang) <= 0) {
      newErrors.nilaiTambang = 'Nilai hasil tambang harus diisi dan lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Zakat Tambang uses the same calculation logic as Rikaz (20%)
    const calculationResult = calculateZakatRikaz(
      parseFloat(formData.nilaiTambang)
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      nilaiTambang: '',
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Tambang & Laut">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Tambang & Laut</h1>
          <p className={styles.description}>
            Hitung zakat dari hasil tambang atau hasil laut.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan Zakat Tambang">
              <div className={styles.form}>
                <InputField
                  label="Nilai Bersih Hasil Tambang"
                  type="number"
                  value={formData.nilaiTambang}
                  onChange={(value) => handleInputChange('nilaiTambang', value)}
                  placeholder="Masukkan nilai bersih hasil tambang"
                  required
                  error={errors.nilaiTambang}
                  prefix="Rp"
                />

                {/* Add form fields for Hasil Laut here if decided */}

                <div className={styles.buttonGroup}>
                  <Button onClick={handleCalculate} variant="primary">Hitung Zakat Tambang</Button>
                  <Button onClick={handleReset} variant="secondary">Reset</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.resultSection}>
            <Card title="Hasil Perhitungan">
              {/* Ensure result is not null before passing */}
              {result && <ResultDisplay result={result} />}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatTambangLautPage;