import React from 'react';
import GOOGLE_API_KEY from '../../api_key';

class MainPage extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Restaurants</title>

          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
          />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" type="text/css" href="/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Courgette"
            rel="stylesheet"
          />
        </head>

        <body>
          <div id="app">Loading...</div>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
              GOOGLE_API_KEY,
            )}&libraries=places`}
            async
            defer
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js" />

          <script src="/client.js" />
        </body>
      </html>
    );
  }
}

export default MainPage;
