import React from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import { NISHAB, ZAKAT_PERCENTAGE } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from '@/styles/pages/Panduan.module.css';

const PanduanPage: React.FC = () => {
  return (
    <Layout title="Panduan Zakat - Kalkulator Zakat">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Panduan Zakat</h1>
          <p className={styles.description}>
            Pelajari ketentuan zakat dalam Islam, nishab, haul, dan cara perhitungannya.
          </p>
        </div>
        
        <div className={styles.content}>
          <Card title="🕌 Pengertian Zakat">
            <p>
              Zakat adalah salah satu rukun Islam yang wajib dikeluarkan oleh setiap Muslim 
              yang mampu. Zakat berfungsi untuk membersihkan harta dan jiwa, serta membantu 
              sesama yang membutuhkan.
            </p>
          </Card>
          
          <Card title="📏 Nishab">
            <p>Nishab adalah batas minimum harta yang wajib dikeluarkan zakatnya:</p>
            <ul className={styles.list}>
              <li><strong>Emas:</strong> {NISHAB.EMAS} gram</li>
              <li><strong>Perak:</strong> {NISHAB.PERAK} gram</li>
              <li><strong>Pertanian:</strong> {NISHAB.PERTANIAN} kg hasil panen</li>
              <li><strong>Tabungan/Uang:</strong> Senilai {NISHAB.EMAS} gram emas</li>
            </ul>
          </Card>
          
          <Card title="⏰ Haul">
            <p>
              Haul adalah masa kepemilikan harta selama satu tahun Hijriah (354 hari). 
              Sebagian besar jenis zakat mensyaratkan haul, kecuali:
            </p>
            <ul className={styles.list}>
              <li>Zakat fitrah</li>
              <li>Zakat pertanian (langsung setelah panen)</li>
              <li>Zakat rikaz (barang temuan)</li>
              <li>Zakat tambang</li>
            </ul>
          </Card>
          
          <Card title="💰 Besaran Zakat">
            <div className={styles.zakatRates}>
              <div className={styles.rateItem}>
                <span className={styles.rateType}>Zakat Standar</span>
                <span className={styles.rateValue}>{(ZAKAT_PERCENTAGE.STANDARD * 100)}%</span>
              </div>
              <div className={styles.rateItem}>
                <span className={styles.rateType}>Zakat Rikaz</span>
                <span className={styles.rateValue}>{(ZAKAT_PERCENTAGE.RIKAZ * 100)}%</span>
              </div>
              <div className={styles.rateItem}>
                <span className={styles.rateType}>Pertanian (Hujan)</span>
                <span className={styles.rateValue}>{(ZAKAT_PERCENTAGE.PERTANIAN_HUJAN * 100)}%</span>
              </div>
              <div className={styles.rateItem}>
                <span className={styles.rateType}>Pertanian (Irigasi)</span>
                <span className={styles.rateValue}>{(ZAKAT_PERCENTAGE.PERTANIAN_IRIGASI * 100)}%</span>
              </div>
            </div>
          </Card>
          
          <Card title="👥 Mustahik (Penerima Zakat)">
            <p>Zakat harus diberikan kepada 8 golongan mustahik:</p>
            <ol className={styles.list}>
              <li><strong>Fakir:</strong> Orang yang tidak memiliki harta dan penghasilan</li>
              <li><strong>Miskin:</strong> Orang yang penghasilannya tidak mencukupi kebutuhan</li>
              <li><strong>Amil:</strong> Petugas yang mengumpulkan dan membagikan zakat</li>
              <li><strong>Muallaf:</strong> Orang yang baru masuk Islam atau yang hatinya perlu dilembutkan</li>
              <li><strong>Riqab:</strong> Membebaskan budak atau membantu orang yang terlilit hutang</li>
              <li><strong>Gharim:</strong> Orang yang berhutang untuk kepentingan yang tidak maksiat</li>
              <li><strong>Fi Sabilillah:</strong> Orang yang berjuang di jalan Allah</li>
              <li><strong>Ibnu Sabil:</strong> Musafir yang kehabisan bekal dalam perjalanan</li>
            </ol>
          </Card>
          
          <Card title="⚠️ Hal Penting">
            <ul className={styles.list}>
              <li>Zakat harus dibayarkan segera setelah wajib</li>
              <li>Tidak boleh menunda-nunda pembayaran zakat</li>
              <li>Zakat tidak boleh diberikan kepada keluarga yang wajib dinafkahi</li>
              <li>Lebih baik memberikan zakat kepada lembaga zakat terpercaya</li>
              <li>Hasil perhitungan ini bersifat estimasi, konsultasikan dengan ulama</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PanduanPage;