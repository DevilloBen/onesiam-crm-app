import axios, { AxiosError, AxiosResponse } from 'axios';
import { transformErrorCoreService } from '../service/error.dto';
import { v4 as uuidv4 } from 'uuid';

const timeout = Number(process.env.TIME_OUT_SERVICE) || 30000;

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'content-type': 'application/json',
  },
  timeout: timeout,
  timeoutErrorMessage: 'Error Timeout',
  maxContentLength: 20000000,
});

// instance.interceptors.request.use(
//   async (config: any) => {

//     // const time = new Date().toISOString();
//     // const uuid = uuidv4();
//     // config.headers.transid = uuid;
//     // config.headers.transchannel = 'ONESIAM_CRM_APP';
//     // config.headers.metadata = JSON.stringify({ startDate: time });
//     // config.headers.transtimestamp = time;
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (axios.isCancel(error)) return Promise.reject(error);

//     return Promise.reject(transformErrorCoreService(error));
//   }
// );

export default instance;
