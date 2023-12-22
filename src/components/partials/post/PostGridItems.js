import React, { useMemo } from 'react';
import Link from 'next/link';

import ArticleGrid from '~/components/elements/articles/ArticleGrid';

const PostGridItems = ({ posts, columns = 2 }) => {
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

  return (
    <div className="ps-blog--post-items">
      {posts && posts.length ? (
        <div className="ps-post-items">
          <div className="row">
            {posts.map((item) => (
              <div className={classes} key={item.id}>
                <ArticleGrid post={item} />
              </div>
            ))}
          </div>
          <div className="ps-section__pagination ps-loadmore">
            <Link href="/post?page=2" className="effect--underline">
              Older Posts
            </Link>
          </div>
        </div>
      ) : (
        <p>No post found.</p>
      )}
    </div>
  );
};

export default PostGridItems;
