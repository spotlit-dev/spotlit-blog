import React from 'react';
import { NextIntlProvider } from 'next-intl';

import MasterLayout from '../components/layouts/MasterLayout';

import '~/scss/style.scss';
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }) {
  return (
    <MasterLayout>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </MasterLayout>
  );
}
