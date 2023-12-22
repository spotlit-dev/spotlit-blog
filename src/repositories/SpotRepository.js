import { gql } from '@apollo/client';
import { format } from 'date-fns';

import strapiClient from './StrapiClient';
import spotlitClient from './SpotlitClient';

function transformOpenings(openings) {
  const iTime2sTime = (iTime) =>
    `${Math.floor(iTime / 60)}:${String(iTime % 60).padStart(2, '0')}`;

  return [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ].reduce((week, day) => {
    week[day] =
      (openings || [])
        .filter((opening) => opening.day === day)
        .sort((a, b) => a.openingTime - b.openingTime)
        .map(
          ({ openingTime, closingTime }) =>
            `${iTime2sTime(openingTime)} - ${iTime2sTime(closingTime)}`
        )
        .join('  |  ') || false;

    return week;
  }, {});
}

function transformFiles(files, spotId) {
  return (
    (files &&
      files.map((pic) => ({
        id: pic._id,
        name: decodeURIComponent(pic.originalName),
        url:
          `${process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT}/spots/${spotId}/${pic._id}.jpeg` ||
          '',
      }))) ||
    ''
  );
}

function transformSpots({ data }, rawLocale) {
  if (!data || data.length === 0) {
    return { data };
  }

  const locale = rawLocale.split('-')[0];

  return {
    data: {
      ...data,
      spots: data.spots.map((spot) => {
        const slug = [
          encodeURIComponent(spot.label.toLowerCase()),
          spot.idAlias.split('-')[0],
        ].join('-');

        const pictures = transformFiles(spot.pictures, spot.idAlias, 'jpeg');
        const content = spot.description?.[locale] || '';

        return {
          ...spot,
          id: spot.idAlias,
          slug,
          title: spot.label,
          author: 'Spotlit Team',
          // createdAt: format(new Date(), 'MMM do, Y'),
          href: `/spot/${slug}`,
          content,
          shortDesc: `${content.slice(0, 100)}…`,
          thumbnail: pictures[0] || '',
          pictures,
          menus: transformFiles(spot.menus, spot.idAlias, 'pdf'),
          openings: (spot.openings && transformOpenings(spot.openings)) || null,
        };
      }),
    },
  };
}

const GET_SPOTS = gql`
  query Spots($limit: Int, $start: Int, $where: JSON, $sort: String) {
    spots(limit: $limit, start: $start, where: $where, sort: $sort) {
      idAlias
      label
      description
      nbrLike
      pictures
      isValidated
      createdAt
    }
    spotsCount(where: $where)
  }
`;

export async function getSpots(variables) {
  const { data } = await strapiClient
    .query({
      query: GET_SPOTS,
      variables,
    })
    .then((result) => transformSpots(result, variables.locale));

  return data;
}

const GET_SPOT_BY_SLUG = gql`
  query Spot($shortId: String!) {
    spots(limit: 1, where: { idAlias_containss: $shortId }) {
      idAlias
      label
      description
      pictures
      position
      address
      websites
      phones
      emails
      socialNetworks
      menus
      openings
      nbrLike
      createdAt
    }
  }
`;

export async function getSpotBySlug(slug, locale) {
  const shortId = `${slug.split('-').slice(-1)[0]}-`;

  const { data } = await strapiClient
    .query({
      query: GET_SPOT_BY_SLUG,
      variables: { shortId },
    })
    .then((result) => transformSpots(result, locale));

  return data.spots?.[0] || null;
}

const GET_SPOT_REVIEWS = gql`
  query SpotReviews($pagination: PaginationOption!, $spotId: String!) {
    reviews: adminGetSpotReviews(pagination: $pagination, spotId: $spotId) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        node {
          _id
          description
          rate
          createdAt
          user {
            name
            coverPicture
          }
        }
      }
    }
  }
`;

function transformReviews({ data: { reviews } }) {
  return {
    data: {
      reviews: reviews.edges.map(({ node }) => ({
        ...node,
        // the content field of reviews is named description :-/
        content: node.description,
      })),
      pageInfo: reviews.pageInfo,
    },
  };
}

export async function getSpotReviews(spotId, pagination) {
  const { data } = await spotlitClient
    .query({
      query: GET_SPOT_REVIEWS,
      variables: { spotId, pagination },
    })
    .then(transformReviews)
    .catch((e) => {
      console.error(e);
      return { data: { reviews: [] } };
    });

  return data;
}
