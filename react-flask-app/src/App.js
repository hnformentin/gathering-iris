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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ultimate Weathertron 3000
        </a>


        <Button variant="outlined" color="secondary">
          Upload data
        </Button>

      </header>
    </div>
  );
}

export default App;
