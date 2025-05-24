import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatProfesi } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatProfesiPage: React.FC = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    otherIncome: '',
    deductions: '',
    nishabEmas: '', // Allow manual input for nishab emas
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

    if (!formData.monthlyIncome || parseFloat(formData.monthlyIncome) < 0) {
      newErrors.monthlyIncome = 'Pendapatan bulanan harus diisi dan tidak boleh negatif';
    }

    if (formData.otherIncome && parseFloat(formData.otherIncome) < 0) {
      newErrors.otherIncome = 'Pendapatan lain tidak boleh negatif';
    }

     if (formData.deductions && parseFloat(formData.deductions) < 0) {
      newErrors.deductions = 'Pengeluaran/hutang tidak boleh negatif';
    }

    if (!formData.nishabEmas || parseFloat(formData.nishabEmas) <= 0) {
        newErrors.nishabEmas = 'Harga nishab emas per gram harus diisi dan lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate net income before calling the function
    const netIncome = parseFloat(formData.monthlyIncome) +
                      parseFloat(formData.otherIncome || '0') -
                      parseFloat(formData.deductions || '0');

    const calculationResult = calculateZakatProfesi(
      netIncome, // Pass net income
      parseFloat(formData.nishabEmas)
      // Removed extra arguments
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      monthlyIncome: '',
      otherIncome: '',
      deductions: '',
      nishabEmas: '',
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Profesi">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Profesi</h1>
          <p className={styles.description}>
            Hitung zakat dari pendapatan profesi bulanan atau tahunan yang mencapai nishab emas.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Pendapatan Bulanan (Bersih)"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(value) => handleInputChange('monthlyIncome', value)}
                  placeholder="Masukkan pendapatan bulanan bersih"
                  required
                  error={errors.monthlyIncome}
                  prefix="Rp"
                />

                 <InputField
                  label="Pendapatan Lain (Opsional)"
                  type="number"
                  value={formData.otherIncome}
                  onChange={(value) => handleInputChange('otherIncome', value)}
                  placeholder="Masukkan pendapatan lain (jika ada)"
                  error={errors.otherIncome}
                  prefix="Rp"
                />

                 <InputField
                  label="Pengeluaran/Hutang (Opsional)"
                  type="number"
                  value={formData.deductions}
                  onChange={(value) => handleInputChange('deductions', value)}
                  placeholder="Masukkan pengeluaran atau hutang (jika ada)"
                  error={errors.deductions}
                  prefix="Rp"
                />

                <InputField
                  label="Harga Emas per Gram (untuk Nishab)"
                  type="number"
                  value={formData.nishabEmas}
                  onChange={(value) => handleInputChange('nishabEmas', value)}
                  placeholder="Masukkan harga emas per gram saat ini"
                  required
                  error={errors.nishabEmas}
                  prefix="Rp"
                  suffix="/gram"
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
              <ResultDisplay result={result}/>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatProfesiPage;