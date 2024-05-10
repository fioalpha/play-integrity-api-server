const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const playintegrity = google.playintegrity('v1');


const packageName = process.env.PACKAGE_NAME
const credential = process.env.CREDENTIAL

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
