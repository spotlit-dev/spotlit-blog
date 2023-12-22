import React from 'react';
import MenuDropdown from '~/components/shared/menu/MenuDropdown';
import CustomLink from '~/components/elements/CustomLink';

const MenuDefault = ({ data, className }) => (
  <ul className={className}>
    {data &&
      data.map((item) => {
        if (item.subMenu) {
          return <MenuDropdown menuData={item} key={item.text} />;
        } else {
          return (
            <li key={item.text}>
              {item.type === 'dynamic' ? (
                <CustomLink href={`${item.as || item.url}/${item.endPoint}`}>
                  <a>{item.text}</a>
                </CustomLink>
              ) : item.img ? (
                <CustomLink href={item.url || ''}>
                  <a>
                    <img src={item.img} alt={item.text} height="40" />
                  </a>
                </CustomLink>
              ) : (
                <CustomLink href={item.url || ''}>
                  <a>{item.text}</a>
                </CustomLink>
              )}
            </li>
          );
        }
      })}
  </ul>
);

export default MenuDefault;
