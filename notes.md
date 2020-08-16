# App description
- rest api with cars that have and image and a mp3 
- users will crud all cars
- 


handleUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    this.setState({ loading: true });

    const payload = await fetch(`${API}/s3/direct_post`).then(res =>
      res.json()
    );

    const url = payload.url;
    const formData = new FormData();

    Object.keys(payload.fields).forEach(key =>
      formData.append(key, payload.fields[key])
    );
    formData.append('file', file);

    const xml = await fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => res.text());

    const uploadUrl = new DOMParser()
      .parseFromString(xml, 'application/xml')
      .getElementsByTagName('Location')[0].textContent;

    this.setState({
      loading: false,
      url: uploadUrl
    });
  };

  <!-- .put_object for s3 -->
  File.open('/path/to/local/filename.html', 'rb') do |file|
  s3.put_object({
    bucket: 'BucketName',
    key: 'filename.html',
    body: file
  })
end

<!-- form for files -->
    <form onSubmit={handleSubmit}>
      <label htmlFor="caption">
        Caption
        <input type="text" name="caption" />
      </label>
      <label htmlFor="image" >
        Upload image
        <input type="file" name="image" accept="image/*" />
      </label>
      <input type="submit" value="Submit" />
    </form>