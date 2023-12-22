import React from 'react';
import Slider from 'react-slick';

import ArticlePrimary from '~/components/elements/articles/ArticlePrimary';
import SkeletonHeroFullScreen from '~/components/elements/skeletons/SkeletonHeroFullScreen';

const CollectionFeatureItemsWithHero = ({ container = false, items }) => {
  const carouselSetting = {
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    lazyLoad: true,
    fade: true,
  };
  const ItemsView =
    items && items.length ? (
      <Slider {...carouselSetting} arrows={false} className="ps-carousel">
        {items.map((item) => (
          <div key={item.id}>
            <ArticlePrimary item={item} />
          </div>
        ))}
      </Slider>
    ) : (
      <SkeletonHeroFullScreen />
    );

  return !container ? (
    <section className="ps-collection--with-hero">{ItemsView}</section>
  ) : (
    <section className="ps-collection--with-hero with-container">
      <div className="container">{ItemsView}</div>
    </section>
  );
};

export default CollectionFeatureItemsWithHero;
