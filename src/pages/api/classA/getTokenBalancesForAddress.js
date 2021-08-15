import { request } from '../covalent';

const getTokenBalancesForAddress = (chain_id, address, query = {}) => {
    const api = `/${chain_id}/address/${address}/balances_v2/`;

    return request(api, query);
};

export default getTokenBalancesForAddress;