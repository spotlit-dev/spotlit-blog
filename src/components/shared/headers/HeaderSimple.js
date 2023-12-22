import React, { useEffect } from 'react';
import Link from 'next/link';

import { UIStore } from '~/store/uistore';
import menu from '~~/public/data/menu.json';

import MenuDefault from '~/components/shared/menu/MenuDefault';
import Logo from '~/components/elements/Logo';
import { stickyHeader } from '~/utilities/common-helpers';
import SocialLinks from '~/components/elements/SocialLinks';
import SocialLinksFeather from '~/components/basic/SocialLinksFeather';

const HeaderSimple = ({ className }) => {
  function handleOpenSearchBox() {
    UIStore.update((s) => ({
      isSearchOpen: true,
    }));
  }
  function handleOpenDrawer(e) {
    UIStore.update((s) => ({
      isDrawerOpen: true,
    }));
    e.preventDefault();
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener('scroll', stickyHeader);
    }
  });

  return (
    <header
      className={`header header--default ${className && className}`}
      id="header-sticky"
    >
      <div className="container">
        <div className="header__left">
          <a href="#" className="header__toggle" onClick={handleOpenDrawer}>
            <i className="feather icon icon-menu"></i>
          </a>
          <Logo />
        </div>
        <div className="header__center">
          <MenuDefault data={menu.primaryMenu} className="menu" />
        </div>
        <div className="header__right">
          <SocialLinksFeather />
          {/* <div className="header__search">
            <a
              href="#"
              className="header__search-btn"
              onClick={handleOpenSearchBox}
            >
              <i className="feather icon icon-search"></i>
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderSimple;
