const AuthClient = require('@walletconnect/auth-client').AuthClient
const generateNonce = require('@walletconnect/auth-client').generateNonce

let client

function connect(projectId, callback) {
    AuthClient.init({
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: projectId,
        metadata: {
            name: 'test',
            description: 'Test WalletConnect AuthClient',
            url: 'http://localhost',
            icons: []
        }
    }).then((authClient) => {
        client = authClient
        callback(authClient)
    })
}

async function generateLink(userID) {
    if (!client) return ''

    const { uri } = await client.request({
        aud: 'http://localhost',
        domain: 'localhost',
        chainId: 'eip155:1',
        type: 'eip4361',
        nonce: generateNonce(),
        statement: userID
    })

    return uri
}

module.exports = {connect, generateLink}
