const client_id = '524244998138-jv54a5o5nrl1ka1l1sp19f4t97t8gj8l.apps.googleusercontent.com'
const scope = 'https://www.googleapis.com/auth/spreadsheets'

export const isLogged = () => {

}

export const login = () => {
  gapi.load('client:auth2', () => {
    gapi.auth2.init({
      client_id,
    }).then(() => {


    })
  });

  api.auth2.getAuthInstance()
    .signIn({ scope })
    .then(() => console.log("Sign-in successful"), err => console.error("Error signing in", err))
    .then(() => {
      gapi.client.setApiKey("AIzaSyAtgGjAz3Vk3wFJmoRPYuuRCEwRZpeFy0g");
      return gapi.client
        .load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(() => console.log("GAPI client loaded for API"), err => console.error("Error loading GAPI client for API", err))
    })
}

export const logout = () => {

}

export const post = ({ spreadsheetId, range, values }) => gapi.client.sheets.spreadsheets.values.append({
  spreadsheetId,
  range,
  "valueInputOption": "RAW",
  "resource": {
    values,
  }
})
