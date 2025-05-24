import { ZakatType } from '@/types/zakat';

export const zakatTypes: ZakatType[] = [
  {
    id: 'fitrah',
    name: 'Zakat Fitrah',
    description: 'Zakat yang wajib dikeluarkan setiap Muslim menjelang Idul Fitri',
    path: '/fitrah'
  },
  {
    id: 'emas',
    name: 'Zakat Emas & Perak',
    description: 'Zakat dari kepemilikan emas dan perak yang mencapai nishab',
    path: '/emas'
  },
  {
    id: 'tabungan',
    name: 'Zakat Tabungan',
    description: 'Zakat dari uang tabungan yang disimpan selama 1 tahun',
    path: '/tabungan'
  },
  {
    id: 'perdagangan',
    name: 'Zakat Perdagangan',
    description: 'Zakat dari aset dagang dan modal usaha',
    path: '/perdagangan'
  },
  {
    id: 'pertanian',
    name: 'Zakat Pertanian',
    description: 'Zakat dari hasil panen pertanian',
    path: '/pertanian'
  },
  {
    id: 'peternakan',
    name: 'Zakat Peternakan',
    description: 'Zakat dari ternak kambing, sapi, dan unta',
    path: '/peternakan'
  },
  {
    id: 'profesi',
    name: 'Zakat Profesi',
    description: 'Zakat dari penghasilan profesi dan gaji',
    path: '/profesi'
  },
  {
    id: 'investasi',
    name: 'Zakat Investasi & Saham',
    description: 'Zakat dari keuntungan investasi dan saham',
    path: '/investasi'
  },
  {
    id: 'tambang',
    name: 'Zakat Tambang & Laut',
    description: 'Zakat dari hasil tambang dan laut',
    path: '/tambang'
  },
  {
    id: 'rikaz',
    name: 'Zakat Rikaz',
    description: 'Zakat dari barang temuan berharga',
    path: '/rikaz'
  },
  {
    id: 'kripto',
    name: 'Zakat Kripto & Aset Digital',
    description: 'Zakat dari cryptocurrency dan aset digital',
    path: '/kripto'
  },
  {
    id: 'aset-produktif',
    name: 'Zakat Aset Produktif',
    description: 'Zakat dari properti dan aset yang disewakan',
    path: '/aset-produktif'
  },
  {
    id: 'warisan',
    name: 'Zakat Warisan',
    description: 'Zakat dari warisan yang belum dibagikan',
    path: '/warisan'
  },
  {
    id: 'kendaraan-niaga',
    name: 'Zakat Kendaraan Niaga',
    description: 'Zakat dari kendaraan untuk usaha',
    path: '/kendaraan-niaga'
  }
];