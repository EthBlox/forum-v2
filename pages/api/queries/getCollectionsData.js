import { request } from '../opensea';

const getCollectionsData = (address, query = {}) => {
    const api = `/collections?asset_owner=${address}`;

    return request(api, query);
};

export default getCollectionsData;