/*
 * This hook return data of post (STRAPI CMS version)
 */

import { useState } from 'react';
import Moment from 'moment';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

export default function useCustomPost() {
  const [createdAt, setCreatedAt] = useState('Jan 1, 2021');
  const [categories, setCategories] = useState(
    <Link href="/blog">
      <a>uncategorized</a>
    </Link>
  );
  const [author, setAuthor] = useState('Unknown');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbImageUrl, setThumbImageUrl] = useState('null');
  const [wideThumbnail, setWideThumbnail] = useState(null);
  const [wideThumbImageUrl, setWideThumbImageUrl] = useState('null');
  const [title, setTitle] = useState('Post title here');
  return {
    createdAt,
    author,
    categories,
    title,
    thumbnail,
    thumbImageUrl,
    wideThumbnail,
    wideThumbImageUrl,
    initPost: (post) => {
      let categoriesView, titleView;

      if (post.title) {
        titleView = (
          <h4 className="ps-post__title">
            <Link href={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </h4>
        );
      } else {
        titleView = (
          <h4 className="ps-post__title">
            <a href="#">No title found</a>
          </h4>
        );
      }
      setTitle(titleView);

      if (post.created_at) {
        setCreatedAt(Moment(post.created_at).format('MMM DD, YYYY'));
      }
      if (
        post.created_by &&
        post.created_by.firstname &&
        post.created_by.lastname
      ) {
        setAuthor(`${post.created_by.firstname} ${post.created_by.lastname}`);
      }
      if (
        post.updated_by &&
        post.updated_by.firstname &&
        post.updated_by.lastname
      ) {
        setAuthor(`${post.updated_by.firstname} ${post.updated_by.lastname}`);
      }
      if (post.categories && post.categories.length > 0) {
        categoriesView = post.categories.map((item) => (
          <Link href={`/categories/${item.slug}`} key={item.id}>
            <a>{item.name}</a>
          </Link>
        ));
        setCategories(categoriesView);
      }
      if (post.thumbnail) {
        const thumbnailImage = (
          <LazyLoad>
            <img src={`${post.thumbnail?.url}`} alt="img" />
          </LazyLoad>
        );
        setThumbnail(thumbnailImage);
      }

      if (post.wide_thumbnail) {
        const wideThumbImage = (
          <LazyLoad>
            <img src={`${post.wide_thumbnail?.url}`} alt="img" />
          </LazyLoad>
        );
        setWideThumbnail(wideThumbImage);
        setWideThumbImageUrl(`${post.wide_thumbnail?.url}`);
      }
    },
  };
}
