import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({

    clientId: 'vcxuELlujtvu5gOM0SCOZY62RXINuoX8',
    clientSecret: 'wo5VVQP_ihlISuj4Zdsyyisr6kMaLq6AffSGV-qQZ8G5YEsk_WhJ-6t5oZ1xtQAv',
    scope: 'user',
    domain: 'https://devplenovinaud.auth0.com',
    redirectUri: 'http://localhost:3000/api/calback',
    postLogoutRedirectUri: 'http://localhost:3000',
    session: {
        cookieSecret: 'abcabcabcabcbacbacbacbabcbaccaab',
        cookieLifetime: 3600
    }
})