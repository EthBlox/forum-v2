import { request } from '../covalent';

const getHistoricalPortfolioValueOverTime = (chain_id, address, query = {}) => {
    const api = `/${chain_id}/address/${address}/portfolio_v2/`;

    return request(api, query);
};



export default getHistoricalPortfolioValueOverTime;