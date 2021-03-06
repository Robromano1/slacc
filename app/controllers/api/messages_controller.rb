class Api::MessagesController < ApplicationController

    before_action :ensure_logged_in

    def index
        if (params[:channelId]) 
            @messages = Message.where(messageable_id: params[:channelId], messageable_type: 'Channel')
        elsif (params[:dmId])
            @messages = Message.where(messageable_id: params[:dmId], messageable_type: 'Dm')
        end
        render :index
    end

    def create
        # @message = Message.new(message_params)
        # @message.author_id = current_user.id
        # @message.messageable_id = params[:channel_id]
        # @message.messageable_type = 'Channel'
        # if @message.save
        #     render :show
        # else
        #     render json: @message.errors.full_messages, status: 422
        # end
    end

    def destroy     
        message = current_user.messages.find_by(id: params[:id])
        if message
            @message = message
            message.destroy
            render :show
        else
            render json: ['Not authorized to delete message'], status: 401
        end
    end

    def update
        @message = current_user.messages.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        else
            render json: ['Not authorized to edit message'], status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body)
        # params.permit(body)
    end
end