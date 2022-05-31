import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './components/Home';
import SignUpForm from './components/Auth/SignUpForm';
import SignInForm from './components/Auth/SignInForm';
import EditContact from './components/Contacts/EditContact';
import RecoveryPassword from './components/ResetPassword/RecoveryPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route index element={<Home />} />
              <Route path='signin' element={<SignInForm />}></Route>
              <Route path='signup' element={<SignUpForm />}></Route>
              <Route path='recovery' element={<RecoveryPassword />}></Route>
              <Route path='reset/:id' element={<ResetPassword />}></Route>
              <Route path='contacts/:id' element={<EditContact />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
