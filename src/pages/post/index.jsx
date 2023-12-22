import React from 'react';

import { getPosts } from '~/repositories/PostRepository';

import Subscribe from '~/components/partials/common/Subscribe';
import ItemsGrid from '~/components/partials/item/ItemsGrid';
import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import CollectionFeatureItemsWithHero from '~/components/partials/collections/CollectionFeatureItemsWithHero';
import Container from '~/components/layouts/Container';

const PAGE_SIZE = 30;

export async function getServerSideProps({ query: { page = 1 }, locale }) {
  const data = await getPosts({
    sort: 'createdAt:desc',
    limit: PAGE_SIZE,
    start: (Number(page) - 1) * PAGE_SIZE,
    where: { isActive: true },
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

const Index = ({ posts, postsCount }) => {
  return (
    <Container
      title="Latest Posts"
      header={<HeaderSimple className="header--simple" />}
    >
      <main id="homepage-grid">
        <CollectionFeatureItemsWithHero items={posts} />
        <div className="container">
          {/* <Subscribe /> */}
          <section className="ps-section--home-grid">
            <ItemsGrid items={posts} columns={3} itemsCount={postsCount} />
          </section>
        </div>
      </main>
    </Container>
  );
};

export default Index;
