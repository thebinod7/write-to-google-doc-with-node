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

async function print(DOC_ID) {
  const auth = await authorize();
  const docs = google.docs({ version: "v1", auth });
  let d = await docs.documents.get({
    documentId: DOC_ID,
  });
  console.log("========", d.data);
}

print(config.get("google.doc_id"));
