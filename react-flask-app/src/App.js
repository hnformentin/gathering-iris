import logo from './logo.svg';
import './App.css';

import { Button } from '@equinor/eds-core-react'
import { Icon } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
Icon.add({ info_circle })

function App() {
  return (
    <div className="App">
      <header className="Ultimate Weathertron 3000">
        <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-font.css" />
        <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-regular.css" />
        <img src="https://eds-static.equinor.com/logo/equinor-logo-primary.svg#red" alt="Equinor" />
        <Icon name="info_circle" size={24} />
        <p>
          The textfields should contain your geolocation. 
          You can input another location (latitude, longitude) manually.
        </p>

        <input type="text" id="lat" value="59.89552" />
        <input type="text" id="long" value="10.62908" />
        <p id="status"></p>
        <a id="map-link" target="_blank"></a>
        <form method="POST" id="userFileForm" enctype="multipart/form-data">
          <input type="file" id="userFile" name="file" />
          <Button type="submit" role="button">Upload File</Button>
        </form>
        <script src="d3.min.js" defer></script>
        <script src="src.js" defer></script>

      </header>
    </div>
  );
}

export default App;
