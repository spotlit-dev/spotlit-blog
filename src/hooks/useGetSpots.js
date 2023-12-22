import { useState } from 'react';
import SpotRepository from '~/repositories/SpotRestRepository';

export default function useGetSpots() {
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState(null);
  const [spot, setSpot] = useState(null);
  return {
    loading,
    spot,
    spots,
    setSpots: (payload) => {
      setSpots(payload);
    },

    setLoading: (payload) => {
      setLoading(payload);
    },

    getSpots: async (payload) => {
      let responseData;
      setLoading(true);
      responseData = await SpotRepository.getSpots(payload);

      if (responseData) {
        setTimeout(
          function () {
            setSpots(responseData);
            setLoading(false);
          }.bind(this),
          250
        );
      } else {
        setLoading(false);
      }
    },
    getSpot: async (payload) => {
      let responseData;
      setLoading(true);
      responseData = await SpotRepository.getSpotBySlug(payload);

      if (responseData) {
        setTimeout(
          function () {
            setSpot(responseData);
            setLoading(false);
          }.bind(this),
          250
        );
      } else {
        setLoading(false);
      }
    },
    getSpotsByCollection: async (payload) => {
      let responseData;
      setLoading(true);
      responseData = await SpotRepository.SPGetSpotItemOfCollectionBySlug(
        payload
      );

      if (responseData) {
        setTimeout(
          function () {
            setSpots(responseData);
            setLoading(false);
          }.bind(this),
          250
        );
      } else {
        setLoading(false);
      }
    },
  };
}
