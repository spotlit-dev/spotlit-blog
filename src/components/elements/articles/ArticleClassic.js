import React, { useEffect } from 'react';
import Link from 'next/link';
import useCustomPost from '~/hooks/useCustomPost';

const ArticleClassic = ({ post }) => {
  const { categories, author, createdAt, wideThumbnail, title, initPost } =
    useCustomPost();

  useEffect(() => {
    initPost(post);
  }, [post]);

  return (
    <article className="ps-post ps-post--classic">
      <div className="ps-post__thumbnail">
        <Link href={`/post/${post.slug}`}>
          <a className="ps-post__overlay"></a>
        </Link>
        {wideThumbnail}
      </div>
      <div className="ps-post__content">
        <div className="ps-post__categories">{categories}</div>
        {title}
        <div className="ps-post__meta">
          <span>
            By:{' '}
            <Link href="/blog">
              <a>{author}</a>
            </Link>
          </span>
          <span className="ps-post__posted">
            <i className="feather icon icon-clock"></i>{' '}
            <strong>{createdAt}</strong>
          </span>
          <span className="ps-post__posted">
            <i className="feather icon icon-activity"></i>{' '}
            <strong>{Math.floor(Math.random() * 100)} Views</strong>
          </span>
        </div>
        <div className="ps-post__short-desc">
          <p>
            {post.description
              ? post.description
              : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut, neque odio possimus repellendus tenetur? .'}
          </p>
        </div>
        <div className="ps-post__footer">
          <Link href={`/post/${post.slug}`}>
            <a className="ps-post__morelink">Continue Reading</a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleClassic;
