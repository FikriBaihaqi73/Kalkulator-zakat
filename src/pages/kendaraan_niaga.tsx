import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatAsetProduktif } from '@/utils/zakatCalculations'; // Use aset produktif calculation
import { formatCurrency, parseNumber } from '@/utils/formatCurrency';
import { validatePositiveNumber } from '@/utils/validation';

const ZakatKendaraanNiagaPage: React.FC = () => {
  const [pendapatanTahunan, setPendapatanTahunan] = useState<string>('');
  const [biayaOperasionalTahunan, setBiayaOperasionalTahunan] = useState<string>('');
  const [hargaEmas, setHargaEmas] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const pendapatanTahunanNum = parseNumber(pendapatanTahunan);
    const biayaOperasionalTahunanNum = parseNumber(biayaOperasionalTahunan);
    const hargaEmasNum = parseNumber(hargaEmas);

    if (!validatePositiveNumber(pendapatanTahunanNum) || !validatePositiveNumber(biayaOperasionalTahunanNum) || !validatePositiveNumber(hargaEmasNum)) {
      setError('Mohon masukkan angka yang valid dan positif untuk semua field.');
      setResult(null);
      return;
    }

    setError(null);
    // Zakat Kendaraan Niaga calculated as Zakat Aset Produktif (net annual profit)
    const calculationResult = calculateZakatAsetProduktif(pendapatanTahunanNum, biayaOperasionalTahunanNum, hargaEmasNum);
    setResult(calculationResult);
  };

  const handleReset = () => {
    setPendapatanTahunan('');
    setBiayaOperasionalTahunan('');
    setHargaEmas('');
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card title="Kalkulator Zakat Kendaraan Niaga">
          <p className="mb-6 text-gray-700">
            Zakat kendaraan niaga (seperti truk, mobil usaha, motor ojek online) dihitung dari keuntungan bersih tahunan, sama seperti zakat aset produktif. Wajib dikeluarkan sebesar 2.5% jika keuntungan bersih setelah dikurangi biaya operasional mencapai nishab (setara 85 gram emas) dan telah berjalan selama satu tahun (haul).
          </p>
          <InputField
            label="Pendapatan Tahunan (Rp)"
            id="pendapatanTahunan"
            value={pendapatanTahunan}
            onChange={(e) => setPendapatanTahunan(formatCurrency(parseNumber(e)))}
            placeholder="Masukkan total pendapatan tahunan"
            required
          />
           <InputField
            label="Biaya Operasional Tahunan (Rp)"
            id="biayaOperasionalTahunan"
            value={biayaOperasionalTahunan}
            onChange={(e) => setBiayaOperasionalTahunan(formatCurrency(parseNumber(e)))}
            placeholder="Masukkan total biaya operasional tahunan"
            required
          />
          <InputField
            label="Harga Emas Saat Ini per Gram (Rp)"
            id="hargaEmas"
            value={hargaEmas}
            onChange={(e) => setHargaEmas(formatCurrency(parseNumber(e)))}
            placeholder="Masukkan harga emas per gram"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>Hitung Zakat</Button>
            <Button onClick={handleReset} variant="secondary">Reset</Button>
          </div>
          {result !== null && <ResultDisplay result={result} zakatType="kendaraan_niaga" />} {/* Use zakatType "kendaraan_niaga" */}
        </Card>
      </div>
    </Layout>
  );
};

export default ZakatKendaraanNiagaPage;