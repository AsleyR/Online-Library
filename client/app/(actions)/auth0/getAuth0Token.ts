import { UserProfile } from "@auth0/nextjs-auth0/client";

const axios = require('axios').default;

export default async function getAuth0Token() {
    const auth0_issuer_base_url = process.env.AUTH0_ISSUER_BASE_URL
    const client_id = process.env.AUTH0_CLIENT_ID
    const client_secret = process.env.AUTH0_CLIENT_SECRET

    var options = {
        method: 'POST',
        url: `${auth0_issuer_base_url}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: `${client_id}`,
            client_secret: `${client_secret}`,
            audience: `${auth0_issuer_base_url}/api/v2/`
        })
    };

    const newToken: UserProfile[] = await axios.request(options).then(function (response: any) {
        return response.data.access_token
    }).catch(function (error: any) {
        console.error(error);
    });

    return newToken
}