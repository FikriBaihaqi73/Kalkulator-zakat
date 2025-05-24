import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/InputField.module.css';
import { formatNumber, parseNumber } from '@/utils/formatCurrency';

interface InputFieldProps {
  label: string;
  type?: 'text' | 'number' | 'email';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  suffix?: string;
  prefix?: string;
  id?: string;
  useThousandSeparator?: boolean; // Tambahkan prop baru untuk mengaktifkan thousand separator
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  suffix,
  prefix,
  id,
  useThousandSeparator = false // Default false untuk backward compatibility
}) => {
  // State untuk menyimpan nilai yang diformat
  const [displayValue, setDisplayValue] = useState<string>('');

  // Update displayValue ketika value berubah
  useEffect(() => {
    if (useThousandSeparator && type === 'number' && value !== '') {
      // Jika input kosong, tampilkan string kosong
      if (value === '') {
        setDisplayValue('');
      } else {
        // Jika nilai adalah string yang sudah diformat, gunakan langsung
        // Jika nilai adalah number, format terlebih dahulu
        const numValue = typeof value === 'number' ? value : parseNumber(value.toString());
        setDisplayValue(formatNumber(numValue));
      }
    } else {
      // Jika tidak menggunakan thousand separator, gunakan nilai asli
      setDisplayValue(value.toString());
    }
  }, [value, useThousandSeparator, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (useThousandSeparator && type === 'number') {
      // Gunakan parseNumber untuk membersihkan input dari pemisah ribuan dan desimal
      const parsedNum = parseNumber(inputValue);
      // Panggil onChange dengan nilai yang sudah dibersihkan sebagai string
      onChange(parsedNum.toString());
    } else {
      // Jika tidak menggunakan thousand separator, gunakan nilai input langsung
      onChange(inputValue);
    }
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          type={useThousandSeparator && type === 'number' ? 'text' : type} // Gunakan type='text' untuk input dengan thousand separator
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${error ? styles.error : ''}`}
          id={id}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default InputField;