import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'use-intl';
import useCustomPost from '~/hooks/useCustomPost';

const ArticleGridSimple = ({ post }) => {
  const t = useTranslations('Common');
  const { categories, createdAt, thumbnail, title, initPost } = useCustomPost();

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
      </div>
      <div className="ps-post__content">
        <div className="ps-post__categories">{categories}</div>
        {title}
        <div className="ps-post__meta">
          <span className="ps-post__posted">{createdAt}</span>
        </div>
        <div className="ps-post__footer">
          <Link href={`/post/${post.slug}`}>
            <a className="ps-post__morelink line">
              {t('read more')}{' '}
              <i className="feather icon icon-chevrons-right"></i>
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleGridSimple;
