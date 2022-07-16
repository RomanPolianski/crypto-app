import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerInnerContainer}>
        <img
          src="https://seeklogo.com/images/P/polygon-matic-logo-86F4D6D773-seeklogo.com.png"
          alt="logo"
          className={s.logo}
        />
        <h1 className={s.appName}>Crypto</h1>
      </div>
    </header>
  );
};

export default Header;
