import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatEmas } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, NISHAB } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatEmasPage: React.FC = () => {
  const [formData, setFormData] = useState({
    beratEmas: '',
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
    
    if (!formData.beratEmas || parseFloat(formData.beratEmas) <= 0) {
      newErrors.beratEmas = 'Berat emas harus lebih dari 0';
    }
    
    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const calculationResult = calculateZakatEmas(
      parseFloat(formData.beratEmas),
      parseFloat(formData.hargaEmas),
      formData.sudahSetahun
    );
    
    setResult(calculationResult);
  };
  
  const handleReset = () => {
    setFormData({
      beratEmas: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
      sudahSetahun: true
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <Layout title="Kalkulator Zakat Emas & Perak">
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
                <InputField
                  label="Berat Emas/Perak"
                  type="number"
                  value={formData.beratEmas}
                  onChange={(value) => handleInputChange('beratEmas', value)}
                  placeholder="Masukkan berat dalam gram"
                  required
                  error={errors.beratEmas}
                  suffix="gram"
                />
                
                <InputField
                  label="Harga per Gram"
                  type="number"
                  value={formData.hargaEmas}
                  onChange={(value) => handleInputChange('hargaEmas', value)}
                  placeholder="Masukkan harga per gram"
                  required
                  error={errors.hargaEmas}
                  prefix="Rp"
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
              <ResultDisplay result={result} zakatType="emas" />
            </div>
          )}
        </div>
        
        <div className={styles.info}>
          <Card title="ℹ️ Informasi Zakat Emas & Perak">
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