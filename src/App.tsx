import { FC } from 'react';
import './App.scss';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

const App: FC = (): JSX.Element => {
  return (
    <div
      style={{
        backgroundImage:
          'url(https://auctionpala.com/wp-content/uploads/2019/08/larutadelsorigens_blur-wallpaper_81670.jpg',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Header />
      <Content />
    </div>
  );
};

export default App;
