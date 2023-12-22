/*
 * This hook return data of post (STRAPI CMS version)
 */

import { useState } from 'react';
import Moment from 'moment';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

export default function useCustomSpot() {
  const [createdAt, setCreatedAt] = useState('Jan 1, 2021');
  const [categories, setCategories] = useState(
    <Link href="/spots">
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
    initSpot: (spot) => {
      let categoriesView, titleView;

      if (spot.title) {
        titleView = (
          <h4 className="ps-post__title">
            <Link href={`/spot/${spot.slug}`}>
              <a>{spot.title}</a>
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

      if (spot.created_at) {
        setCreatedAt(Moment(spot.created_at).format('MMM DD, YYYY'));
      }
      if (
        spot.created_by &&
        spot.created_by.firstname &&
        spot.created_by.lastname
      ) {
        setAuthor(`${spot.created_by.firstname} ${spot.created_by.lastname}`);
      }
      if (
        spot.updated_by &&
        spot.updated_by.firstname &&
        spot.updated_by.lastname
      ) {
        setAuthor(`${spot.updated_by.firstname} ${spot.updated_by.lastname}`);
      }
      if (spot.categories && spot.categories.length > 0) {
        categoriesView = spot.categories.map((item) => (
          <Link
            href="/spots/category/[slug]"
            as={`/spots/categories/${item.slug}`}
            key={item.id}
          >
            <a>{item.name}</a>
          </Link>
        ));
        setCategories(categoriesView);
      }
      if (spot.thumbnail) {
        const thumbnailImage = (
          <LazyLoad>
            <img src={`${spot.thumbnail?.url}`} alt="img" />
          </LazyLoad>
        );
        setThumbnail(thumbnailImage);
      }

      if (spot.wide_thumbnail) {
        const wideThumbImage = (
          <LazyLoad>
            <img src={`${spot.wide_thumbnail?.url}`} alt="img" />
          </LazyLoad>
        );
        setWideThumbnail(wideThumbImage);
        setWideThumbImageUrl(`${spot.wide_thumbnail?.url}`);
      }
    },
  };
}
