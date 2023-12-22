import React from 'react';
import Link from 'next/link';

import menus from '~~/public/data/menu.json';
import { useTranslations } from 'use-intl';

const WidgetFooterQuickLink = () => {
  const t = useTranslations('WidgetFooterQuickLink');

  return (
    <aside className="ps-widget ps-widget--footer">
      <h4 className="ps-widget__heading">
        <span>{t('quick links')}</span>
      </h4>
      <div className="ps-widget__content">
        <ul className="ps-list">
          {menus.footerLinks.map(({ label, href }, i) => (
            <li key={i}>
              <Link href={href}>
                <a target="_blank">{t(label)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default WidgetFooterQuickLink;
