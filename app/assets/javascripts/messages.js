
$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      var image =  message.image ? `<img class="contents__right__mid__box__chat1__image" src=${message.image}></img>` : ``
      var html = `<div class="contents__right__mid__box">
                    <div class="message" data-message-id=${message.id}>
                      <div class="contents__right__mid__box__inline-block">
                        <div class="contents__right__mid__box__inline-block__user1">
                          ${message.name}
                        </div>
                        <div class="contents__right__mid__box__inline-block__date1">
                          ${message.data}
                        </div>
                      </div>
                      <div class="contents__right__mid__box__chat1">
                        <p class="contents__right__mid__box__chat1__content">
                          ${message.content}
                        </p>
                        ${image}
                      </div>
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.contents__right__mid').append(html)
        $('#new_message')[0].reset();
        $('.contents__right__mid').animate({scrollTop: $('.contents__right__mid')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
      })  
    })

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        if ($('.message').length !== 0) {
          var last_message_id = $('.message:last').data('message-id');
          $.ajax({
            url: "api/messages",
            type: 'get',
            dataType: 'json',
            data: {id: last_message_id}
          })
          .done(function(messages) {
            var insertHTML = '';
            messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.contents__right__mid').append(insertHTML);
            })
            $('.contents__right__mid').animate({scrollTop: $('.contents__right__mid')[0].scrollHeight}, 'fast');
          })
          .fail(function() {
            alert('error');
          });
        }
      }
    };
    setInterval(reloadMessages, 5000);
  })
});