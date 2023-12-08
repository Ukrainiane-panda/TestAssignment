import '../../style/Banner.scss'
import { ButtonSignUp } from '../ButtonSingUp';

export const Banner = () => {
  return (
    <div className="banner">
      <div className="containerForBanner">
        <div className="banner__content">
          <div className="banner__text">
            <h1 className="banner__title">
              Test assignment for front-end developer
            </h1>
            <p className="banner__subtitle">
              What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </p>
          </div>
          <div className='banner__button'>
            <ButtonSignUp />
          </div>
        </div>
      </div>
    </div>
  );
};
