import { FC } from 'react';
import s from './Header.module.scss';
import LogoImg from '../../assets/logo.png';

const Logo: FC = (): JSX.Element => {
  return (
    <>
      <img src={LogoImg} alt="logo" className={s.logo} />
      <h1 className={s.appName}>CRYPTO</h1>
    </>
  );
};

export default Logo;
