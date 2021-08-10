import { request } from '../covalent';

const getExternalNFTMetadata = (chain_id, address, token_id, query = {}) => {
    const api = `/${chain_id}/tokens/${address}/nft_metadata/${token_id}/`;

    return request(api, query);
};

export default getExternalNFTMetadata;