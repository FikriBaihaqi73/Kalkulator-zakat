export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

export const validateMinValue = (value: number, min: number): boolean => {
  return value >= min;
};

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateZakatForm = (data: any, type: string): ValidationResult => {
  switch (type) {
    case 'fitrah':
      if (!validatePositiveNumber(data.jumlahKeluarga)) {
        return { isValid: false, message: 'Jumlah anggota keluarga harus lebih dari 0' };
      }
      if (!validatePositiveNumber(data.hargaBeras)) {
        return { isValid: false, message: 'Harga beras harus lebih dari 0' };
      }
      break;
    
    case 'emas':
      if (!validatePositiveNumber(data.beratEmas)) {
        return { isValid: false, message: 'Berat emas harus lebih dari 0' };
      }
      if (!validatePositiveNumber(data.hargaEmas)) {
        return { isValid: false, message: 'Harga emas per gram harus lebih dari 0' };
      }
      break;
    
    default:
      break;
  }
  
  return { isValid: true };
};