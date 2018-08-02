import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './index.css'

class Home extends Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  uploadBtn() {

  }

  render() {
    return (
      <div className="titlezone">
        <section>
          <div className="dropzone">
            <div className="dropZoneConfig">
              <Dropzone onDrop={this.onDrop} className="dZone">
                <h2>Drop a file here</h2>
                <p>Try dropping a circuit simulator file here, or click to select a file to upload.</p>
              </Dropzone>
            </div>
          </div>
          <aside>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
        <Link to="/analysis"><Button id="uploadBtn" className="uploadBtn" onClick={this.uploadBtn}>Start</Button></Link>
      </div>
    );
  }
}

export default Home;
