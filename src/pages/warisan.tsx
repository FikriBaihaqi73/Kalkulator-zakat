import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatTabungan } from '@/utils/zakatCalculations';
import { formatCurrency, parseNumber } from '@/utils/formatCurrency'; // Import parseNumber
import { validatePositiveNumber } from '@/utils/validation';
import { ZakatCalculationResult } from '@/types/zakat'; // Import ZakatCalculationResult

const ZakatWarisanPage: React.FC = () => {
  const [nilaiWarisan, setNilaiWarisan] = useState<number>(0);
  const [hargaEmas, setHargaEmas] = useState<number>(0);
  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    // Use state values directly as they are already numbers
    const nilaiWarisanNum = nilaiWarisan;
    const hargaEmasNum = hargaEmas;

    if (!validatePositiveNumber(nilaiWarisanNum) || !validatePositiveNumber(hargaEmasNum)) {
      setError('Mohon masukkan angka yang valid dan positif untuk semua field.');
      setResult(null);
      return;
    }

    setError(null);
    // Zakat Warisan (undistributed) is calculated like Zakat Tabungan
    const calculationResult = calculateZakatTabungan(nilaiWarisanNum, hargaEmasNum, true);
    setResult(calculationResult);
  };

  const handleReset = () => {
    setNilaiWarisan(0);
    setHargaEmas(0);
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card title="Kalkulator Zakat Warisan (Belum Dibagikan)">
          <p className="mb-6 text-gray-700">
            Zakat warisan yang belum dibagikan wajib dikeluarkan sebesar 2.5% jika nilai warisan mencapai nishab (setara 85 gram emas) dan telah tersimpan selama satu tahun (haul).
          </p>
          <InputField
            label="Total Nilai Warisan (Rp)"
            id="nilaiWarisan"
            value={formatCurrency(nilaiWarisan)} // Format the number state for display
            onChange={(value) => { // value is the raw input string from InputField
              const parsedValue = parseNumber(value);
              setNilaiWarisan(parsedValue); // Update state with the parsed number
            }}
            placeholder="Masukkan total nilai warisan"
            required
          />
          <InputField
            label="Harga Emas Saat Ini per Gram (Rp)"
            id="hargaEmas"
            value={formatCurrency(hargaEmas)} // Format the number state for display
            onChange={(value) => { // value is the raw input string from InputField
              const parsedValue = parseNumber(value);
              setHargaEmas(parsedValue); // Update state with the parsed number
            }}
            placeholder="Masukkan harga emas per gram"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>Hitung Zakat</Button>
            <Button onClick={handleReset} variant="secondary">Reset</Button>
          </div>
          {result !== null && <ResultDisplay result={result} />} {/* Use zakatType "warisan" */}
        </Card>
      </div>
    </Layout>
  );
};

export default ZakatWarisanPage;