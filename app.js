const express = require('express')
const auth = require('./auth')


// web service
const app = express()
const port = 80

app.get('/', (req, res) => {
    console.log(`[${req.query.user}] is asking auth link...`)

    auth.generateLink(req.query.user).then(link => {
        // Connect it here: https://react-auth-wallet.walletconnect.com/walletconnect
        res.send(`${link}`)
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})


// auth service
auth.connect(process.env.WC_PROJECT_ID,authClient => {
    console.log(`WC Auth is running (projectID: ${process.env.WC_PROJECT_ID})...`)

    authClient.on('auth_response', ({ params }) => {
        if (Boolean(params.result?.s)) {
            // Response contained a valid signature -> user is authenticated.
            const { p } = params.result
            const userId = p.statement
            const walletAddress = p.iss.split(':')[4]
            console.log(`[${userId}] is authenticated --> ${walletAddress}`)
        } else {
            // Handle error or invalid signature case
            console.error(params.id)
        }
    })
})
