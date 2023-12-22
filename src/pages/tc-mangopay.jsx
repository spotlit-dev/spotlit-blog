/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import Container from '~/components/layouts/Container';
import {useLocale} from 'next-intl'

export async function getServerSideProps({ locale = 'en' }) {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
      },
    },
  };
}


function TcMangopay() {
const locale  = useLocale()
const lang = locale.slice(0, 2)
  return (
    <Container
      title="Privacy Policy"
      header={<HeaderSimple className="header--simple" />}
    >
      <main>
        <div
          className="container"
          style={{ padding: '70px 0', height: '120vh' }}
        >
          <embed
            src={`/static/payment-services_${lang.toUpperCase()}_2023.pdf`}
            type="application/pdf"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </main>
    </Container>
  );
}

export default TcMangopay;
