import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';    


class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
        files: [],
        downloading: false,
        converting: false,
        uploading: false,
        progress: 0,
        fileName: ''
    };
 }

  onDrop = (acceptedFiles) => {
        this.setState({
            files: acceptedFiles,
            fileName: '',
            uploading: true
        });

        console.log(acceptedFiles);     
        var req = request.post('/api/upload');
        acceptedFiles.forEach((file)=> {
            this.setState({
              fileName: file.name
            });
            req.attach(file.name, file);
        });
        req.on('progress', (e) => {
          this.setState({
            progress: e.percent
          });
        });        
        req.end((err, res) => {
          if (err) console.log(err);
          this.setState({
            uploading: false
          });
        });
    }

  afterTheDrop = (argument) => {
    var req = request.get(argument);
    this.setState({
      converting: true
    });
    req.on('progress', (e) => {
      this.setState({
        convertingProgress: e.percent
      });
    });
    req.end((err, res) => {
      if (err) console.log(err);
      this.setState({
        converting: false
      });
    });
  }

  onOpenClick = ()  => {
      this.refs.dropzone.open();
    }   

  render() {
    return (
        <div>
          <h1>Testing this famous Dropzone!</h1>
          <Dropzone ref="dropzone" onDrop={this.onDrop} >
                <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick}>
                  Open Dropzone
          </button>
              <h2>Uploading {this.state.files.length} files...</h2>
              <div>{this.displayPreviews}</div>
              <div>
              {this.state.files.length > 0 ? this.state.files.map((f) => {
                return <img src={f.preview} />
              }) : null}
              {this.state.uploading ? <div><h2>I am uploading!</h2><p>On progress{': '+this.state.progress+'%'}</p></div> : null}
          </div>
          <a href={this.state.files.length > 0 ? "/api/download/" + this.state.fileName : null} download="">
            <button>Donwload the file</button>
            {this.state.downloading ? 'I am downloading' : null}
          </a>
        </div>
    );
  }
}

export default Ocr;
