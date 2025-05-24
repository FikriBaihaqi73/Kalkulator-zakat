import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatAsetProduktif } from '@/utils/zakatCalculations'; // Use aset produktif calculation
import { /* formatCurrency, */ parseNumber } from '@/utils/formatCurrency'; // Removed formatCurrency import
import { validatePositiveNumber } from '@/utils/validation';
import { ZakatCalculationResult } from '@/types/zakat'; // Import ZakatCalculationResult

const ZakatKendaraanNiagaPage: React.FC = () => {
  const [pendapatanTahunan, setPendapatanTahunan] = useState<string>(''); // State type is string
  const [biayaOperasionalTahunan, setBiayaOperasionalTahunan] = useState<string>(''); // State type is string
  const [hargaEmas, setHargaEmas] = useState<string>(''); // State type is string
  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const pendapatanTahunanNum = parseNumber(pendapatanTahunan); // Parse string value for calculation
    const biayaOperasionalTahunanNum = parseNumber(biayaOperasionalTahunan); // Parse string value for calculation
    const hargaEmasNum = parseNumber(hargaEmas); // Parse string value for calculation

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
    setPendapatanTahunan(''); // Reset to empty string
    setBiayaOperasionalTahunan(''); // Reset to empty string
    setHargaEmas(''); // Reset to empty string
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
            value={pendapatanTahunan} // Use raw string value for display
            onChange={setPendapatanTahunan} // Pass state setter directly
            placeholder="Masukkan total pendapatan tahunan"
            required
            prefix="Rp"
            useThousandSeparator={true} // Tambahkan ini
          />
           <InputField
            label="Biaya Operasional Tahunan (Rp)"
            id="biayaOperasionalTahunan"
            value={biayaOperasionalTahunan} // Use raw string value for display
            onChange={setBiayaOperasionalTahunan} // Pass state setter directly
            placeholder="Masukkan total biaya operasional tahunan"
            required
            prefix="Rp"
            useThousandSeparator={true} // Tambahkan ini
          />
          <InputField
            label="Harga Emas Saat Ini per Gram (Rp)"
            id="hargaEmas"
            value={hargaEmas} // Use raw string value for display
            onChange={setHargaEmas} // Pass state setter directly
            placeholder="Masukkan harga emas per gram"
            required
            prefix="Rp"
            useThousandSeparator={true} // Tambahkan ini
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>Hitung Zakat</Button>
            <Button onClick={handleReset} variant="secondary">Reset</Button>
          </div>
          {result !== null && <ResultDisplay result={result} />} {/* Use zakatType "kendaraan_niaga" */}
        </Card>
      </div>
    </Layout>
  );
};

export default ZakatKendaraanNiagaPage;