import getAuth0Token from "../getAuth0Token"

const axios = require('axios').default;

export default async function getUserByEmail(email: string) {
    const auth0_issuer_base_url = process.env.AUTH0_ISSUER_BASE_URL

    // const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users?q=email%3A%22${email}%22&search_engine=v3`
    const token = await getAuth0Token()
    const decodedEmail = decodeURIComponent(email)

    const options = {
        method: 'GET',
        url: `${auth0_issuer_base_url}/api/v2/users`,
        params: { q: `email:"${decodedEmail}"`, search_engine: 'v3' },
        headers: { authorization: `Bearer ${token}` }
    }

    const users = await axios.request(options).then(function (response: any) {
        return response.data
    }).catch(function (error: any) {
        console.error(error);
    });

    return users
}