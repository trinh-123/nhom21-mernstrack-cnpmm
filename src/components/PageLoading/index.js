import Spinner from '../../assets/images/spinner.gif';
import './index.scss';

const PageLoading = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default PageLoading;
