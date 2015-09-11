var gonglueziliaoUrl =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_gonglueziliao&include=title,date,custom_fields&callback=hahaha";


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
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
    }
    return args;
}

$(document).ready(function() {

    var searchStr = window.location.search;
    var qstr = getQueryStringArgs(searchStr);
    var tag = qstr["tag"];
    console.log(tag)
    window.tag = tag;

    request(gonglueziliaoUrl, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            data.posts.forEach(function(post) {
                if (post.custom_fields.date) {
                    posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + post.id + '">' + post.title + '</a><span>' + post.custom_fields.date[0] +'</span></li>';
                } else {
                    posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + post.id + '">' + post.title + '</a><span></span></li>';

                }
                // posts += '<li><a href="article.html?tag=' + window.tag + '&postId=' + post.id + '">' + post.title + '</a><span>' + +'</span></li>';
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
