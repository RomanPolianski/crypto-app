import { FC } from 'react';
import './App.scss';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

const App: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default App;
