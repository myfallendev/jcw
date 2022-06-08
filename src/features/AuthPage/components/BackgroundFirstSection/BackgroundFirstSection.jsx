import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as userActions from 'actions/--UserActions'

const IconsSet = () => (
  <svg xmlns="http://www.w3.org/2000/svg" display="none">
    <symbol id="header-icon-1">
      <path fill="#ff7b57" d="M52.758 47.569H24.719a4.472 4.472 0 0 1-4.457-4.478V21.624a1.066 1.066 0 1 1 2.131 0v21.465a2.334 2.334 0 0 0 2.326 2.337h28.039a2.334 2.334 0 0 0 2.326-2.337V27.756a2.334 2.334 0 0 0-2.326-2.336 1.071 1.071 0 0 1 0-2.141 4.473 4.473 0 0 1 4.458 4.477v15.333a4.473 4.473 0 0 1-4.458 4.48zm0-22.147H23.924a3.711 3.711 0 0 1 0-7.422H55.36a1.071 1.071 0 0 1 0 2.142H23.924a1.536 1.536 0 0 0-1.531 1.537 1.552 1.552 0 0 0 1.531 1.6h28.834a1.071 1.071 0 0 1 0 2.141zm-4.632 14.12a4.061 4.061 0 1 1 4.042-4.06 4.055 4.055 0 0 1-4.042 4.058zm0-5.979a1.919 1.919 0 1 0 1.91 1.919 1.917 1.917 0 0 0-1.91-1.921zm-9.394 31.395a32.42 32.42 0 0 1-28.026-16.279 1.074 1.074 0 0 1 .391-1.463 1.063 1.063 0 0 1 1.456.393 30.18 30.18 0 0 0 56.382-15.132v-3.708a1.066 1.066 0 1 1 2.132 0v3.71a32.443 32.443 0 0 1-32.335 32.477zm37.547-31.906a1.058 1.058 0 0 1-.587-.177l-5.693-3.778-5.693 3.772a1.07 1.07 0 0 1-1.176-1.787l6.281-4.168a1.065 1.065 0 0 1 1.176 0l6.281 4.168a1.076 1.076 0 0 1 .3 1.484 1.065 1.065 0 0 1-.889.484zM7.351 37.259a1.069 1.069 0 0 1-1.066-1.071v-3.709A32.443 32.443 0 0 1 38.618 0a32.1 32.1 0 0 1 27.651 15.636 1.06726613 1.06726613 0 1 1-1.822 1.112A29.982 29.982 0 0 0 38.618 2.141a30.3 30.3 0 0 0-30.2 30.338v3.709a1.069 1.069 0 0 1-1.067 1.069zm0 .956a1.063 1.063 0 0 1-.587-.178L.483 33.869a1.073 1.073 0 0 1-.3-1.483 1.061 1.061 0 0 1 1.477-.3l5.693 3.778 5.694-3.778a1.062 1.062 0 0 1 1.477.3 1.073 1.073 0 0 1-.3 1.483l-6.281 4.168a1.064 1.064 0 0 1-.592.176z"/>
    </symbol>
    <symbol id="header-icon-2">
      <path fill="#ff7b57" d="M42.456 48.926a6.945 6.945 0 1 1 6.913-6.944 6.936 6.936 0 0 1-6.913 6.944zm0-11.747a4.8 4.8 0 1 0 4.781 4.8 4.8 4.8 0 0 0-4.781-4.8zm-18.8-7.139a6.945 6.945 0 1 1 6.913-6.945 6.937 6.937 0 0 1-6.914 6.945zm0-11.748a4.8 4.8 0 1 0 4.781 4.8 4.8 4.8 0 0 0-4.782-4.8zm8.711 46.666A32.5 32.5 0 0 1 22.195 1.639a31.988 31.988 0 0 1 24.679 1.823 1.07018223 1.07018223 0 0 1-.958 1.914 29.881 29.881 0 0 0-23.052-1.7 30.32409374 30.32409374 0 0 0 18.958 57.609 30.368 30.368 0 0 0 19.195-38.327l-1.159-3.521a1.06632078 1.06632078 0 1 1 2.024-.672l1.159 3.522a32.408 32.408 0 0 1-30.675 42.671zm22.688-46.044a1.068 1.068 0 0 1-1.066-1.071V4.281a1.066 1.066 0 1 1 2.132 0v13.562a1.069 1.069 0 0 1-1.067 1.071zm6.75-6.781H48.3a1.071 1.071 0 0 1 0-2.142h13.5a1.071 1.071 0 0 1 0 2.142zM18.816 47.848a1.061 1.061 0 0 1-.754-.314 1.074 1.074 0 0 1 0-1.514l28.291-28.419a1.06808766 1.06808766 0 1 1 1.507 1.514L19.569 47.534a1.06 1.06 0 0 1-.754.314z"/>
    </symbol>
    <symbol id="header-icon-3">
      <path fill="#ff7b57" d="M27.379 64.632a1.113 1.113 0 0 1-.171-.013A32.48 32.48 0 0 1 2.126 20.97a1.0664551 1.0664551 0 1 1 1.991.765 30.34 30.34 0 0 0 23.43 40.77 1.071 1.071 0 0 1-.168 2.127zm10.134-.038a1.071 1.071 0 0 1-.175-2.127 30.359 30.359 0 0 0 23.247-40.732 1.067 1.067 0 1 1 1.993-.76 32.5 32.5 0 0 1-24.887 43.6 1.078 1.078 0 0 1-.178.019zM8.095 13.769a1.058 1.058 0 0 1-.671-.24 1.074 1.074 0 0 1-.155-1.507 32.287 32.287 0 0 1 50.17 0 1.06742798 1.06742798 0 1 1-1.653 1.351 30.164 30.164 0 0 0-46.863 0 1.06 1.06 0 0 1-.828.396zm23.92 13.451a7.992 7.992 0 1 1 7.957-7.993 7.983 7.983 0 0 1-7.953 7.993zm0-13.843a5.851 5.851 0 1 0 5.825 5.85 5.844 5.844 0 0 0-5.821-5.85zm-9.214 29.1a7.993 7.993 0 1 1 7.956-7.993 7.984 7.984 0 0 1-7.956 7.99zm0-13.843a5.851 5.851 0 1 0 5.825 5.85 5.844 5.844 0 0 0-5.825-5.853zm19.1 13.843a7.993 7.993 0 1 1 7.956-7.993 7.984 7.984 0 0 1-7.96 7.99zm0-13.843a5.851 5.851 0 1 0 5.825 5.85 5.844 5.844 0 0 0-5.829-5.853zm-12.205 21a1.069 1.069 0 0 1-1.066-1.071 5.825 5.825 0 1 0-11.649 0 1.066 1.066 0 1 1-2.132 0 7.956 7.956 0 1 1 15.912 0 1.068 1.068 0 0 1-1.069 1.065zm19.1 0a1.069 1.069 0 0 1-1.077-1.077 5.825 5.825 0 1 0-11.649 0 1.066 1.066 0 1 1-2.132 0 7.956 7.956 0 1 1 15.912 0 1.068 1.068 0 0 1-1.062 1.071z"/>
    </symbol>
  </svg>
);

const BottomMask = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 17" className={ className } display="none" width="320" height="65">
    <path fill="#fff" d="M.0015555 4.14731c8.15908914 8.25062 17.75142104 9.28006 21.40718504 9.10196 2.628693-.0937 30.005498-2.78554 45.008247-4.17833 11.27111-1.39229 16.430779-7.3873 18.249655-9.07095l.000024 17.19792H0z"/>
  </svg>
);

const BackgroundFirstSectionComponent = ({ activeLanguage, showRegWindow, showLoginWindow, showFeaturesWindow }) => (
  <div className="background-first section" id="section-1">
    <div className="background-first__row row">
      <div className="background-first__description-container description">
        <Link className="mobile-menu mobile-menu__logo" to="/" display="none">
          <img className="logo-svg" src="/img/jc_logo_white.svg" width="210" height="40" alt="JetCrypto"/>
        </Link>
        <h1 className="background-first__title">{activeLanguage.landing_page_main_title}</h1>
        <p className="background-first__subtitle">{activeLanguage.landing_page_main_subtitle}</p>
        <div className="mobile-menu mobile-menu__container">
          <button className="btn btn-orange" onClick={showRegWindow}>{activeLanguage.landing_page_top_menu_register}</button>
          <button className="btn btn-outline" onClick={showLoginWindow}>{activeLanguage.landing_page_top_menu_login}</button>
        </div>
        {!(/*@cc_on!@*/false || !!document.documentMode) && <BottomMask />}
      </div>
      <div className="background-first__features-container row functions">
        <IconsSet />
        <div className="background-first__feature background-first__feature--first first col-lg-8 col-md-8 col-sm-24 col-xs-24">
          <svg className="background-first__feature-icon" viewBox="0 0 78 65">
            <use xlinkHref="#header-icon-1"/>
          </svg>
          <p className="background-first__feature-text">{activeLanguage.jetcrypto_functions_2}</p>
        </div>
        <div className="background-first__feature background-first__feature--second second col-lg-8 col-md-8 col-sm-24 col-xs-24">
          <svg className="background-first__feature-icon" viewBox="0 0 65 65">
            <use xlinkHref="#header-icon-2"/>
          </svg>
          <p className="background-first__feature-text">{activeLanguage.jetcrypto_functions_3}</p>
        </div>
        <div className="background-first__feature background-first__feature--third third col-lg-8 col-md-8 col-sm-24 col-xs-24">
          <svg className="background-first__feature-icon" viewBox="0 0 65 65">
            <use xlinkHref="#header-icon-3"/>
          </svg>
          <p className="background-first__feature-text">{activeLanguage.jetcrypto_functions_1}</p>
        </div>
      </div>
      <button className="btn btn-primary know-more" onClick={showFeaturesWindow}>{activeLanguage.landing_page_know_more_btn}</button>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    activeLanguage: state.language.languages[state.language.activeLanguage]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export const BackgroundFirstSection = connect(mapStateToProps, mapDispatchToProps)(BackgroundFirstSectionComponent);
