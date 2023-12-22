import React from 'react';

const Subscribe = ({ boxed = true }) => {
  const common = (
    <>
      <div className="ps-section__left">
        <h3>Subscribe to Spotlit&apos;s Newsletter</h3>
        <p>
          Get the latest blog news, trends, street-style snaps, runway coverage,{' '}
          <br /> party reports, and more to your inbox!
        </p>
      </div>
      <div className="ps-section__right">
        <div className="ps-form--newsletter">
          <input className="form-control" placeholder="Enter your email..." />
          <button className="ps-btn ps-btn--black">Subscribe</button>
        </div>
      </div>
    </>
  );

  if (boxed) {
    return <section className="ps-section--subscribe">{common}</section>;
  } else {
    return (
      <section className="ps-section--subscribe fullwidth">
        <div className="container">{common}</div>
      </section>
    );
  }
};

export default Subscribe;
