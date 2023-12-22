import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'use-intl';

import GridItem from '~/components/elements/items/GridItem';
import Pagination from '~/components/elements/Pagination';

const PAGE_SIZE = 30;

const ItemsGrid = ({ items, type = 'post', columns = 2, itemsCount }) => {
  const t = useTranslations('ItemsGrid');
  const classes = useMemo(() => {
    switch (columns) {
      case 2:
        return 'col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12';
      case 4:
        return 'col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12';
      case 4:
        return 'col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12';
      case 6:
        return 'col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12';
      default:
        return 'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-12';
    }
  }, [columns]);
  const pagesCount = useMemo(
    () => itemsCount && Math.ceil(itemsCount / PAGE_SIZE),
    [itemsCount]
  );

  return (
    <div className="ps-blog--post-items">
      {items && items.length ? (
        <div className="ps-post-items">
          <div className="row">
            {items.map((item) => (
              <div className={classes} key={item.id}>
                <GridItem item={item} type={type} />
              </div>
            ))}
          </div>
          <>
            {itemsCount != null ? (
              <Pagination pagesCount={pagesCount} />
            ) : (
              <div className="ps-section__pagination ps-loadmore">
                <Link href={`/${type}?page=2`}>
                  <a className="effect--underline">{t(`More ${type}`)}</a>
                </Link>
              </div>
            )}
          </>
        </div>
      ) : (
        <p>{t(`No ${type} found`)}</p>
      )}
    </div>
  );
};

export default ItemsGrid;
