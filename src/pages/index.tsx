import React from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import { zakatTypes } from '@/data/zakatTypes';
import styles from '@/styles/pages/Home.module.css';

const HomePage: React.FC = () => {
  return (
    <Layout title="Kalkulator Zakat - Hitung Zakat Online">
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Kalkulator Zakat Online</h1>
        <p className={styles.heroSubtitle}>
          Hitung berbagai jenis zakat dengan mudah dan akurat sesuai syariat Islam
        </p>
      </div>
      
      <section className={styles.zakatTypes}>
        <h2 className={styles.sectionTitle}>Pilih Jenis Zakat</h2>
        <div className={styles.zakatGrid}>
          {zakatTypes.map((zakat) => (
            <Card key={zakat.id} className={styles.zakatCard}>
              <h3 className={styles.zakatName}>
                <a href={zakat.path} className={styles.zakatLink}>
                  {zakat.name}
                </a>
              </h3>
              <p className={styles.zakatDescription}>{zakat.description}</p>
              <a href={zakat.path} className={styles.calculateButton}>
                Hitung Sekarang →
              </a>
            </Card>
          ))}
        </div>
      </section>
      
      <section className={styles.info}>
        <div className={styles.infoGrid}>
          <Card title="📚 Panduan Zakat">
            <p>Pelajari lebih lanjut tentang nishab, haul, dan ketentuan zakat dalam Islam.</p>
            <a href="/panduan" className={styles.infoLink}>Baca Panduan →</a>
          </Card>
          
          <Card title="🎯 Akurat & Terpercaya">
            <p>Perhitungan berdasarkan ketentuan fikih yang sahih dan mudah dipahami.</p>
          </Card>
          
          <Card title="📱 Responsif">
            <p>Dapat digunakan di berbagai perangkat, desktop maupun mobile.</p>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;