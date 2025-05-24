import React from 'react';
import Head from 'next/head';
import styles from '@/styles/components/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Kalkulator Zakat', 
  description = 'Kalkulator zakat online untuk menghitung berbagai jenis zakat sesuai syariat Islam' 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>
              <a href="/">🕌 Kalkulator Zakat</a>
            </h1>
            <nav className={styles.nav}>
              <a href="/" className={styles.navLink}>Beranda</a>
              <a href="/panduan" className={styles.navLink}>Panduan</a>
            </nav>
          </div>
        </header>
        
        <main className={styles.main}>
          {children}
        </main>
        
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; 2025 Kalkulator Zakat. Dibuat untuk edukasi dan kemudahan perhitungan zakat.</p>
            <p className={styles.disclaimer}>
              Hasil perhitungan ini bersifat estimasi. Konsultasikan dengan ulama atau lembaga zakat terpercaya untuk kepastian.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;