import { AxiosError } from 'axios';
import { ERROR_CORE_APP } from '../constant/error/error-code';
import { ErrorCoreService, ErrorTransFormAppResponse } from '../constant/type/error.type';

export const transformErrorCoreService = (error: AxiosError<ErrorCoreService>): ErrorTransFormAppResponse => {
    console.log('error -> ',error)
  let errorResponse: ErrorTransFormAppResponse = {
    errorCode: 'BFF-TE-00',
    errorMessageTh: ERROR_CORE_APP['BFF-TE-00'],
    errorMessage: 'Intenal server error.',
    errorDebugMessage: '',
  };

  if (error?.code === 'ETIMEDOUT' || error?.code === 'ECONNABORTED') {
    errorResponse.errorCode = 'BFF-TE-06';
    errorResponse.errorMessageTh = ERROR_CORE_APP['BFF-TE-06'];
    errorResponse.errorMessage = 'Server time out.';
  }

  const bffMessage = ERROR_CORE_APP[error?.response?.data?.errorCode as keyof typeof ERROR_CORE_APP];
  if (error?.response?.data?.errorCode && bffMessage) {
    errorResponse.errorCode = error?.response?.data?.errorCode;
    errorResponse.errorMessageTh = bffMessage;
    errorResponse.errorMessage =
      error?.response?.data?.errorDebugMessage?.message || error?.response?.data?.errorMessage;
  } else if (error?.response?.data?.errorCode) {
    errorResponse.errorCode = error?.response?.data?.errorCode;
    errorResponse.errorMessageTh = error?.response?.data?.errorMessage;
  } else {
    console.error(error);
  }
  errorResponse.errorDebugMessage = error?.response?.data?.errorDebugMessage?.message || '';

  return errorResponse;
};
