import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatTabungan } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, NISHAB } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatTabunganPage: React.FC = () => {
  const [formData, setFormData] = useState({
    saldoTabungan: '',
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
    
    if (!formData.saldoTabungan || parseFloat(formData.saldoTabungan) <= 0) {
      newErrors.saldoTabungan = 'Saldo tabungan harus lebih dari 0';
    }
    
    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const calculationResult = calculateZakatTabungan(
      parseFloat(formData.saldoTabungan),
      parseFloat(formData.hargaEmas),
      formData.sudahSetahun
    );
    
    setResult(calculationResult);
  };
  
  const handleReset = () => {
    setFormData({
      saldoTabungan: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString(),
      sudahSetahun: true
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <Layout title="Kalkulator Zakat Tabungan">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Tabungan</h1>
          <p className={styles.description}>
            Zakat tabungan wajib dikeluarkan jika saldo mencapai nishab dan disimpan selama 1 tahun.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Saldo Tabungan"
                  type="number"
                  value={formData.saldoTabungan}
                  onChange={(value) => handleInputChange('saldoTabungan', value)}
                  placeholder="Masukkan total saldo tabungan"
                  required
                  error={errors.saldoTabungan}
                  prefix="Rp"
                />
                
                <InputField
                  label="Harga Emas per Gram"
                  type="number"
                  value={formData.hargaEmas}
                  onChange={(value) => handleInputChange('hargaEmas', value)}
                  placeholder="Harga emas saat ini"
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
                    Tabungan sudah disimpan selama 1 tahun (haul)
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
              <ResultDisplay result={result} zakatType="tabungan" />
            </div>
          )}
        </div>
        
        <div className={styles.info}>
          <Card title="ℹ️ Informasi Zakat Tabungan">
            <ul className={styles.infoList}>
              <li>Nishab: setara dengan {NISHAB.EMAS} gram emas</li>
              <li>Haul: tabungan harus disimpan minimal 1 tahun</li>
              <li>Zakat: 2.5% dari total saldo tabungan</li>
              <li>Termasuk: tabungan, deposito, giro</li>
              <li>Hitung semua rekening yang dimiliki</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatTabunganPage;