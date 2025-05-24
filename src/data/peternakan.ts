export interface PeternakanNishab {
  jenis: 'kambing' | 'sapi' | 'unta';
  nishab: {
    min: number;
    max: number;
    zakat: number;
    keterangan: string;
  }[];
}

export const peternakanData: PeternakanNishab[] = [
  {
    jenis: 'kambing',
    nishab: [
      { min: 40, max: 120, zakat: 1, keterangan: '1 kambing umur 1 tahun' },
      { min: 121, max: 200, zakat: 2, keterangan: '2 kambing umur 1 tahun' },
      { min: 201, max: 399, zakat: 3, keterangan: '3 kambing umur 1 tahun' },
      { min: 400, max: 499, zakat: 4, keterangan: '4 kambing umur 1 tahun' },
      { min: 500, max: 599, zakat: 5, keterangan: '5 kambing umur 1 tahun' }
    ]
  },
  {
    jenis: 'sapi',
    nishab: [
      { min: 30, max: 39, zakat: 1, keterangan: '1 tabi (sapi umur 1 tahun)' },
      { min: 40, max: 59, zakat: 1, keterangan: '1 musinnah (sapi umur 2 tahun)' },
      { min: 60, max: 69, zakat: 2, keterangan: '2 tabi' },
      { min: 70, max: 79, zakat: 1, keterangan: '1 tabi + 1 musinnah' },
      { min: 80, max: 89, zakat: 2, keterangan: '2 musinnah' },
      { min: 90, max: 99, zakat: 3, keterangan: '3 tabi' },
      { min: 100, max: 109, zakat: 1, keterangan: '1 tabi + 2 musinnah' },
      { min: 110, max: 119, zakat: 2, keterangan: '2 tabi + 1 musinnah' },
      { min: 120, max: 129, zakat: 3, keterangan: '3 musinnah atau 4 tabi' }
    ]
  },
  {
    jenis: 'unta',
    nishab: [
      { min: 5, max: 9, zakat: 1, keterangan: '1 kambing' },
      { min: 10, max: 14, zakat: 2, keterangan: '2 kambing' },
      { min: 15, max: 19, zakat: 3, keterangan: '3 kambing' },
      { min: 20, max: 24, zakat: 4, keterangan: '4 kambing' },
      { min: 25, max: 35, zakat: 1, keterangan: '1 bint makhad (unta betina umur 1 tahun)' },
      { min: 36, max: 45, zakat: 1, keterangan: '1 bint labun (unta betina umur 2 tahun)' },
      { min: 46, max: 60, zakat: 1, keterangan: '1 hiqqah (unta betina umur 3 tahun)' },
      { min: 61, max: 75, zakat: 1, keterangan: '1 jadza\'ah (unta betina umur 4 tahun)' },
      { min: 76, max: 90, zakat: 2, keterangan: '2 bint labun' },
      { min: 91, max: 120, zakat: 2, keterangan: '2 hiqqah' }
    ]
  }
];

export const getPeternakanZakat = (jenis: 'kambing' | 'sapi' | 'unta', jumlah: number) => {
  const data = peternakanData.find(item => item.jenis === jenis);
  if (!data) return null;
  
  const nishab = data.nishab.find(item => jumlah >= item.min && jumlah <= item.max);
  if (!nishab) {
    // Untuk jumlah di atas range tertinggi, hitung berdasarkan kelipatan
    const lastNishab = data.nishab[data.nishab.length - 1];
    if (jumlah > lastNishab.max) {
      const excess = jumlah - lastNishab.max;
      const additionalZakat = Math.floor(excess / (jenis === 'kambing' ? 100 : jenis === 'sapi' ? 30 : 50));
      return {
        zakat: lastNishab.zakat + additionalZakat,
        keterangan: `${lastNishab.keterangan} + ${additionalZakat} tambahan`
      };
    }
    return null;
  }
  
  return nishab;
};