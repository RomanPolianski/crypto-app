import { FC } from 'react';
import PreloaderIcon from '../../assets/preloader.svg';

const Preloader: FC = (): JSX.Element => {
  return (
    <img
      src={PreloaderIcon}
      style={{ width: 50, height: 50 }}
      alt="loading ico"
    />
  );
};

export default Preloader;
