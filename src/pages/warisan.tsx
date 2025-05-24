import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';
import ResultDisplay from '@/components/forms/ResultDisplay';
import { calculateZakatTabungan } from '@/utils/zakatCalculations';
import { /* formatCurrency, */ parseNumber } from '@/utils/formatCurrency'; // Removed formatCurrency import
import { validatePositiveNumber } from '@/utils/validation';
import { ZakatCalculationResult } from '@/types/zakat'; // Import ZakatCalculationResult

const ZakatWarisanPage: React.FC = () => {
  const [nilaiWarisan, setNilaiWarisan] = useState<string>(''); // State type is string
  const [hargaEmas, setHargaEmas] = useState<string>(''); // State type is string
  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const nilaiWarisanNum = parseNumber(nilaiWarisan); // Parse string value for calculation
    const hargaEmasNum = parseNumber(hargaEmas); // Parse string value for calculation

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
    setNilaiWarisan(''); // Reset to empty string
    setHargaEmas(''); // Reset to empty string
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
            value={nilaiWarisan}
            onChange={setNilaiWarisan}
            placeholder="Masukkan total nilai warisan"
            required
            prefix="Rp"
            type="number"
            useThousandSeparator={true} // Aktifkan thousand separator
          />
          <InputField
            label="Harga Emas Saat Ini per Gram (Rp)"
            id="hargaEmas"
            value={hargaEmas}
            onChange={setHargaEmas}
            placeholder="Masukkan harga emas per gram"
            required
            prefix="Rp"
            type="number"
            useThousandSeparator={true} // Aktifkan thousand separator
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