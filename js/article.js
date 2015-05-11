function getQueryStringArgs(_qs) {
  var qs = _qs.length > 0 ? _qs.substring(1) : "",
    args = {}, //存放所有查询字符串参数对
    items = qs.split("&"),
    len = items.length,
    name = null,
    value = null;
  if (qs.length == 0) {
    console.log("没有查询字符串");
    return;
  };
  for (var i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    args[name] = value;
  }
  return args;
}

function request(url, cal) {
  $.ajax({
    type: 'GET',
    dataType: "jsonp",
    url: url,
    success: function(resp) {
      cal(false, resp);
    },
    error: function(resp) {
      cal(resp);
    }
  });
}

function timeString(timestamp) {
  var timeGMT = new Date(Date.parse(timestamp));
  var year = timeGMT.getFullYear().toString();
  var month = timeGMT.getMonth().toString();
  var date = timeGMT.getDate().toString();
  var hours = timeGMT.getHours().toString();
  var minutes = timeGMT.getMinutes().toString();
  var seconds = timeGMT.getSeconds().toString();
  return year + "-" + zeroPad(2, month) + "-" + zeroPad(2, date) + " " + zeroPad(2, hours) + ":" + zeroPad(2, minutes) + ":" + zeroPad(2, seconds);
}

function zeroPad(digits, n) {
  n = n.toString();
  while (n.length < digits)
    n = '0' + n;
  return n;
}

function showPost(url){
  request(url, function(err, data){
    if(err){
      console.log(err);
    }else{
      $(".article-title").html(data.post.title);
      $(".article-info").html('作者：'+ data.post.author.nickname+' | 发布时间：'+ data.post.date);
      $(".article-content").html(data.post.content);
    }
  })
}

function showContext(url, postId){
  request(url, function(err, res){
    if(err){
      console.log(err);
    }else{
      var result = [];
      var posts = '';
      var index = 0;
      for(var i = 0; i< res.posts.length; i++){
        if(res.posts[i].id === postId){
          index = i;
          break;
        }
      }
      if(!!res.posts[i-1]){
        var frontPost = res.posts[i-1];
        posts += '<li><a href="article.html?postId='+frontPost.id+'">' + frontPost.title + '</a></li>';
      }
      if(!!res.posts[i+1]){
        var backPost = res.posts[i+1];
        posts += '<li><a href="article.html?postId='+backPost.id+'">' + backPost.title + '</a></li>';
      }
      document.getElementById("post-context").innerHTML = posts;
    }
  });
}

var main =  function() {
  var searchStr = window.location.search;
  var qstr = getQueryStringArgs(searchStr);
  var requestUrl = 'http://games.hoolai.com/cms/?json=get_post&id='+ qstr["postId"]+'&callback=hahaha';
  showPost(requestUrl);
  var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=lianshen&order_by=date&include=title&callback=hahaha';
  showContext(getContextUrl, qstr["postId"]);
}
main();
