import React from 'react';
import { Drawer } from 'antd';

import { UIStore } from '~/store/uistore';
import menu from '~~/public/data/menu.json';

import Logo from '~/components/elements/Logo';
import MenuAccordion from '~/components/shared/menu/MenuAccordion';
import SocialLinksFeather from '~/components/basic/SocialLinksFeather';

const MenuDrawer = () => {
  const isDrawerOpen = UIStore.useState((s) => s.isDrawerOpen);
  const handleClose = () => {
    UIStore.update((s) => ({
      isDrawerOpen: false,
    }));
  };

  return (
    <Drawer
      className="ps-drawer"
      placement="left"
      closable={false}
      onClose={handleClose}
      width={350}
      visible={isDrawerOpen}
    >
      <div className="ps-panel--menu-sidebar">
        <div className="ps-panel__header">
          <Logo />
          <a className="ps-drawer__close" onClick={handleClose}>
            <i className="feather icon icon-x"></i>
          </a>
        </div>
        <div className="ps-panel__content">
          <MenuAccordion
            data={menu.primaryMenu}
            classes="menu menu--accordion"
          />
        </div>
        <div className="ps-panel__footer">
          <SocialLinksFeather />
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
