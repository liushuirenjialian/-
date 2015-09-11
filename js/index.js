var getPostsUrl =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_news&include=title,date,custom_fields&callback=hahaha&count=5";

var luntanredianUrl =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_luntanredian&include=content&callback=hahaha&count=5";

var gonglueziliaoUrl =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_gonglueziliao&include=title,date,custom_fields&callback=hahaha&count=5";

var youxilianjie =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_youxilianjie&include=content&callback=hahaha";

var youqinglianjie =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_youqinglianjie&include=content&callback=hahaha";

var youxixiazai =
    "http://games.hoolai.com/cms/?json=get_category_posts&slug=ls_youxixiazai&include=content&callback=hahaha";

$(document).ready(function() {
    slide(".banner1", "#banner-side1", ".side-banner1");
    slide(".banner2", "#banner-side2", ".side-banner2");

    request(gonglueziliaoUrl, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            var _data = data.posts; //top3(data.posts);
            _data.forEach(function(post) {
                // console.log(post.custom_fields.date[0]);
                // var date = post.custom_fields.date[0];
                if (post.custom_fields.date) {
                    posts += '<li><a href="article.html?tag=gonglueziliao&postId=' + post.id + '">' + post.title + '</a><span>' + post.custom_fields.date[0] + '</span></li>'
                } else {
                    posts += '<li><a href="article.html?tag=gonglueziliao&postId=' + post.id + '">' + post.title + '</a><span></span></li>';
                }
            })
            document.getElementById("gonglueziliao").innerHTML = posts;
        }
    })

    request(luntanredianUrl, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            var arg = data.posts[0].content.split("\n");
            var _arg = [];
            for (var i = 1; i < arg.length; i++) {
                if (!!arg[i]) {
                    _arg.push(arg[i])
                }
            }
            var __arg = [];

            if (_arg.length < 5) {
                for (var i = 0; i < _arg.length; i++) {
                    __arg.push(_arg[i]);
                }
            } else {
                for (var i = 0; i < 5; i++) {
                    __arg.push(_arg[i]);
                }
            }
            // var __arg = top3(_arg);
            __arg.forEach(function(str) {
                var _str = str.substr(3);
                var __str = _str.substr(0, _str.length - 4)
                console.log("_str:"+_str+"  --str"+__str)
                var redianArg = __str.split('|')
                posts += '<li><a target="_blank" href="' + redianArg[2] + '">' + redianArg[1] + '</a><span>' + redianArg[0] + '</span></li>';
            })
            document.getElementById("luntanredian").innerHTML = posts;
        }
    })

    request(getPostsUrl, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            var _data = data.posts; //top3(data.posts);
            _data.forEach(function(post) {
              if (post.custom_fields.date) {
                    posts += '<li><a href="article.html?tag=news&postId=' + post.id + '">' + post.title + '</a><span>' + post.custom_fields.date[0] + '</span></li>'
                } else {
                    posts += '<li><a href="article.html?tag=news&postId=' + post.id + '">' + post.title + '</a><span></span></li>';
                }
                // posts += '<li><a href="article.html?tag=news&postId=' + post.id + '">' + post.title + '</a></li>';
            })
            document.getElementById("news_quick").innerHTML = posts;
        }
    })

    // request(youxilianjie, function(err, data) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     var posts = '';
    //     var arg = data.posts[0].content.split("\n");
    //     var _arg = [];
    //     for (var i = 1; i < arg.length; i++) {
    //       if (!!arg[i]) {
    //         _arg.push(arg[i])
    //       }
    //     }
    //     _arg.forEach(function(str) {
    //       var _str = str.substr(3);
    //       var __str = _str.substr(0, _str.length - 4)
    //       var redianArg = __str.split('|')
    //       posts += '<li><a target="_blank" href="' + redianArg[2] + '">' + redianArg[1] + '</a></li>';
    //     })
    //     document.getElementById("youxilianjie").innerHTML = posts;
    //   }
    // })

    request(youqinglianjie, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            var arg = data.posts[0].content.split("\n");
            var _arg = [];
            for (var i = 1; i < arg.length; i++) {
                if (!!arg[i]) {
                    _arg.push(arg[i])
                }
            }
            _arg.forEach(function(str) {
                var _str = str.substr(3);
                var __str = _str.substr(0, _str.length - 4)
                var redianArg = __str.split('|')
                posts += '<li><a target="_blank" href="' + redianArg[2] + '">' + redianArg[1] + '</a></li>';
            })
            document.getElementById("youqinglianjie").innerHTML = posts;
        }
    })

    request(youxixiazai, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var posts = '';
            var arg = data.posts[0].content.split("\n");
            var _arg = [];
            for (var i = 1; i < arg.length; i++) {
                if (!!arg[i]) {
                    _arg.push(arg[i])
                }
            }
            _arg.forEach(function(str, index) {
                var _str = str.substr(3);
                var __str = _str.substr(0, _str.length - 4)
                var redianArg = __str.split('|');
                var tag = redianArg[1];
                if (tag === "android") {
                    $('.download .download_android').attr("href", redianArg[2]);
                } else if (tag === "ios") {
                    $('.download .download_ios').attr("href", redianArg[2]);
                } else if (tag === "ios_2") {
                    $('.download .download_ios_2').attr("href", redianArg[2]);
                } else if (tag === "ms") {
                    $('.download .download_ms').attr("href", redianArg[2]);
                } else if (tag === "ios_QR") {
                    $('.download .QR_ios').attr("src", redianArg[2]);
                } else if (tag === "android_QR") {
                    $('.download .QR_android').attr("src", redianArg[2]);
                };
            })
        }
    })

    $("#close").on('click', function() {
        var downloadBlock = $(".downloadBlock");
        if (downloadBlock.css("right") === "-240px") {
            downloadBlock.animate({
                "right": "+=240px"
            }, "slow")
        } else {
            downloadBlock.animate({
                "right": "-=240px"
            }, "slow")
        }

    })
})

$(function() {
    // $.easy.navigation();
    // $.easy.tooltip();
    $.easy.popup();
    // $.easy.external();
    // $.easy.rotate();
    // $.easy.cycle();
    // $.easy.forms();
    // $.easy.showhide();
    // $.easy.jump();
});

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

function slide(banner, bannerSide, sideBanner) {
    var runState1 = true;
    var indexPage1 = 0;
    var interval1 = null;
    $(banner).slidesjs({
        width: 590,
        height: 300,
        navigation: {
            active: true,
            effect: "fade"
        },
        effect: {
            fade: {
                speed: 10,
                crossfade: true
            }
        },
        pagination: {
            active: true,
            effect: "fade"
        },
        callback: {
            loaded: function(number) {
                interval1 = addInterval(5000)
            },
            start: function(number) {},
            complete: function(number) {
                indexPage1 = number - 1;
                if (runState1) {
                    changeSide(bannerSide, number - 1)
                }
            }
        }
    });

    function addInterval(time) {
        return window.setInterval(function() {
            next(banner)
        }, time)
    }

    $(bannerSide + ' a').on('mouseover', function() {
        var index = $(this).closest('li').index();
        var $outer = $(this).closest('.side-banner');
        $outer.find('.banner-side a').removeClass('active');
        $(this).addClass('active');
        indexPage1 = index;
        $outer.find(banner + ' .slidesjs-pagination-item a').eq(index).click();
    });

    $(sideBanner).on('mouseenter', function() {
        runState1 = false;
        window.clearInterval(interval1)
    })
    $(sideBanner).on('mouseleave', function() {
        runState1 = true;
        interval1 = addInterval(5000)
    })

    function next(outer) {
        if (runState1) {
            $(outer + " .slidesjs-next").click();
        }
    }

    function changeSide(outerId, index) {
        $(outerId).find('a').removeClass('active');
        $(outerId + ' li:eq(' + index + ') a').addClass('active');
    }

}


function top3(array) {
    var top3Array = [];
    if (array.length < 3) {
        for (var i = 0; i < array.length; i++) {
            top3Array.push(array[i]);
        }
    } else {
        for (var i = 0; i < 3; i++) {
            top3Array.push(array[i]);
        }
    }
    return top3Array;
}
  /*点击之后play*/
$(".vid").click(function () {
  $(".y_vid").attr("style","display:block;");
  $(".y_vid #vid").attr("style","visibility:visible;");
  $(".touming_bg").html('    <div id="pop_video2_popwin_bg" style="height: 1133px; opacity: 0.6; width: 100%; z-index: 9999; position: absolute; top: -50px; left: 0px; background: rgb(0, 0, 0);"></div>')
});
/*关闭*/
$(".y_vid .close_video").click(function () {
  $(".y_vid").attr("style","display:none;");
  $(".y_vid #vid").attr("style","visibility:hidden;");
  $(".touming_bg").html('');
  // $("#pop_video2_popwin_bg").css("display","none");
});
