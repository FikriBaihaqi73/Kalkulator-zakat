import React from 'react';
import styles from '@/styles/components/InputField.module.css';

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
  prefix
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${error ? styles.error : ''}`}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default InputField;