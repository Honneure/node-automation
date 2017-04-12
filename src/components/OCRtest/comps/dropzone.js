import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class TheDropzone extends Component {

    onDrop = (files) => {
        this.setState({
        		files: files
        });    	
        var req = request.post('/api/upload');
        files.forEach((file)=> {
            req.attach(file.name, file);
        });
        req.end((err, res) => {
        	if (err) console.log(err);
        	console.log(res);
        	alert("It's Done");
        });
    }

     onOpenClick = ()  => {
      this.refs.dropzone.open();
    }

	render() {
		return (
			   <div>
	            <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={false}>
	              <div>Try dropping some files here, or click to select files to upload.</div>
	            </Dropzone>
	            <button type="button" onClick={this.onOpenClick}>
	                Open Dropzone
	            </button>
	            {this.state.files ? <div>
	            <h2>Uploading {this.state.files.length} files...</h2>
	            <img src={this.state.files.preview} />
	            </div> : null}
	          </div>
		);
	}

}

export default = TheDropzone;