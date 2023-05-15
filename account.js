const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const playintegrity = google.playintegrity('v1');


const packageName = process.env.PACKAGE_NAME || "com.fioalpha.apiintegrity"
const credential = process.env.CREDENTIAL || {
    "type": "service_account",
    "project_id": "playintegritytest-386520",
    "private_key_id": "80d01dff4b35fa30aea794dd7e0969bd92b2f55f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHLEy0Ce0R+icr\nIKUbQjO7ME5WQd5pimy3veuNehQ6nA2MlH2/p+KUe1jQFT1+PijAM1uZXsNV6bsj\netldd4D8DoItdC7LmuHQoTekmDQIOqfMtaRYyjdlFrefLXdaUS3j/FCa0K2RXx1+\nBpXJpW0xqYU21QkQYco0oQIcmedGp+JqosYz2/+dIx5HUmGvnlvPklVr5WoTp552\n+lZNY+3YSHhAlugASUDtD8moZCSTaFTgbr6aBXSxYfw8D1xqit8e0WtNnpe5xUn6\nylrdPn8DjXSRafNHV07rZSn2qrGWIxDWTJztFGSVcqrUDsXGyP1kR8au0DmhiZ2F\nd7NEEj6dAgMBAAECggEAUlHl9fewS2DX9YRNmWGYXgLOLeqVkYuL+bl+dQADAmJj\nWzo4axFpnbMJdx+ARgBM+XuAnXhEResP1M8+rdnprsQUW9MMUEzYjlFD3TynLMuJ\ndRuSLLyPfrGP/TNehC7PR86ORh5/znjAiMkR+cDsy7zj+VC9qU6xs2TkqYuWwmWA\njFUJZP2kvIlE7sssCOh3fAlhBDMFhw5lRFlFKQNmSxzY81CqVgA9pZVawSP7y3DH\ntvLnAgFClpFl1lj9Wv77v5OAG75MjawNIoueMzleFji5mt2ZQx7KqFShEfrxdpgj\n4DoFip2ammKnwjqf1/JOZt4aqfld/2ixzJ0GCyA8RQKBgQDklbyKaANsyT2jT8zY\nFQaVHFCs9aiyFri1pv2KfU6z0iEeEE0nAC5DPPFoHnSRakA/ydvfjJvUH+X7t+fw\nROEAmS9jA1PdhBXyRG37SQH5PT49PA8cgzgCRETs3OcuwkQVu2JBXlK9e4d0+7Pl\nivyOsDV85/6cdCAdVeH64HPzMwKBgQDfD4crE7/B+inffMe3GbHsZ7JhRXDwLt+J\n+7ZaUnugKnkCMrE6IMDXR9hwsY6ZNJY9+dPKczUEZrC04c5NU9Qgj3zuPalWvOeP\nJX0FBVJyLVY9ag9j4c60AhR1es6G2UMI0xavZrEySWEhI5dLr7bJSjSoFAiNldbk\n9/7dv2UG7wKBgGy8Ccbw+YgbJnX0NOYpAkuV/453ATtN8al/eSYSu4hwkY5ihMDj\nph4X9GHp8ttlZpCxbiUmFs5OKjGWZv91VG7bb54y7Ab4mRP4lzSsowKzrlKkqi+O\n/+qcHQlrf5FPmeGYlIGx47v88g+k2At+FOuvSJJVLVmxJ8Gso+WaNa3fAoGAZFrL\nGFFZS38uSZMNE06nItIAigzA4/5iqeSqRPapEgUpzhhabemAeRqkwQbRPhJPqfB1\nHbc5WhKNW8PfmiCl5kRIE7OANTrl/xwBpDmhvyawjw7hf7F+2rO42qX2tuqWYyj9\nIsrT2+jxnwQxNGcImIUfLaNdub15IiiE7OUIIdcCgYBZPDRPLLHzjgC2JF2DD0pn\njgRSSKFmTAl/YKw1rhc3I9xnraEYpY6+dVf/aCQjyj/bkV8X7l04xs4cBIpg3dNP\nRekRgETHGSAfdGMy3woVfRS6yWDFPFL2TbLREDdObmljZIyw7JAT0v4cm9NLWvQn\nO/uKL1IFyTM1QpRwCX+1zw==\n-----END PRIVATE KEY-----\n",
    "client_email": "nodejs-732@playintegritytest-386520.iam.gserviceaccount.com",
    "client_id": "114137177490214964977",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nodejs-732%40playintegritytest-386520.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

module.exports.getTokenResponse = async (token) => {
    let jwtClient = new google.auth.JWT(
        credential.client_email,
        null,
        credential.private_key,
        ['https://www.googleapis.com/auth/playintegrity']);

    google.options({ auth: jwtClient });
    const decode = await playintegrity.v1.decodeIntegrityToken(
        {
            packageName: packageName,
            requestBody:{
                "integrityToken": token
            }
        }
    )
    console.log(decode)
    return decode

    // console.log(res.data.tokenPayloadExternal);
    // console.log(res.data.tokenPayloadExternal.deviceIntegrity)
    //
    // return res.data.tokenPayloadExternal
}