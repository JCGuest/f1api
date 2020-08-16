class UploadsController < ApplicationController
  def new
  end

  def create
    #Create object in bucket for upload
    obj = S3_BUCKET.objects[params[:file].original_filename]

    # upload
    obj.write(
      file:params[:file],
      acl: :public_read
    )

    # create an obj for the upload
    @upload = Upload.new(
      url: obj.public_url,
      name: obj.key
    )

    # save upload
    if @upload.save
      redirect_uploads_path, succes: "File successfully uploaded."
    else
      flash.now[:notice] = "Ther was an error."
    # render new
    end
  end

  def index
  end
end
