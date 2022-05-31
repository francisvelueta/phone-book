import { validationsHandlerSignUp } from './signUpValidate';
import { validationsHandlerContact } from './contactValidate';
import { validationsHandlerSignIn } from './sigInValidate';
import {
  validationsHandlerEmail,
  validationsHandlerPassword,
} from './recoveryValidate';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  validationsHandlerSignUp,
  validationsHandlerContact,
  validationsHandlerSignIn,
  validationsHandlerEmail,
  validationsHandlerPassword,
};
