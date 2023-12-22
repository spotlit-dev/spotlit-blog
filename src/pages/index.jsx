import React, { useMemo } from 'react';
import { useTranslations } from 'use-intl';

import { getPosts } from '~/repositories/PostRepository';
import { getSpots } from '~/repositories/SpotRepository';

import Subscribe from '~/components/partials/common/Subscribe';
import ItemsGrid from '~/components/partials/item/ItemsGrid';
import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import CollectionFeatureItemsWithHero from '~/components/partials/collections/CollectionFeatureItemsWithHero';
import Container from '~/components/layouts/Container';

const PAGE_SIZE = 9;

export async function getServerSideProps({ locale = 'en' }) {
  const queryParams = {
    sort: 'createdAt:desc',
    limit: PAGE_SIZE,
    start: 0,
    locale,
  };
  const [postsData, spotsData] = await Promise.all([
    getPosts({ ...queryParams, where: { isActive: true } }),
    getSpots({ ...queryParams, where: { isValidated: true } }),
  ]);

  return {
    props: {
      ...postsData,
      ...spotsData,
      messages: {
        ...require(`../messages/common/${locale}.json`),
        ...require(`../messages/list/${locale}.json`),
      },
    },
  };
}

const Index = ({ posts, spots }) => {
  const t = useTranslations('Index');
  const collections = useMemo(
    () => [
      {
        title: t('Latest Articles'),
        items: posts,
        type: 'post',
        icon: 'feather icon icon-book-open',
      },
      {
        title: t('Recently Added Spots'),
        items: spots,
        type: 'spot',
        icon: 'feather icon icon-map-pin',
      },
    ],
    [posts, spots, t]
  );

  return (
    <Container
      title="Homepage"
      header={<HeaderSimple className="header--simple" />}
    >
      <main id="homepage-grid">
        <CollectionFeatureItemsWithHero items={posts} />
        {collections.map(({ title, items, type, icon }, i) => (
          <section
            key={title}
            className={`ps-collection${i % 2 === 0 ? '--highlight' : ''}`}
          >
            <div className="container">
              <div className="ps-section__header">
                <h3 className="ps-heading ps-heading--with-icon white">
                  <i className={icon}></i>
                  {title}
                </h3>
              </div>
              <div className="ps-section__content">
                <ItemsGrid items={items} columns={3} type={type} />
              </div>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default Index;
