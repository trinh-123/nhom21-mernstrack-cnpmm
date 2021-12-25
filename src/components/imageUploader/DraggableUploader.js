import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./DraggableUploader.scss";

class DraggableUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFiles: [],
      files: [],
    };
  }

  addLoadedFile(file) {
    this.setState((prevState) => ({
      loadedFiles: [...prevState.loadedFiles, file],
    }));
  }

  addFiles(file) {
    this.setState((prevState) => ({
      files: [...prevState.files, file],
    }));
  }

  onFileLoad(e) {
    const file = e.currentTarget.files[0];
    // Create instance
    let fileReader = new FileReader();
    //Register event listeners
    fileReader.onload = () => {
      const fileData = {
        data: fileReader.result,
        isUploading: false,
      };
      //Add file
      this.addLoadedFile(fileData);
      this.addFiles(file);
    };
    //Operation Aborted
    fileReader.onabort = () => {
      alert("Reading Aborted");
    };
    //Error when loading
    fileReader.onerror = () => {
      alert("Reading ERROR!");
    };
    //Read the file as a Data URL (which gonna give you a base64 encoded image data)
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  removeLoadedFile(file, idx) {
    //Remove file from the State
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile !== file;
      });
      let files = [...prevState.files];

      return { loadedFiles: newLoadedFiles, files };
    });
  }

  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {
      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file === oldFile) loadedFiles[idx] = newFile;
      });

      return { loadedFiles };
    });

    return newFile;
  }

  onUpload() {
    const { files } = this.state;
    this.props.files(files);
  }

  render() {
    const { loadedFiles } = this.state;
    const { title } = this.props;
    return (
      <div
        className="inner-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="sub-header">{title}</div>
        <div className="draggable-container">
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={(input) => (this.fileInput = input)}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={this.onFileLoad.bind(this)}
            onChange={this.onFileLoad.bind(this)}
          />
          <div className="files-preview-container ip-scrollbar">
            {loadedFiles.map((file, idx) => {
              return (
                <div className="file" key={idx}>
                  <img src={file.data} alt="img" />
                  <div className="container">
                    <span className="progress-bar">
                      {file.isUploading && <ProgressBar />}
                    </span>
                    <span
                      className="remove-btn"
                      onClick={() => {
                        this.removeLoadedFile(file, idx);
                      }}
                    >
                      <DeleteForeverIcon />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="helper-text">
            Kéo thả vào đây hoặc chọn từ Browser
          </div>
          <div className="file-browser-container">
            <AnchorButton
              text="Browser"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}
            />
          </div>
        </div>
        <AnchorButton
          text="Xác nhận"
          intent={Intent.SUCCESS}
          onClick={this.onUpload.bind(this)}
        />
      </div>
    );
  }
}

DraggableUploader.propTypes = {
  title: PropTypes.string,
};

export default DraggableUploader;
