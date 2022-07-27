import { FC } from 'react';
import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';

const App: FC = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/crypto-app" element={<Content />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
