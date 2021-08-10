import { request } from '../covalent';

const getNFTTransactions = (chain_id, address, token_id, query = {}) => {
    const api = `/${chain_id}/tokens/${address}/nft_transactions/${token_id}/`;

    return request(api, query);
};

export default getNFTTransactions;