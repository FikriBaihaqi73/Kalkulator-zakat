import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatTabungan } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatKriptoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nilaiAsetDigital: '',
    hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
    sudahSetahun: true
  });

  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalculate = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nilaiAsetDigital || parseFloat(formData.nilaiAsetDigital) <= 0) {
      newErrors.nilaiAsetDigital = 'Nilai aset digital harus lebih dari 0';
    }

    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Use calculateZakatTabungan as the logic is similar
    const calculationResult = calculateZakatTabungan(
      parseFloat(formData.nilaiAsetDigital),
      parseFloat(formData.hargaEmas),
      formData.sudahSetahun
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      nilaiAsetDigital: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
      sudahSetahun: true
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Kripto & Aset Digital">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Kripto & Aset Digital</h1>
          <p className={styles.description}>
            Hitung zakat dari kepemilikan aset kripto dan aset digital lainnya yang mencapai nishab dan sudah dimiliki selama 1 tahun.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Nilai Total Aset Digital (Harga Pasar)"
                  type="number"
                  value={formData.nilaiAsetDigital}
                  onChange={(value) => handleInputChange('nilaiAsetDigital', value)}
                  placeholder="Masukkan nilai total aset digital Anda"
                  required
                  error={errors.nilaiAsetDigital}
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

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="sudahSetahun"
                    checked={formData.sudahSetahun}
                    onChange={(e) => handleInputChange('sudahSetahun', e.target.checked)}
                  />
                  <label htmlFor="sudahSetahun">Sudah dimiliki selama 1 tahun (haul)?</label>
                </div>

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

export default ZakatKriptoPage;