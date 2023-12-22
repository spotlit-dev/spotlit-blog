import React from 'react';
import Head from 'next/head';

const StyleSheets = () => (
  <Head>
    <title>Spotlit - Find your new favorite spots. Faster.</title>
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="icon" href="/static/favicon.png" sizes="32x32" />
    <link rel="icon" href="/static/favicon.png" sizes="192x192" />
    <link rel="apple-touch-icon-precomposed" href="/static/favicon.png" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="author" content="Spotlit" />
    <meta property="og:site_name" content="Spotlit" />
    <meta name="keywords" content="restaurant, spot, hotel, social" />
    <meta
      name="description"
      content="Spotlit - Find your new favorite spots. Faster."
    />
    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <link
      rel="stylesheet"
      type="text/css"
      href="/static/css/bootstrap.min.css"
    />
    <link rel="stylesheet" type="text/css" href="/static/css/slick.min.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="/static/fonts/feather-font/css/iconfont.css"
    />
  </Head>
);

export default StyleSheets;
