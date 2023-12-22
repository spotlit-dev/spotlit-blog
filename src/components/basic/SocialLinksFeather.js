import React from 'react';
import Link from 'next/link';

import menus from '~~/public/data/menu.json';

const SocialLinksFeather = ({ square = false }) => {
  return (
    <ul
      className={`ps-list--social ps-social-links ${
        square && 'ps-social--link'
      }`}
    >
      {menus.socialNetworks.map(({ href, icon }, i) => (
        <li key={i}>
          <Link href={href}>
            <a target="_blank">
              <i className={`icon feather ${icon}`}></i>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinksFeather;
