import { ButtonSignUp } from '../ButtonSingUp';
import { ButtonUser } from '../ButtonUsers';


import '../../style/Header.scss';
import '../../style/Logo.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <a href='/TestAssignment'>
            <div className="header__logo logo" />
          </a>
          <div className="header__buttons">
            <ButtonUser />
            <ButtonSignUp />
          </div>
        </div>
      </div>
    </header>
  )
}