import axios from 'axios';
const querystring = require('querystring');
const debug = require('debug')('covalentjs');

const { COVALENT_API_HOST } = require('./constants');

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

console.log(process.env.NEXT_PUBLIC_API_KEY);

// const request = async(api, query = {}) => {
//     if (!API_KEY) {
//         throw new Error('Please set API_KEY environment variable.')
//     }

//     query.key = API_KEY;

//     try {
//         const url = `${API_HOST}${api}?${querystring.stringify(query)}`;
//         debug(url);
//         const response = await axios.get(url);

//         return response.data;
//     } catch (error) {
//         debug(error);
//         return error.response && error.response.data;
//     }
// };

// export default request;

export async function request(api, query = {}) {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (!API_KEY) {
        throw new Error('Please set API_KEY environment variable.')
    }

    query.key = API_KEY;

    try {
        const url = `${COVALENT_API_HOST}${api}?${querystring.stringify(query)}`;
        debug(url);
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        debug(error);
        return error.response && error.response.data;
    }
}