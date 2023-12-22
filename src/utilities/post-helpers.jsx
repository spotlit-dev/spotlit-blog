import React from 'react';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

export const StrapiPostThumbnail = (post) => {
  let view;
  if (post && post.thumbnail) {
    view = (
      <LazyLoad>
        <img src={`${post.thumbnail?.url}`} />
      </LazyLoad>
    );
  }
  return view;
};

export const StrapiPostTitle = (post) => {
  let view;
  if (post) {
    view = (
      <h4 className="ps-post__title">
        <Link href={`/post/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h4>
    );
  }
  return view;
};
