import PreloaderIcon from '../../assets/preloader.svg';

const Preloader = () => {
  return (
    <img
      src={PreloaderIcon}
      style={{ width: 50, height: 50 }}
      alt="loading ico"
    />
  );
};

export default Preloader;
