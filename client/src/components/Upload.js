import React, { Component } from 'react'

const api = "localhost:4000"

class Upload extends React.Component  {
  constructor() {
    super();
    this.state = {
      loading: false,
      url: "",
      caption: "",
      image: "",
      audio: ""
    };
  };
  

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      caption: "",
      image: "",
      audio: ""
    })

    if (e.target.id === "audio") {
      e.persist();
      console.log(e)
      const file = e.target[0].files[0];
      if (!file) {console.log("no file")};
      this.upload(file);
    }
    else {
      const file = e.target[1].files[0];
      if (!file) {console.log("no file")};
      this.upload(file);
    };
  };

  handleAudio = async e => {
    // e.preventDefault();
    e.persist();
    const file = e.target[2].files[0]
    if (!file) console.log("no file");
    this.upload(file)
  };

  handleImage = e => {
    // e.preventDefault();
    const file = e.target[1].files[0]
    if (!file) console.log("no file");
    this.upload(file)
  };

  upload = async file => {
    // const file = e.target[1].files[0];
    //   if (!file) return;

      
      const payload = await fetch(`http://${api}/s3/direct_post`).then(res =>
        res.json()
      );
      console.log(payload)

      const url = payload.url;
      const formData = new FormData();

      Object.keys(payload.fields).forEach(key =>
        formData.append(key, payload.fields[key])
      );
      formData.append('file', file);

      const xml = await fetch(url, {
        method: 'POST',
        body: formData
      }).then(res => res.text())

      console.log(xml)
    
      const uploadUrl = new DOMParser()
        .parseFromString(xml, 'application/xml')
        .getElementsByTagName('Location')[0].textContent;

      this.setState({
        ...this.state,
        loading: false,
        url: uploadUrl
      })
      

  };

  handleChange = e => {
    const {name, value} = e.target
        this.setState({
            [name]: value
        })
  }

  render() {
    return (
      <div className="app">
        <header className="app__body">
          <form id="image" onSubmit={this.handleSubmit}>
            <label htmlFor="caption">
              Caption
            </label>
              <input type="text" name="caption" value={this.state.caption} onChange={this.handleChange} />
            <label htmlFor="image" >
              Upload image
            </label>
              <input type="file" name="image" accept="image/*" value={this.state.image} onChange={this.handleChange} />
            <input type="submit" value="Upload"/>
          </form>
            <br></br>
          <form id="audio" onSubmit={this.handleSubmit}>
            <label htmlFor="audio">
              Upload MP3
            </label>
              <input type="file" name="audio" accept="audio/*" value={this.state.audio} onChange={this.handleChange} />
            <input type="submit" value="Upload" />
          </form>
        </header>
      </div>
    );
  };
};

export default Upload;
