import axios from 'axios';
const querystring = require('querystring');
const debug = require('debug')('covalentjs');

const { OPENSEA_API_HOST } = require('./constants');

export async function request(api, query = {}) {

    try {
        const url = `${OPENSEA_API_HOST}${api}`;
        // const url = "https://api.opensea.io/api/v1/collections?asset_owner=0xb136cF543f02F5633042b53B0fb9b8ff1cd95B25"
        debug(url);
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        debug(error);
        return error.response && error.response.data;
    }
}