export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

export const validateRequired = (value: unknown): boolean => { // Use unknown
  return value !== null && value !== undefined && value !== '';
};

export const validateMinValue = (value: number, min: number): boolean => {
  return value >= min;
};

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateZakatForm = (data: unknown, type: string): ValidationResult => {
  switch (type) {
    case 'fitrah':
      // Assert data type for fitrah
      const fitrahData = data as { jumlahKeluarga: number; hargaBeras: number };
      if (!validatePositiveNumber(fitrahData.jumlahKeluarga)) {
        return { isValid: false, message: 'Jumlah anggota keluarga harus lebih dari 0' };
      }
      if (!validatePositiveNumber(fitrahData.hargaBeras)) {
        return { isValid: false, message: 'Harga beras harus lebih dari 0' };
      }
      break;

    case 'emas':
      // Assert data type for emas
      const emasData = data as { beratEmas: number; hargaEmas: number };
      if (!validatePositiveNumber(emasData.beratEmas)) {
        return { isValid: false, message: 'Berat emas harus lebih dari 0' };
      }
      if (!validatePositiveNumber(emasData.hargaEmas)) {
        return { isValid: false, message: 'Harga emas per gram harus lebih dari 0' };
      }
      break;

    // Add cases for other zakat types as needed with appropriate type assertions
    // case 'investasi':
    //   const investasiData = data as { nilaiInvestasi: number; keuntungan: number; hargaEmas: number; sudahSetahun: boolean };
    //   // Add validation logic here
    //   break;
    // case 'kripto':
    //   const kriptoData = data as { nilaiAsetDigital: number; hargaEmas: number; sudahSetahun: boolean };
    //   // Add validation logic here
    //   break;
    // case 'perdagangan':
    //   const perdaganganData = data as { asetDagang: number; piutangDagang: number; utangDagang: number; hargaEmas: number };
    //   // Add validation logic here
    //   break;
    // case 'peternakan':
    //   const peternakanData = data as { jenisTernak: 'kambing' | 'sapi' | 'unta'; jumlahTernak: number; digembalakan: boolean; sudahSetahun: boolean };
    //   // Add validation logic here
    //   break;
    // case 'profesi':
    //   const profesiData = data as { monthlyIncome: number; otherIncome?: number; deductions?: number; nishabEmas: number };
    //   // Add validation logic here
    //   break;
    // case 'rikaz':
    //   const rikazData = data as { nilaiTemuan: number };
    //   // Add validation logic here
    //   break;
    // case 'tabungan':
    //   const tabunganData = data as { saldoTabungan: number; hargaEmas: number; sudahSetahun: boolean };
    //   // Add validation logic here
    //   break;
    // case 'tambang_laut':
    //   const tambangLautData = data as { nilaiTambang: number };
    //   // Add validation logic here
    //   break;

    default:
      break;
  }

  return { isValid: true };
};