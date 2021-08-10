import { request } from '../opensea';

const getTokenMetaData = (address, tokenAddress, query = {}) => {
    const api = `/assets?owner=${address}&asset_contract_address=${tokenAddress}`;

    return request(api, query);
};

export default getTokenMetaData;