import React from 'react';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import { fadeIn } from '~/utilities/animation';
import { motion } from 'framer-motion';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';

const ContainerHome = ({
  children,
  title,
  header = <HeaderDefault />,
  footer = <FooterSecond classes="dark" />,
}) => {
  let titleView;
  if (title !== null) {
    titleView = process.env.NEXT_PUBLIC_WEBSITE_TITLE + ' | ' + title;
  } else {
    titleView =
      process.env.NEXT_PUBLIC_WEBSITE_TITLE +
      ' | ' +
      process.env.NEXT_PUBLIC_WEBSITE_TITLEDescription;
  }

  return (
    <motion.div key="homepage" initial="initial" animate="enter" exit="exit">
      <motion.div variants={fadeIn}>
        {header}
        {children}
        {footer}
      </motion.div>
    </motion.div>
  );
};

export default ContainerHome;
