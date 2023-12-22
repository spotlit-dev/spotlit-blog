import { gql } from '@apollo/client';
import { parseISO, format } from 'date-fns';

import strapiClient from './StrapiClient';
import spotlitClient from './SpotlitClient';

function transformPosts({ data }) {
  if (!data || data.length === 0) {
    return { data };
  }

  return {
    data: {
      ...data,
      posts: data.posts.map((post) => {
        console.log(typeof post.createdAt, post.createdAt);

        return {
          ...post,
          author: post.created_by
            ? `${post.created_by?.firstname} ${post.created_by?.lastname}`
            : 'Spotlit Admin',
          createdAt:
            post.createdAt && format(parseISO(post.createdAt), 'MMM do, Y'),
          href: `/post/${post.slug}`,
          shortDesc:
            (post.description && `${post.description.slice(0, 100)}…`) || '',
        };
      }),
    },
  };
}

const GET_POSTS = gql`
  query Posts(
    $limit: Int
    $start: Int
    $where: JSON
    $sort: String
    $locale: String
  ) {
    posts(
      limit: $limit
      start: $start
      where: $where
      sort: $sort
      locale: $locale
    ) {
      id
      slug
      title
      description
      createdAt
      created_by {
        firstname
        lastname
      }
      updated_by {
        firstname
        lastname
      }
      nbrLike
      thumbnail {
        url
      }
    }
    postsCount(where: $where)
  }
`;

export async function getPosts(variables) {
  const { data } = await strapiClient
    .query({
      query: GET_POSTS,
      variables: {
        ...variables,
        locale: variables.locale.split('-')[0],
      },
      // ignore cache when loading posts for SSR
      fetchPolicy: typeof window === 'undefined' ? 'no-cache' : 'cache-first',
    })
    .then(transformPosts);

  return data;
}

const GET_POST_BY_SLUG = gql`
  query Post($slug: String!, $locale: String) {
    posts(limit: 1, where: { slug: $slug }, locale: $locale) {
      id
      slug
      title
      description
      content
      createdAt
      created_by {
        firstname
        lastname
      }
      updated_by {
        firstname
        lastname
      }
      nbrLike
      thumbnail {
        url
      }
      spot
    }
  }
`;

export async function getPostBySlug(slug, { locale }) {
  const { data } = await strapiClient
    .query({
      query: GET_POST_BY_SLUG,
      variables: { slug, locale: locale.split('-')[0] },
    })
    .then(transformPosts);

  return data.posts?.[0] || null;
}

const GET_POST_COMMENTS = gql`
  query PostComments($postId: String!, $pagination: PaginationOption!) {
    comments: getOneBlogArticleComments(
      blogArticleId: $postId
      pagination: $pagination
    ) {
      edges {
        node {
          _id
          content
          createdAt
          user {
            name
            coverPicture
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`;

function transformComments({ data: { comments } }) {
  return {
    data: {
      comments: comments.edges.map(({ node }) => node),
      pageInfo: comments.pageInfo,
    },
  };
}

export async function getPostComments(postId, pagination) {
  const { data } = await spotlitClient
    .query({
      query: GET_POST_COMMENTS,
      variables: { postId, pagination },
    })
    .then(transformComments)
    .catch((error) => {
      console.error(error);
      return { data: { comments: [] } };
    });

  return data;
}
