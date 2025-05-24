import React from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Import Link
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
              <Link href="/"> {/* Use Link */}
                🕌 Kalkulator Zakat
              </Link>
            </h1>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}> {/* Use Link */}
                Beranda
              </Link>
              <Link href="/panduan" className={styles.navLink}> {/* Use Link */}
                Panduan
              </Link>
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
            <a 
              href="https://teer.id/apg0i4vaap2blgwy8lru" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.supportDeveloper}
            >
              ☕ Dukung Developer
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;