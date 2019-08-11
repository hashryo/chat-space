$(document).on('turbolinks:load', function(){
  $(function() {

    function appendProduct(user) {
      var search_list = $("#user-search-result");
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
      search_list.append(html);
    }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendProduct(user);
          });
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }); 
  });
});

$(function() {
  $(document).on("click" , ".user-search-add" , function() {
    var data_id = $(this).attr('data-user-id');
    var data_name = $(this).attr('data-user-name');
    var html_chatmember = `<div class='chat-group-user'>
                            <input name='group[user_ids][]' type='hidden' value='${data_id}'>
                            <p class='chat-group-user__name'>${data_name}</p>
                            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                           </div>`
    $("#chat-group-users").append(html_chatmember)
    $(this).parent().remove()
    $(document).on("click" , ".user-search-remove" , function() {
      $(this).parent().remove()
    })
  })
})
