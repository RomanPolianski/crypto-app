import { FC } from 'react';
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';

const App: FC = (): JSX.Element => {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
