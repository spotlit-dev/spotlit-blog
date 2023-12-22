import React from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';

const GridItem = ({ item }) => {
  const t = useTranslations('Common');
  const { locale } = useRouter();

  return (
    <article className="ps-post ps-post--grid">
      <div className="ps-post__thumbnail">
        <Link href={item.href || ''} passHref>
          <a className="ps-post__overlay"></a>
        </Link>
        {item.thumbnail?.url && (
          <LazyLoad>
            <img src={`${item.thumbnail?.url}?tr=w-395,h-247`} alt="img" />
          </LazyLoad>
        )}
        {item.categories?.length && (
          <div className="ps-post__categories">
            {item.categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                <a>{cat.name}</a>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="ps-post__content">
        <h4 className="ps-post__title">
          <Link href={item.href}>
            <a>{item.title}</a>
          </Link>
        </h4>
        <div className="ps-post__meta">
          <span>
            {t('by')} {item.author}
          </span>
          <span className="ps-post__posted">
            <i className="feather icon icon-clock"></i>{' '}
            <strong>{item.createdAt}</strong>
          </span>
          {item.nbrLike ? (
            <span className="ps-post__posted">
              <i className="feather icon icon-heart"></i>{' '}
              <strong>{item.nbrLike || 0} Likes</strong>
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="ps-post__short-desc">
          <p>{item.shortDesc}</p>
        </div>
        <div className="ps-post__footer">
          <Link href={item.href || ''} passHref>
            <a className="ps-post__morelink effect--underline">
              {t('read more')}
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GridItem;
