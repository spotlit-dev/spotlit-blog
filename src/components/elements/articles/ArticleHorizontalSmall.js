import React, { useEffect } from 'react';
import Link from 'next/link';
import useCustomPost from '~/hooks/useCustomPost';

const ArticleHorizontalSmall = ({ post }) => {
  const { createdAt, thumbnail, title, initPost } = useCustomPost();

  useEffect(() => {
    initPost(post);
  }, [post]);

  return (
    <article className="ps-post ps-post--horizontal small">
      <div className="ps-post__thumbnail">
        <Link href={`/post/${post.slug}`}>
          <a className="ps-post__overlay"></a>
        </Link>
        {thumbnail}
      </div>
      <div className="ps-post__wrapper">
        <div className="ps-post__content">
          {title}
          <div className="ps-post__meta">
            <span className="ps-post__posted">{createdAt}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleHorizontalSmall;
