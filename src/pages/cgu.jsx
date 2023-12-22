import React from 'react';

import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import Container from '~/components/layouts/Container';

export async function getServerSideProps({ locale = 'en' }) {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
      },
    },
  };
}

function Cgu() {
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
            src="/static/cgu-spotlit.pdf"
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

export default Cgu;
