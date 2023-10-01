export type EventObjectString = {
  [x: string]: string;
};

export type QrcodeCollectType = {
  collectCode: string;
  token: string;
};

export type BarCodeScannedType = {
  type: string;
  data: string;
};
