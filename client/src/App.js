import React from 'react';
import './App.css';
import { useState } from 'react';

const api = "localhost:4000"

function App() {

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const file = e.target[1].files[0];
    console.log(file)
    if (!file) return;

    setLoading(true);

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

    setLoading(false);
    setUrl(uploadUrl);  

  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="caption">
            Caption
          </label>
          <input type="text" name="caption" />
          <label htmlFor="image" >
            Upload image
          </label>
          <input type="file" name="image" accept="image/*" />

          <input type="submit" value="Submit" />
       </form>
      </header>
    </div>
  );
}

export default App;
