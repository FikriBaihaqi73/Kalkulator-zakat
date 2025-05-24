import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatPeternakan } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatPeternakanPage: React.FC = () => {
  const [formData, setFormData] = useState({
    jenisTernak: 'kambing', // Default to kambing
    jumlahTernak: '',
    digembalakan: true,
    sudahSetahun: true,
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

    if (!formData.jumlahTernak || parseInt(formData.jumlahTernak) <= 0) {
      newErrors.jumlahTernak = 'Jumlah ternak harus lebih dari 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const calculationResult = calculateZakatPeternakan(
      formData.jenisTernak as 'kambing' | 'sapi' | 'unta', // Type assertion
      parseInt(formData.jumlahTernak),
      formData.digembalakan,
      formData.sudahSetahun
    );

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      jenisTernak: 'kambing',
      jumlahTernak: '',
      digembalakan: true,
      sudahSetahun: true,
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title="Kalkulator Zakat Peternakan">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Peternakan</h1>
          <p className={styles.description}>
            Hitung zakat dari kepemilikan hewan ternak (kambing, sapi, unta) yang mencapai nishab, sudah dimiliki 1 tahun, dan digembalakan.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Jenis Ternak</label>
                  <select
                    className={styles.selectField}
                    value={formData.jenisTernak}
                    onChange={(e) => handleInputChange('jenisTernak', e.target.value)}
                  >
                    <option value="kambing">Kambing/Domba</option>
                    <option value="sapi">Sapi/Kerbau</option>
                    <option value="unta">Unta</option>
                  </select>
                </div>

                <InputField
                  label="Jumlah Ternak"
                  type="number"
                  value={formData.jumlahTernak}
                  onChange={(value) => handleInputChange('jumlahTernak', value)}
                  placeholder="Masukkan jumlah ternak"
                  required
                  error={errors.jumlahTernak}
                  suffix="ekor"
                  useThousandSeparator={true} // Tambahkan ini
                />

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.digembalakan}
                      onChange={(e) => handleInputChange('digembalakan', e.target.checked)}
                    />
                    Digembalakan (tidak dikandangkan terus)
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.sudahSetahun}
                      onChange={(e) => handleInputChange('sudahSetahun', e.target.checked)}
                    />
                    Sudah dimiliki selama 1 tahun (haul)
                  </label>
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
              <ResultDisplay result={result}/>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatPeternakanPage;