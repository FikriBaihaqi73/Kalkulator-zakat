import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
// Update import to use the new function name
import { calculateZakatEmasPerak } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, NISHAB } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatEmasPage: React.FC = () => {
  const [formData, setFormData] = useState({
    beratEmas: '', // Keep the name for simplicity, represents berat emas/perak
    hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(), // Keep the name, represents harga per gram emas/perak
    sudahSetahun: true
  });

  const [zakatType, setZakatType] = useState<'emas' | 'perak'>('emas');

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

    // Use appropriate nishab and price based on zakatType - This logic is now inside calculateZakatEmasPerak
    // const nishab = zakatType === 'emas' ? NISHAB.EMAS : NISHAB.PERAK;
    // const defaultPrice = zakatType === 'emas' ? DEFAULT_PRICES.EMAS_PER_GRAM : DEFAULT_PRICES.PERAK_PER_GRAM;

    if (!formData.beratEmas || parseFloat(formData.beratEmas) <= 0) {
      newErrors.beratEmas = `Berat ${zakatType} harus lebih dari 0`;
    }

    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = `Harga ${zakatType} per gram harus lebih dari 0`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call the new function and pass the zakatType
    const calculationResult = calculateZakatEmasPerak(
      parseFloat(formData.beratEmas),
      parseFloat(formData.hargaEmas),
      zakatType, // Pass the selected type
      formData.sudahSetahun
    );

    // Adjust explanation based on zakatType - This is now handled inside calculateZakatEmasPerak
    // if (calculationResult) {
    //     calculationResult.explanation = calculationResult.explanation.replace('emas', zakatType);
    // }

    setResult(calculationResult);
  };

  const handleReset = () => {
    setFormData({
      beratEmas: '',
      hargaEmas: zakatType === 'emas' ? DEFAULT_PRICES.EMAS_PER_GRAM.toString() : DEFAULT_PRICES.PERAK_PER_GRAM.toString(),
      sudahSetahun: true
    });
    setResult(null);
    setErrors({});
  };

  return (
    <Layout title={`Kalkulator Zakat ${zakatType === 'emas' ? 'Emas' : 'Perak'}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Emas & Perak</h1>
          <p className={styles.description}>
            Hitung zakat dari kepemilikan emas dan perak yang mencapai nishab dan disimpan selama 1 tahun.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                {/* Add Zakat Type Selection */}
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="emas"
                      checked={zakatType === 'emas'}
                      onChange={() => setZakatType('emas')}
                      className={styles.radio}
                    />
                    Emas
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="perak"
                      checked={zakatType === 'perak'}
                      onChange={() => setZakatType('perak')}
                      className={styles.radio}
                    />
                    Perak
                  </label>
                </div>

                <InputField
                  label={`Berat ${zakatType === 'emas' ? 'Emas' : 'Perak'}`}
                  type="number"
                  value={formData.beratEmas}
                  onChange={(value) => handleInputChange('beratEmas', value)}
                  placeholder={`Masukkan berat dalam gram ${zakatType === 'emas' ? 'emas' : 'perak'}`}
                  required
                  error={errors.beratEmas}
                  suffix="gram"
                  useThousandSeparator={true}
                />

                <InputField
                  label={`Harga per Gram ${zakatType === 'emas' ? 'Emas' : 'Perak'}`}
                  type="number"
                  value={formData.hargaEmas}
                  onChange={(value) => handleInputChange('hargaEmas', value)}
                  placeholder={`Masukkan harga per gram ${zakatType === 'emas' ? 'emas' : 'perak'}`}
                  required
                  error={errors.hargaEmas}
                  prefix="Rp"
                  useThousandSeparator={true}
                />

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.sudahSetahun}
                      onChange={(e) => handleInputChange('sudahSetahun', e.target.checked)}
                      className={styles.checkbox}
                    />
                    Sudah disimpan selama 1 tahun (haul)
                  </label>
                </div>

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
          <Card title={`ℹ️ Informasi Zakat ${zakatType === 'emas' ? 'Emas' : 'Perak'}`}>
            <ul className={styles.infoList}>
              <li>Nishab emas: {NISHAB.EMAS} gram</li>
              <li>Nishab perak: {NISHAB.PERAK} gram</li>
              <li>Zakat wajib jika mencapai nishab dan disimpan 1 tahun</li>
              <li>Besaran zakat: 2.5% dari total nilai</li>
              <li>Perhitungan berdasarkan harga pasar saat ini</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatEmasPage;