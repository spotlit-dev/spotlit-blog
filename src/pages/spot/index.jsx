import React, { useMemo } from 'react';

import { getSpots } from '~/repositories/SpotRepository';

import Subscribe from '~/components/partials/common/Subscribe';
import ItemsGrid from '~/components/partials/item/ItemsGrid';
import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import CollectionFeatureItemsWithHero from '~/components/partials/collections/CollectionFeatureItemsWithHero';
import Container from '~/components/layouts/Container';

const PAGE_SIZE = 30;

export async function getServerSideProps({ query: { page = 1 }, locale }) {
  const data = await getSpots({
    sort: 'createdAt:desc,label:desc',
    limit: PAGE_SIZE,
    start: (Number(page) - 1) * PAGE_SIZE,
    where: { isValidated: true },
    locale,
  });

  return {
    props: {
      ...data,
      messages: {
        ...require(`../../messages/common/${locale}.json`),
        ...require(`../../messages/list/${locale}.json`),
      },
    },
  };
}

const Index = ({ spots, spotsCount }) => {
  return (
    <Container
      title="Latest Spots"
      header={<HeaderSimple className="header--simple" />}
    >
      <main id="homepage-grid">
        <CollectionFeatureItemsWithHero items={spots} />
        <div className="container">
          {/* <Subscribe /> */}
          <section className="ps-section--home-grid">
            <ItemsGrid items={spots} columns={3} itemsCount={spotsCount} />
          </section>
        </div>
      </main>
    </Container>
  );
};

export default Index;
