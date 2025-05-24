import { ZakatCalculationResult } from '@/types/zakat';
import { ZAKAT_PERCENTAGE, NISHAB, ZAKAT_FITRAH } from './constants';
import { formatCurrency } from './formatCurrency';
import { getPeternakanZakat } from '@/data/peternakan'; // Change require to ES6 import

// Zakat Fitrah
export const calculateZakatFitrah = (
  jumlahKeluarga: number,
  hargaBeras: number,
  beratPerOrang: number = ZAKAT_FITRAH.BERAS_PER_ORANG
): ZakatCalculationResult => {
  const totalBerat = jumlahKeluarga * beratPerOrang;
  const zakatAmount = totalBerat * hargaBeras;
  
  return {
    isWajib: true,
    zakatAmount,
    explanation: `Zakat fitrah wajib untuk ${jumlahKeluarga} orang dengan ${beratPerOrang} kg beras per orang (${totalBerat} kg total).`,
    nishab: 0,
    totalAsset: zakatAmount
  };
};

// Zakat Emas
export const calculateZakatEmas = (
  beratEmas: number,
  hargaPerGram: number,
  sudahSetahun: boolean = true
): ZakatCalculationResult => {
  const totalNilai = beratEmas * hargaPerGram;
  const nishabNilai = NISHAB.EMAS * hargaPerGram;
  const isWajib = beratEmas >= NISHAB.EMAS && sudahSetahun;
  const zakatAmount = isWajib ? totalNilai * ZAKAT_PERCENTAGE.STANDARD : 0;
  
  let explanation = '';
  if (!sudahSetahun) {
    explanation = 'Zakat tidak wajib karena belum disimpan selama 1 tahun (haul).';
  } else if (beratEmas < NISHAB.EMAS) {
    explanation = `Zakat tidak wajib karena berat emas (${beratEmas} gram) belum mencapai nishab (${NISHAB.EMAS} gram).`;
  } else {
    explanation = `Zakat wajib 2.5% dari total nilai emas ${beratEmas} gram yang sudah disimpan 1 tahun.`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: nishabNilai,
    totalAsset: totalNilai
  };
};

// Zakat Tabungan
export const calculateZakatTabungan = (
  saldoTabungan: number,
  hargaEmasPerGram: number,
  sudahSetahun: boolean = true
): ZakatCalculationResult => {
  const nishabNilai = NISHAB.EMAS * hargaEmasPerGram;
  const isWajib = saldoTabungan >= nishabNilai && sudahSetahun;
  const zakatAmount = isWajib ? saldoTabungan * ZAKAT_PERCENTAGE.STANDARD : 0;
  
  let explanation = '';
  if (!sudahSetahun) {
    explanation = 'Zakat tidak wajib karena tabungan belum disimpan selama 1 tahun (haul).';
  } else if (saldoTabungan < nishabNilai) {
    explanation = `Zakat tidak wajib karena saldo tabungan belum mencapai nishab (setara ${NISHAB.EMAS} gram emas).`;
  } else {
    explanation = `Zakat wajib 2.5% dari saldo tabungan yang sudah disimpan 1 tahun.`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: nishabNilai,
    totalAsset: saldoTabungan
  };
};

// Zakat Perdagangan
export const calculateZakatPerdagangan = (
  asetDagang: number,
  piutangDagang: number,
  utangDagang: number,
  hargaEmasPerGram: number
): ZakatCalculationResult => {
  const totalAset = asetDagang + piutangDagang - utangDagang;
  const nishabNilai = NISHAB.EMAS * hargaEmasPerGram;
  const isWajib = totalAset >= nishabNilai && totalAset > 0;
  const zakatAmount = isWajib ? totalAset * ZAKAT_PERCENTAGE.STANDARD : 0;
  
  let explanation = '';
  if (totalAset <= 0) {
    explanation = 'Zakat tidak wajib karena total aset setelah dikurangi utang tidak positif.';
  } else if (totalAset < nishabNilai) {
    explanation = `Zakat tidak wajib karena total aset belum mencapai nishab (setara ${NISHAB.EMAS} gram emas).`;
  } else {
    explanation = `Zakat wajib 2.5% dari total aset dagang (aset + piutang - utang).`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: nishabNilai,
    totalAsset: totalAset
  };
};

// Zakat Pertanian
export const calculateZakatPertanian = (
  hasilPanen: number, // dalam kg
  jenisIrigasi: 'hujan' | 'irigasi' | 'campuran',
  hargaPerKg: number
): ZakatCalculationResult => {
  const isWajib = hasilPanen >= NISHAB.PERTANIAN;
  let percentage = 0;
  
  switch (jenisIrigasi) {
    case 'hujan':
      percentage = ZAKAT_PERCENTAGE.PERTANIAN_HUJAN;
      break;
    case 'irigasi':
      percentage = ZAKAT_PERCENTAGE.PERTANIAN_IRIGASI;
      break;
    case 'campuran':
      percentage = ZAKAT_PERCENTAGE.PERTANIAN_CAMPURAN;
      break;
  }
  
  const zakatKg = isWajib ? hasilPanen * percentage : 0;
  const zakatAmount = zakatKg * hargaPerKg;
  const totalNilai = hasilPanen * hargaPerKg;
  
  let explanation = '';
  if (!isWajib) {
    explanation = `Zakat tidak wajib karena hasil panen (${hasilPanen} kg) belum mencapai nishab (${NISHAB.PERTANIAN} kg).`;
  } else {
    const percentageText = (percentage * 100).toString();
    explanation = `Zakat wajib ${percentageText}% (${zakatKg} kg) dari hasil panen dengan sistem ${jenisIrigasi}.`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: NISHAB.PERTANIAN,
    totalAsset: totalNilai
  };
};

// Zakat Rikaz
export const calculateZakatRikaz = (nilaiTemuan: number): ZakatCalculationResult => {
  const zakatAmount = nilaiTemuan * ZAKAT_PERCENTAGE.RIKAZ;
  
  return {
    isWajib: true,
    zakatAmount,
    explanation: 'Zakat rikaz (barang temuan) wajib 20% langsung dari nilai temuan.',
    nishab: 0,
    totalAsset: nilaiTemuan
  };
};

// Zakat Peternakan
export const calculateZakatPeternakan = (
  jenis: 'kambing' | 'sapi' | 'unta',
  jumlah: number,
  digembalakan: boolean = true,
  sudahSetahun: boolean = true
): ZakatCalculationResult => {
  // const { getPeternakanZakat } = require('@/data/peternakan'); // Removed require

  if (!digembalakan || !sudahSetahun) {
    return {
      isWajib: false,
      zakatAmount: 0,
      explanation: !digembalakan 
        ? 'Zakat tidak wajib karena ternak tidak digembalakan (dikandangkan terus).' 
        : 'Zakat tidak wajib karena belum dipelihara selama 1 tahun (haul).',
      nishab: 0,
      totalAsset: 0
    };
  }
  
  const zakatData = getPeternakanZakat(jenis, jumlah);
  
  if (!zakatData) {
    const minNishab = jenis === 'kambing' ? 40 : jenis === 'sapi' ? 30 : 5;
    return {
      isWajib: false,
      zakatAmount: 0,
      explanation: `Zakat tidak wajib karena jumlah ${jenis} (${jumlah} ekor) belum mencapai nishab minimum (${minNishab} ekor).`,
      nishab: minNishab,
      totalAsset: jumlah
    };
  }
  
  return {
    isWajib: true,
    zakatAmount: zakatData.zakat,
    explanation: `Zakat wajib untuk ${jumlah} ekor ${jenis}: ${zakatData.keterangan}.`,
    nishab: jenis === 'kambing' ? 40 : jenis === 'sapi' ? 30 : 5,
    totalAsset: jumlah
  };
};

// Zakat Profesi
export const calculateZakatProfesi = (
  gajiPerBulan: number,
  hargaEmasPerGram: number,
  hitungPerBulan: boolean = false
): ZakatCalculationResult => {
  const nishabNilai = NISHAB.EMAS * hargaEmasPerGram;
  const gajiTahunan = gajiPerBulan * 12;
  
  if (hitungPerBulan) {
    const isWajib = gajiPerBulan >= (nishabNilai / 12);
    const zakatAmount = isWajib ? gajiPerBulan * ZAKAT_PERCENTAGE.STANDARD : 0;
    
    return {
      isWajib,
      zakatAmount,
      explanation: isWajib 
        ? `Zakat profesi wajib 2.5% dari gaji bulanan yang mencapai 1/12 nishab.`
        : `Zakat tidak wajib karena gaji bulanan belum mencapai 1/12 nishab (${formatCurrency(nishabNilai / 12)}).`,
      nishab: nishabNilai / 12,
      totalAsset: gajiPerBulan
    };
  } else {
    const isWajib = gajiTahunan >= nishabNilai;
    const zakatAmount = isWajib ? gajiTahunan * ZAKAT_PERCENTAGE.STANDARD : 0;
    
    return {
      isWajib,
      zakatAmount,
      explanation: isWajib 
        ? `Zakat profesi wajib 2.5% dari total gaji tahunan yang mencapai nishab.`
        : `Zakat tidak wajib karena total gaji tahunan belum mencapai nishab (setara ${NISHAB.EMAS} gram emas).`,
      nishab: nishabNilai,
      totalAsset: gajiTahunan
    };
  }
};

// Zakat Investasi & Saham
export const calculateZakatInvestasi = (
  nilaiInvestasi: number,
  keuntungan: number,
  hargaEmasPerGram: number,
  sudahSetahun: boolean = true
): ZakatCalculationResult => {
  const nishabNilai = NISHAB.EMAS * hargaEmasPerGram;
  const totalAset = nilaiInvestasi + keuntungan;
  const isWajib = totalAset >= nishabNilai && sudahSetahun && keuntungan > 0;
  const zakatAmount = isWajib ? keuntungan * ZAKAT_PERCENTAGE.STANDARD : 0;
  
  let explanation = '';
  if (!sudahSetahun) {
    explanation = 'Zakat tidak wajib karena investasi belum dipegang selama 1 tahun (haul).';
  } else if (keuntungan <= 0) {
    explanation = 'Zakat tidak wajib karena tidak ada keuntungan dari investasi.';
  } else if (totalAset < nishabNilai) {
    explanation = `Zakat tidak wajib karena total nilai investasi belum mencapai nishab (setara ${NISHAB.EMAS} gram emas).`;
  } else {
    explanation = `Zakat wajib 2.5% dari keuntungan investasi yang sudah mencapai nishab dan dipegang 1 tahun.`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: nishabNilai,
    totalAsset: totalAset
  };
};

// Zakat Tambang
export const calculateZakatTambang = (
  hasilTambang: number,
  biayaProduksi: number
): ZakatCalculationResult => {
  const hasilBersih = hasilTambang - biayaProduksi;
  const zakatAmount = hasilBersih > 0 ? hasilBersih * ZAKAT_PERCENTAGE.RIKAZ : 0;
  
  return {
    isWajib: hasilBersih > 0,
    zakatAmount,
    explanation: hasilBersih > 0 
      ? 'Zakat tambang wajib 20% dari hasil bersih (setelah dikurangi biaya produksi).'
      : 'Zakat tidak wajib karena tidak ada hasil bersih dari tambang.',
    nishab: 0,
    totalAsset: hasilBersih
  };
};

// Zakat Aset Produktif
export const calculateZakatAsetProduktif = (
  pendapatanSewa: number,
  biayaOperasional: number,
  hargaEmasPerGram: number
): ZakatCalculationResult => {
  const pendapatanBersih = pendapatanSewa - biayaOperasional;
  const nishabNilai = NISHAB.EMAS * hargaEmasPerGram;
  const isWajib = pendapatanBersih >= nishabNilai && pendapatanBersih > 0;
  const zakatAmount = isWajib ? pendapatanBersih * ZAKAT_PERCENTAGE.STANDARD : 0;
  
  let explanation = '';
  if (pendapatanBersih <= 0) {
    explanation = 'Zakat tidak wajib karena tidak ada pendapatan bersih dari aset produktif.';
  } else if (pendapatanBersih < nishabNilai) {
    explanation = `Zakat tidak wajib karena pendapatan bersih belum mencapai nishab (setara ${NISHAB.EMAS} gram emas).`;
  } else {
    explanation = `Zakat wajib 2.5% dari pendapatan bersih aset produktif yang mencapai nishab.`;
  }
  
  return {
    isWajib,
    zakatAmount,
    explanation,
    nishab: nishabNilai,
    totalAsset: pendapatanBersih
  };
};