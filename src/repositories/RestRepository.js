import axios from 'axios';

const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'https://blogapi-dev.spotlit.fr'; // Change your API_URL here

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};
