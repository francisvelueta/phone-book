import { userReducer } from './reducers/userReducer';
import { contactReducer } from './reducers/contactReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
