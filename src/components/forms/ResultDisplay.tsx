import React from 'react';
import { ZakatCalculationResult } from '@/types/zakat';
import { formatCurrency } from '@/utils/formatCurrency';
import Card from '@/components/ui/Card';
import styles from '@/styles/components/ResultDisplay.module.css';

interface ResultDisplayProps {
  result: ZakatCalculationResult | null; // Allow null
  // zakatType: string; // Removed unused prop
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result /*, zakatType*/ }) => {
  // Add conditional rendering
  if (!result) {
    return null; // Or display a placeholder message
  }

  return (
    <Card className={styles.resultCard}>
      <div className={styles.resultHeader}>
        <h3 className={styles.resultTitle}>
          {result.isWajib ? '✅ Zakat Wajib' : '❌ Zakat Tidak Wajib'}
        </h3>
      </div>
      
      <div className={styles.resultContent}>
        {result.isWajib && (
          <div className={styles.zakatAmount}>
            <span className={styles.amountLabel}>Jumlah Zakat:</span>
            <span className={styles.amount}>{formatCurrency(result.zakatAmount)}</span>
          </div>
        )}
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Total Aset:</span>
            <span className={styles.detailValue}>{formatCurrency(result.totalAsset)}</span>
          </div>
          
          {result.nishab > 0 && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Nishab:</span>
              <span className={styles.detailValue}>{formatCurrency(result.nishab)}</span>
            </div>
          )}
        </div>
        
        <div className={styles.explanation}>
          <h4 className={styles.explanationTitle}>Penjelasan:</h4>
          <p className={styles.explanationText}>{result.explanation}</p>
        </div>
        
        {result.isWajib && (
          <div className={styles.reminder}>
            <p className={styles.reminderText}>
              💡 <strong>Catatan:</strong> Segera tunaikan zakat Anda ke lembaga zakat terpercaya atau langsung kepada mustahik yang berhak.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResultDisplay;