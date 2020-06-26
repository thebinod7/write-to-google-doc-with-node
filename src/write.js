const { google } = require("googleapis");
const token = require("../token.json");
const credentials = require("../credentials.json");
const config = require("config");

function authorize() {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function main(DOC_ID) {
  const auth = await authorize();
  const docs = google.docs({
    version: "v1",
    auth,
  });
  await docs.documents.batchUpdate({
    auth,
    documentId: DOC_ID,
    requestBody: {
      requests: [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: "hello world.!\n",
          },
        },
      ],
    },
  });
  console.log("========data written successfully.===========");
}

main(config.get("google.doc_id"));
