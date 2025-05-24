export interface ZakatType {
  id: string;
  name: string;
  description: string;
  path: string;
}

export interface ZakatCalculationResult {
  isWajib: boolean;
  zakatAmount: number;
  explanation: string;
  nishab: number;
  totalAsset: number;
}

export interface NishabValues {
  emas: number; // gram
  perak: number; // gram
  pertanian: number; // kg
}

export interface ZakatFormData {
  [key: string]: number | string | boolean;
}

export interface PeternakanData {
  jenis: 'kambing' | 'sapi' | 'unta';
  jumlah: number;
  umur: number; // dalam tahun
  digembalakan: boolean;
}