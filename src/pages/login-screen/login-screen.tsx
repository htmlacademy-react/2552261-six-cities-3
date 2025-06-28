import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CITY_LOCATIONS} from '../../const.ts';
import {FormEvent, useEffect, useRef} from 'react';
import {AuthData} from '../../types/auth-data.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions.ts';
import {changeFormState, getRandomElement} from '../../utils/util.ts';
import {changeCity} from '../../store/city-process/city-process.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {getPageStatus} from '../../store/pages-process/selectors.ts';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const randomCity = getRandomElement(CITY_LOCATIONS);
  const auth = useAppSelector(getAuthorizationStatus);
  const isPrivatePage = useAppSelector(getPageStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if(auth === AuthorizationStatus.Auth && !isPrivatePage) {
      navigate(AppRoute.Root);
    }
  });

  const onSubmit = (authData: AuthData) => {
    changeFormState(true, formRef);
    dispatch(loginAction(authData));
    changeFormState(false, formRef);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  const itemLinkHandler = () => {
    dispatch(changeCity(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} ref={formRef}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} data-testid={'loginElement'} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef}
                  pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
                  title="Пароль должен содержать хотя бы одну прописную букву, одну строчную букву и одну цифру" data-testid={'passwordElement'} required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link onClick={itemLinkHandler} className="locations__item-link" to={AppRoute.Root}>
                <span>{randomCity?.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
