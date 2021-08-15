import { request } from '../covalent';

const getNFTTokenIDs = (chain_id, address, query = {}) => {
    const api = `/${chain_id}/tokens/${address}/nft_token_ids/`;

    return request(api, query);
};

export default getNFTTokenIDs;