import { FC } from 'react';
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';

const App: FC = (): JSX.Element => {
  return (
    <div
      style={{
        backgroundImage:
          'url(https://auctionpala.com/wp-content/uploads/2019/08/larutadelsorigens_blur-wallpaper_81670.jpg',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
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
