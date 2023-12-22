import React, { useMemo } from 'react';

import { getPostBySlug, getPostComments } from '~/repositories/PostRepository';

import RelatedPosts from '~/components/partials/post/RelatedPosts';
import HeaderSimple from '~/components/shared/headers/HeaderSimple';
import Container from '~/components/layouts/Container';
import ItemDetailWithHero from '~/components/elements/items/ItemDetailWithHero';

export async function getServerSideProps({ query: { slug }, locale }) {
  const post = await getPostBySlug(slug, { locale });
  const { comments } = await getPostComments(post.id, {
    after: 20,
    before: 0,
  });

  return {
    props: {
      post,
      comments,
      messages: {
        ...require(`../../messages/common/${locale}.json`),
        ...require(`../../messages/detail/${locale}.json`),
      },
    },
  };
}

const PostDetailScreen = ({ post, comments }) => {
  const breadcrumb = useMemo(
    () => [
      {
        text: 'Home',
        url: '/',
      },
      {
        text: 'Posts',
        url: '/post',
      },
      {
        text: post ? post.title : 'Post detail',
      },
    ],
    [post]
  );

  return (
    <Container
      header={<HeaderSimple className="header--simple" />}
      title={post.title}
      description={post.description}
      thumbnail={post.thumbnail}
    >
      <main className="ps-page ps-page--blog">
        <main className="ps-page ps-page--single-post">
          <ItemDetailWithHero item={post} comments={comments} />
          {/* <RelatedPosts slug="home-featured-posts" /> */}
        </main>
      </main>
    </Container>
  );
};

export default PostDetailScreen;
