import React from 'react';
import GOOGLE_API_KEY from '../../api_key';

class MainPage extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Restaurants</title>
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
            async defer
          />
          <script src="/client.js" />
        </body>
      </html>
    );
  }
}

export default MainPage;

