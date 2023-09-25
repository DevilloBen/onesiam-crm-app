import axios from 'axios';
import instance from '../configurations/api.axios';
import { QrcodeCollectType } from '../constant/type/event-utils';

const API_ROUTE = {
  GET_QRCODE: '/v1/receipt-tank/collect-spending/qrcode',
};

export function authorizationProfileAzure(params: any, authorizationToken: string): Promise<QrcodeCollectType> {
  return new Promise(async (resolve, reject) => {
    instance
      .get(API_ROUTE.GET_QRCODE, {
        params,
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          reject(error);
        }
      });
  });
}


export function nextService(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      instance
        .get('/api/hello')
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            reject(error);
          }
        });
    });
  }