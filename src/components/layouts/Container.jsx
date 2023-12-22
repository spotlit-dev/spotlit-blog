import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

import { fadeIn } from '~/utilities/animation';

import FooterSecond from '~/components/shared/footers/FooterSecond';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';

const Container = ({
  children,
  siteName = 'Spotlit',
  title,
  description,
  url,
  header = <HeaderDefault />,
  footer = <FooterSecond classes="dark" />,
  thumbnail,
}) => {
  const { asPath, locale } = useRouter();
  const fullTitle = `${siteName} | ${title}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${asPath}`;

  return (
    <motion.div key="homepage" initial="initial" animate="enter" exit="exit">
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta httpEquiv="content-language" content={locale} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || ''} />
        <meta
          property="og:image"
          content={`${thumbnail?.url}?tr=w-600,h-600,fo-auto`}
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Head>
      <motion.div variants={fadeIn}>
        {header}
        {children}
        {footer}
      </motion.div>
    </motion.div>
  );
};

export default Container;
