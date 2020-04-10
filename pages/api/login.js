import auth0 from '../../lib/auth0';

const login = async(request, response) => {
    auth0.handleLogin()
    response.send({
        name: 'joão vinaud'
    })
}

export default login;