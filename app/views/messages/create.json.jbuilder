json.content  @message.content
json.data  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image  @message.image.url
json.name  @message.user.name
json.id @message.id
