import * as R from 'ramda';
import errorCodes from './error-codes';

export const errorMessage = R.cond([
  [R.is(Number), code => errorCodes[code]],
  [
    R.hasPath(['response', 'data', 'code']),
    e => errorCodes[e.response.data.code],
  ],
  [
    R.o(R.includes('Network Error'), R.prop('message')),
    R.always(errorCodes[500]),
  ],
  [R.T, err => err.message],
]);
