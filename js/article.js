function getQueryStringArgs(_qs) {
    var qs = _qs.length > 0 ? _qs.substring(1) : "",
        args = {}, //存放所有查询字符串参数对
        items = qs.split("&"),
        len = items.length,
        name = null,
        value = null,
        item = [];
    if (qs.length == 0) {
        console.log("没有查询字符串");
        return;
    };
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
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

function showPost(url) {
    request(url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            $(".article-title").html(data.post.title);
            $(".article-info").html('作者：' + data.post.author.nickname + ' | 发布时间：' + data.post.date);
            $(".article-content").html(data.post.content);
        }
    })
}

function showContext(url, postId) {
  console.log(postId);
    request(url, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            var result = [];
            var posts = '';
            var index = 0;
            for (var i = 0; i < res.posts.length; i++) {
              // console.log(res.posts[i].id === )
                if (res.posts[i].id == postId) {
                    index = i;
                    break;
                }
            }
            var len = res.posts.length;
            var ind = ran(len);
            var count = 0;
            if (len <= 2) {
                if (index == 0) {
                    posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + res.posts[1].id + '">' + res.posts[1].title + '</a></li>';
                } else {
                    posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + res.posts[0].id + '">' + res.posts[0].title + '</a></li>';
                }
            } else {
                while (count < 2) {
                    if (ind < len) {
                      if(ind != index) {
                        posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + res.posts[ind].id + '">' + res.posts[ind].title + '</a></li>';
                        ind++;
                        count++;
                      } else {
                        ind ++;
                      }                    
                    }else {
                      ind = 0;
                      if(ind != index) {                        
                        posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + res.posts[ind].id + '">' + res.posts[ind].title + '</a></li>';
                        ind++;
                        count++;
                      }                        
                    }
                }
            }
            // if (!!res.posts[index - 1]) {
            //     var frontPost = res.posts[index - 1];
            //     postId = frontPost;
            //     posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + frontPost.id + '">' + frontPost.title + '</a></li>';
            // }
            // if (!!res.posts[index + 1]) {
            //     var backPost = res.posts[index + 1];
            //     postId = backPost;
            //     posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + backPost.id + '">' + backPost.title + '</a></li>';
            // }
            document.getElementById("post-context").innerHTML = posts;
        }
    });
}

// <<<<<<< HEAD
function ran(len) {
    return (Math.floor(Math.random() * len));
}
var main = function() {
    var searchStr = window.location.search;
    var qstr = getQueryStringArgs(searchStr);
    var requestUrl = 'http://games.hoolai.com/cms/?json=get_post&id=' + qstr["postId"] + '&callback=hahaha';
    showPost(requestUrl);
    var tag = qstr["tag"];
    window.tag = tag;
    if (tag === 'gonglueziliao') {
        var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_gonglueziliao&order_by=date&include=title&callback=hahaha';
        $('.nav-tactic').siblings().children().removeClass("active");
        $('.nav-tactic a').addClass("active");
        $('#page-head').text('游戏攻略');
    } else if (tag === 'news') {
        var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_news&order_by=date&include=title&callback=hahaha';
        $('.nav-news').siblings().children().removeClass("active");
        $('.nav-news a').addClass("active");
        $('#page-head').text('游戏资讯');
    } else if (tag === "jietu") {
      var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_image&order_by=date&include=title&callback=hahaha';
        $("#page-head").text('游戏截图');
    } else if (tag === "video") {
      var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_video&order_by=date&include=title&callback=hahaha';
        $("#page-head").text('游戏视频');
    } else if (tag === "download") {
      var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_youxixiazai&order_by=date&include=title&callback=hahaha';
        $(".nav-download").siblings().children().removeClass("active");
        $(".nav-download a").addClass("active");
        $("#page-head").text('下载详情');
    }else if (tag === 'ad')
   {
     var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=1s_ad&order_by=date&include=title&callback=hahaha';
    $('#page-head').text('游戏资讯');
   }
    showContext(getContextUrl, qstr["postId"]);
    // $("#post-context li a").click(function () {
    //   console.log("nihao")
    //   showContext(getContextUrl, postId);
    // });
// =======
// var main =  function() {
//   var searchStr = window.location.search;
//   var qstr = getQueryStringArgs(searchStr);
//   var requestUrl = 'http://games.hoolai.com/cms/?json=get_post&id='+ qstr["postId"]+'&callback=hahaha';
//   showPost(requestUrl);
//   var tag = qstr["tag"];
//   window.tag = tag;
//   if (tag === 'gonglueziliao') {
//     var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_gonglueziliao&order_by=date&include=title&callback=hahaha';
//     $('.nav-tactic').siblings().children().removeClass("active");
//     $('.nav-tactic a').addClass("active");
//     $('#page-head').text('游戏攻略');
//   }else if (tag === 'news') {
//     var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_news&order_by=date&include=title&callback=hahaha';
//     $('.nav-news').siblings().children().removeClass("active");
//     $('.nav-news a').addClass("active");
//     $('#page-head').text('游戏资讯');
//   }
//    else if (tag === 'ad')
//    {
//      var getContextUrl = 'http://games.hoolai.com/cms/?json=get_category_posts&slug=1s_ad&order_by=date&include=title&callback=hahaha';
//     $('#page-head').text('游戏资讯');
//    }
//   showContext(getContextUrl, qstr["postId"]);
// >>>>>>> aa656d039629c327c50c8778ead02c93938d177f
}
main();
