import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatPerdagangan } from '@/utils/zakatCalculations';
import { ZakatCalculationResult } from '@/types/zakat';
import { DEFAULT_PRICES, NISHAB } from '@/utils/constants';
import styles from '@/styles/pages/ZakatPage.module.css';

const ZakatPerdaganganPage: React.FC = () => {
  const [formData, setFormData] = useState({
    asetDagang: '',
    piutangDagang: '',
    utangDagang: '',
    hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString()
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
    
    if (!formData.asetDagang || parseFloat(formData.asetDagang) < 0) {
      newErrors.asetDagang = 'Nilai aset dagang tidak boleh negatif';
    }
    
    if (!formData.piutangDagang || parseFloat(formData.piutangDagang) < 0) {
      newErrors.piutangDagang = 'Piutang dagang tidak boleh negatif';
    }
    
    if (!formData.utangDagang || parseFloat(formData.utangDagang) < 0) {
      newErrors.utangDagang = 'Utang dagang tidak boleh negatif';
    }
    
    if (!formData.hargaEmas || parseFloat(formData.hargaEmas) <= 0) {
      newErrors.hargaEmas = 'Harga emas harus lebih dari 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const calculationResult = calculateZakatPerdagangan(
      parseFloat(formData.asetDagang) || 0,
      parseFloat(formData.piutangDagang) || 0,
      parseFloat(formData.utangDagang) || 0,
      parseFloat(formData.hargaEmas)
    );
    
    setResult(calculationResult);
  };
  
  const handleReset = () => {
    setFormData({
      asetDagang: '',
      piutangDagang: '',
      utangDagang: '',
      hargaEmas: DEFAULT_PRICES.EMAS_PER_GRAM.toString()
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <Layout title="Kalkulator Zakat Perdagangan">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kalkulator Zakat Perdagangan</h1>
          <p className={styles.description}>
            Zakat perdagangan dihitung dari total aset dagang ditambah piutang dikurangi utang dagang.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.formSection}>
            <Card title="Form Perhitungan">
              <div className={styles.form}>
                <InputField
                  label="Nilai Aset Dagang"
                  type="number"
                  value={formData.asetDagang}
                  onChange={(value) => handleInputChange('asetDagang', value)}
                  placeholder="Nilai barang dagangan, modal usaha"
                  required
                  error={errors.asetDagang}
                  prefix="Rp"
                  useThousandSeparator={true} // Tambahkan ini
                />
                
                <InputField
                  label="Piutang Dagang"
                  type="number"
                  value={formData.piutangDagang}
                  onChange={(value) => handleInputChange('piutangDagang', value)}
                  placeholder="Piutang yang dapat ditagih"
                  error={errors.piutangDagang}
                  prefix="Rp"
                  useThousandSeparator={true} // Tambahkan ini
                />
                
                <InputField
                  label="Utang Dagang"
                  type="number"
                  value={formData.utangDagang}
                  onChange={(value) => handleInputChange('utangDagang', value)}
                  placeholder="Utang untuk keperluan dagang"
                  error={errors.utangDagang}
                  prefix="Rp"
                  useThousandSeparator={true} // Tambahkan ini
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
                  useThousandSeparator={true} // Tambahkan ini
                />
                
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
          <Card title="ℹ️ Informasi Zakat Perdagangan">
            <ul className={styles.infoList}>
              <li>Nishab: setara dengan {NISHAB.EMAS} gram emas</li>
              <li>Rumus: (Aset Dagang + Piutang) - Utang Dagang</li>
              <li>Zakat: 2.5% dari total aset bersih</li>
              <li>Termasuk: barang dagangan, modal kerja, kas toko</li>
              <li>Haul: aset harus dimiliki selama 1 tahun</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ZakatPerdaganganPage;