const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('./crypto.js')
const integrityAPI = require('./account.js')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body)
    res.json(res.body)
})
app.post("/challenge", (req, res) => {
    const data = req.body.data
    console.log(data)
    const crypt = crypto.createChallenge(data)
    console.log(crypt)
    res.json(
        {
            data: crypt
        }
    )
})

app.post("/verify", async (req, res) => {
    try {
        res.json(await integrityAPI.getTokenResponse(req.body.data))
    } catch (e) {
        res.status(400).send({
            error: e
        })
    }
})

app.post("/login", async (req, res) => {
    const integrity = req.headers["x-integrity"]
    console.log("HEADER", integrity)
    const integrityResponse = await integrityAPI.getTokenResponse(integrity)
    console.log(integrityResponse.data.tokenPayloadExternal)
    return res.json(
        {
            status: "okay",
            integrity: integrityResponse
        }
    )
})


app.listen(PORT, () => {
    console.log(`Starting the server port: ${PORT}`)
})