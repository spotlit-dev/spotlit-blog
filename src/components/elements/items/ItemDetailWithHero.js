import React, { useMemo } from 'react';
import Link from 'next/link';
import { Row, Col } from 'antd';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useTranslations } from 'use-intl';

import ModuleArticleSocialSharing from '~/components/elements/articles/modules/ModuleArticleSocialSharing';
import ModuleArticleTags from '~/components/elements/articles/modules/ModuleArticleTags';
import ModuleArticleCommentListing from '~/components/elements/articles/modules/ModuleArticleCommentListing';
import ModuleItemGallery from '~/components/elements/items/modules/ModuleItemGallery';
import ModuleItemMap from '~/components/elements/items/modules/ModuleItemMap';
import ItemsGrid from '~/components/partials/item/ItemsGrid';

const ItemDetailWithHero = ({ item, comments }) => {
  const t = useTranslations('ItemDetailWithHero');
  const wideThumbnail = `${item.wide_thumbnail?.url || item.thumbnail?.url}`;
  const tagItems = item.tags && item.tags.split(',');
  const partialCategories = (item.categories || []).map((cat) => (
    <Link href={`/categories/${cat.slug}`} key={cat.id}>
      <a className="ps-post__category">{cat.name}</a>
    </Link>
  ));
  const { address } = item;
  const fullAddress =
    address &&
    `${address.line}, ${address.zipCode} ${address.city}, ${address.country}`;
  // if (post.content.match(/<img/)) {
  //   newPostContent = post.content.replace(
  //     /<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi,
  //     `<img$1 src=$2${baseUrl}/uploads/$3$2`
  //   );
  // } else {
  //   newPostContent = post.content;
  // }
  const links = useMemo(
    () => [
      ...(item.websites || []).map((href) => ({
        href,
        label: href.replace(/https?:\/\//, ''),
        icon: 'icon-link',
      })),
      ...(item.menus || []).map((href, i) => ({
        href,
        label: `Menu ${i + 1}`,
        icon: 'icon-book-open',
      })),
      ...Object.keys(item.socialNetworks || {})
        .filter((network) => Boolean(item.socialNetworks[network]))
        .map((network) => ({
          href: `https://${network}.com/${item.socialNetworks[network]}`,
          label: item.socialNetworks[network]
            .replace(/\?.*/, '')
            .replace(/(^\/|\/$)/g, ''),
          icon: `icon-${network}`,
        })),
      ...(item.phones || []).map((number) => ({
        href: `tel:${number}`,
        label: number,
        icon: 'icon-phone',
      })),
    ],
    [item]
  );

  return (
    <div className="ps-post--detail ps-post--detail-with-hero">
      <div style={{ overflow: 'hidden' }}>
        <div
          className="ps-post__thumbnail"
          style={{
            background: `repeat 0px / 2px url(/static/checkerboard.png), center / cover url(${wideThumbnail}?tr=h-400,q-50)`,
            backgroundColor: 'transparent',
          }}
        ></div>
      </div>
      <div className="ps-post__wrapper">
        <div className="ps-post__header">
          <div className="ps-post__meta">
            <span>{item.createdAt}</span>
          </div>
          <h1>{item.title}</h1>
        </div>
        <div className="ps-post__content">
          <div className="ps-document">
            {item.pictures ? (
              <div className="ps-document__header">
                <ModuleItemGallery pictures={item.pictures} />
              </div>
            ) : (
              ''
            )}

            {item.pictures ? <h3>{t('description')}</h3> : ''}
            <div className="ps-post__content-simple">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {item.content}
              </ReactMarkdown>
            </div>

            {item.spot ? (
              <div style={{ textAlign: 'center' }}>
                <Link href={`/spot/spot-${item.spot.split('-')[0]}`}>
                  <a
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    {t('discover this spot')}
                  </a>
                </Link>
              </div>
            ) : (
              ''
            )}

            {item.position ? (
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  {links.length ? (
                    <>
                      <h3>{t('links & contacts')}</h3>
                      <ul className="unstyled mb-5">
                        {links.map(({ href, label, icon }) => (
                          <li key={href}>
                            <Link href={href}>
                              <a className="text-decoration-none fs-4">
                                <i className={`icon feather ${icon}`}></i>{' '}
                                {label}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    ''
                  )}

                  <h3>{t('opening hours')}</h3>
                  <p>
                    <ul>
                      {Object.keys(item.openings).map((day) => (
                        <li key={day} style={{ textTransform: 'capitalize' }}>
                          {day}: {item.openings[day]}
                        </li>
                      ))}
                    </ul>
                  </p>
                </Col>
                <Col xs={24} md={16}>
                  <h3>{t('address')}</h3>
                  <p>
                    <Link
                      href={`https://www.google.com/maps/search/${encodeURIComponent(
                        fullAddress
                      )}`}
                    >
                      {fullAddress}
                    </Link>
                  </p>
                  <ModuleItemMap position={item.position} />
                </Col>
              </Row>
            ) : (
              ''
            )}

            <div className="ps-post__footer">
              <ModuleArticleTags tags={tagItems} />
              {/* <ModuleArticleSocialSharing /> */}
            </div>
          </div>
          {/*<div className="ps-post__navigation">
                        <ModuleNextOrPreviosPost />
                    </div>*/}
          <div className="ps-post__comments">
            <ModuleArticleCommentListing comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailWithHero;
