import React from 'react';

import { UIStore } from '~/store/uistore';

import SocialLinks from '~/components/elements/SocialLinks';
import Logo from '~/components/elements/Logo';

const HeaderMobile = () => {
  const isDrawerOpen = UIStore.useState((s) => s.isDrawerOpen);

  function handleOpenDrawer(e) {
    UIStore.update((s) => ({
      isDrawerOpen: !isDrawerOpen,
    }));
    e.preventDefault();
  }
  return (
    <header className="header header--center header--mobile">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <div className="header__right">
            <a href="#" className="header__toggle" onClick={handleOpenDrawer}>
              <i className="feather icon icon-menu"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;
