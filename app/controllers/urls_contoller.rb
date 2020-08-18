class UrlsController < AppplicationController
before_action :set_user

def create
    @url = @user.urls.build(url_params)
    @item.user_id = @user.user_id

    if @item.save 
        render json: {
            logged_in: true,
            item: @item
        }
    else 
        render json: {
            status: 500,
            errors: @item.errors.full_messages
        }
    end
end

def index
    @urls = @user.urls.all 
    render json: {
        logged_in: true, 
        urls: @urls
    }
end

private

def url_params
    params.require(:url).permit(:type)
end