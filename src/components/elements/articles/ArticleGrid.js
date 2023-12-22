import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'use-intl';

import useCustomPost from '~/hooks/useCustomPost';

const ArticleGrid = ({ post }) => {
  const t = useTranslations('Common');
  const { categories, author, createdAt, thumbnail, title, initPost } =
    useCustomPost();

  useEffect(() => {
    initPost(post);
  }, [post, initPost]);

  return (
    <article className="ps-post ps-post--grid">
      <div className="ps-post__thumbnail">
        <Link href={`/post/${post.slug}`}>
          <a className="ps-post__overlay"></a>
        </Link>
        {thumbnail}
        <div className="ps-post__categories">{categories}</div>
      </div>
      <div className="ps-post__content">
        {title}
        <div className="ps-post__meta">
          <span>
            {t('by')}{' '}
            <Link href="/blog">
              <a>{author}</a>
            </Link>
          </span>
          <span className="ps-post__posted">
            <i className="feather icon icon-clock"></i>{' '}
            <strong>{createdAt}</strong>
          </span>
          {post.nbrLike ? (
            <span className="ps-post__posted">
              <i className="feather icon icon-heart"></i>{' '}
              <strong>{post.nbrLike || 0} Likes</strong>
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="ps-post__short-desc">
          <p>{post.description && post.description.slice(0, 100) + '...'}</p>
        </div>
        <div className="ps-post__footer">
          <Link href={`/post/${post.slug}`}>
            <a className="ps-post__morelink effect--underline">
              {t('read more')}
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleGrid;
