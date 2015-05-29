var getPostsUrl =
  "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_news&include=title,date&callback=hahaha";

$(document).ready(function() {

  request(getPostsUrl, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      var posts = '';
      data.posts.forEach(function(post) {
        posts += '<li><a href="article.html?postId='+post.id+'">' + post.title + '</a></li>';
      })
      document.getElementById("post-context").innerHTML = posts;
    }
  })
})


function request(url, cal) {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: "jsonp",
    success: function(resp) {
      cal(false, resp);
    },
    error: function(resp) {
      cal(resp);
    }
  });
}