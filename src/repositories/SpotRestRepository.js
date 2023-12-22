import Repository, { baseUrl, serializeQuery } from './RestRepository';

function transformSpots(response) {
  if (!response.data || response.data.length === 0) {
    return null;
  }

  return response.data.map((spot) => ({
    ...spot,
    id: spot.idAlias,
    slug: [
      encodeURIComponent(spot.label.toLowerCase()),
      spot.idAlias.split('-')[0],
    ].join('-'),
    title: spot.label,
  }));
}

function getFirst(spots) {
  return spots && spots[0];
}

function transformError(error) {
  console.error(error);

  return { error: error.message };
}

class SpotRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getSpots(payload) {
    return Repository.get(`${baseUrl}/spots?${serializeQuery(payload)}`)
      .then(transformSpots)
      .catch(transformError);
  }

  async getSpotBySlug(payload) {
    return Repository.get(
      `${baseUrl}/spots?idAlias_containss=${payload.split('-').slice(-1)[0]}-`
    )
      .then(transformSpots)
      .then(getFirst)
      .catch(transformError);
  }

  async getSpotItemsByKeyword(payload) {
    return Repository.get(`${baseUrl}/spots?title_contains=${payload}`)
      .then(transformSpots)
      .catch(transformError);
  }

  // TODO: fix this!
  async getSpotItemsByCategory(payload) {
    return Repository.get(`${baseUrl}/spots?title_contains=${payload}`)
      .then(transformSpots)
      .catch(transformError);
  }
}

export default new SpotRepository();
