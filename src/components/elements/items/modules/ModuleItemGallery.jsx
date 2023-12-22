import React from 'react';
import Slider from 'react-slick';

const ModuleItemGallery = ({ container = false, pictures = [] }) => {
  const carouselSetting = {
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    lazyLoad: true,
    fade: true,
    adaptiveHeight: true,
  };
  const PicturesView = (
    <Slider {...carouselSetting} className="ps-carousel">
      {pictures.map((pic) => (
        <img
          key={pic.id}
          src={`${pic.url}?tr=w-880,c-at_max`}
          alt={pic.name}
          style={{ width: '100%' }}
        />
      ))}
    </Slider>
  );

  return pictures.length ? (
    !container ? (
      <section className="ps-collection--with-hero">{PicturesView}</section>
    ) : (
      <section className="ps-collection--with-hero with-container">
        <div className="container">{PicturesView}</div>
      </section>
    )
  ) : (
    ''
  );
};

export default ModuleItemGallery;
