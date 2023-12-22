import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'use-intl';

const ArticlePrimary = ({ item, classes }) => {
  const t = useTranslations('Common');

  return (
    <article
      className={`ps-post ps-post--fullscreen ${classes || ''}`}
      style={{
        background: `repeat 0px / 2px url(/static/checkerboard.png), 0px / cover url(${item.thumbnail?.url}?tr=w-1920,c-at_max,bl-2,q-75)`,
        backgroundColor: 'transparent',
      }}
    >
      <Link href={item.href}>
        <a className="ps-post__overlay"></a>
      </Link>
      <div className="ps-post__content">
        <div className="ps-post__categories">{/*categories*/}</div>
        <h4 className="ps-post__title">{item.title}</h4>
        <div className="ps-post__meta">
          <span>
            {t('by')} {item.author}
          </span>
          <span className="ps-post__posted">
            <i className="feather icon icon-clock"></i>{' '}
            <strong>{item.createdAt}</strong>
          </span>
          {(item.nbrLike && (
            <span className="ps-post__posted">
              <i className="feather icon icon-heart"></i>{' '}
              <strong>{item.nbrLike} Likes</strong>
            </span>
          )) ||
            ''}
        </div>
        <Link href={item.href}>
          <a className="ps-post__morelink effect--underline">
            {t('continue reading')}
          </a>
        </Link>
      </div>
    </article>
  );
};

export default ArticlePrimary;
