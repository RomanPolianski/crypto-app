import { FC } from 'react';
import styles from './Header.module.scss';
import LogoImg from '../../assets/logo.png';

const Logo: FC = (): JSX.Element => {
  return (
    <>
      <img src={LogoImg} alt="logo" className={styles.header__logo} />
      <h1 className={styles.header__title}>CRYPTO</h1>
    </>
  );
};

export default Logo;
