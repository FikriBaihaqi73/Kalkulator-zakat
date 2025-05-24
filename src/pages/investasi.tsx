import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatInvestasi } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, NISHAB } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatInvestasiPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nilaiInvestasi: '',
    keuntungan: '',
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
    
    if (!formData.nilaiInvestasi || parseFloat(formData.nilaiInvestasi) < 0) {
      newErrors.nilaiInvestasi = 'Nilai investasi tidak boleh negatif';
    }
    
    if (!formData.keuntungan || parseFloat(formData.keuntungan) < 0) {
      newErrors.keuntungan = 'Keuntungan tidak boleh negatif';
    }
    
    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const calculationResult = calculateZakatInvestasi(
      parseFloat(formData.nilaiInvestasi) || 0,
      parseFloat(formData.keuntungan) || 0,
      parseFloat(formData.hargaEmas),
      formData.sudahSetahun
    );
    
    setResult(calculationResult);
  };
  
  const handleReset = () => {
    setFormData({
      nilaiInvestasi: '',
      keuntungan: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
      sudahSetahun: true
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <Layout title="Kalkulator Zakat Investasi & Saham">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Investasi & Saham</h1>
          <p className={styles.description}>
            Hitung zakat dari investasi dan saham yang menguntungkan, mencapai nishab, dan sudah dipegang selama 1 tahun.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Nilai Modal Investasi"
                  type="number"
                  value={formData.nilaiInvestasi}
                  onChange={(value) => handleInputChange('nilaiInvestasi', value)}
                  placeholder="Modal awal investasi/pembelian saham"
                  required
                  error={errors.nilaiInvestasi}
                  prefix="Rp"
                />
                
                <InputField
                  label="Keuntungan/Capital Gain"
                  type="number"
                  value={formData.keuntungan}
                  onChange={(value) => handleInputChange('keuntungan', value)}
                  placeholder="Keuntungan dari investasi/dividen saham"
                  required
                  error={errors.keuntungan}
                  prefix="Rp"
                />
                
                <InputField
                  label="Harga Emas per Gram"
                  type="number"
                  value={formData.hargaEmas}
                  onChange={(value) => handleInputChange('hargaEmas', value)}
                  placeholder="Harga emas saat ini untuk nishab"
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
                    Investasi sudah dipegang selama 1 tahun (haul)
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
              <ResultDisplay result={result} zakatType="investasi" />
            </div>
          )}
        </div>
        
        <div className={styles.info}>
          <Card title="ℹ️ Informasi Zakat Investasi & Saham">
            <ul className={styles.infoList}>
              <li>Nishab: setara dengan {NISHAB.EMAS} gram emas</li>
              <li>Zakat dihitung dari keuntungan/capital gain, bukan modal</li>
              <li>Besaran zakat: 2.5% dari keuntungan</li>
              <li>Haul: investasi harus dipegang minimal 1 tahun</li>
              <li>Termasuk: saham, reksadana, obligasi, cryptocurrency</li>
              <li>Jika rugi, tidak ada kewajiban zakat</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatInvestasiPage;