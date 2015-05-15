var getPostsUrl =
  "http://games.hoolai.com/cms/?json=get_category_posts&slug=lianshen&include=title,date&callback=hahaha";

$(document).ready(function() {
  slide(".banner1", "#banner-side1", ".side-banner1");
  slide(".banner2", "#banner-side2", ".side-banner2");

  request(getPostsUrl, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data.posts)
      var posts = '';
      data.posts.forEach(function(post) {
        posts += '<li><a href="article.html?postId='+post.id+'">' + post.title + '</a></li>';
      })
      document.getElementById("news_quick").innerHTML = posts;
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

$(function(){
	$.easy.navigation();
$.easy.tooltip();
$.easy.popup();
$.easy.external();
$.easy.rotate();
$.easy.cycle();
$.easy.forms();
$.easy.showhide();
$.easy.jump();
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

function slide(banner, bannerSide, sideBanner){
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
      start: function(number) {
      },
      complete: function(number) {
        indexPage1 = number - 1;
        if(runState1){
          changeSide(bannerSide,number-1)
        }
      }
    }
  });
  function addInterval(time){
    return window.setInterval(function(){
      next(banner)
    },time)
  }

  $(bannerSide+' a').on('mouseover', function() {
    var index = $(this).closest('li').index();
    var $outer = $(this).closest('.side-banner');
    $outer.find('.banner-side a').removeClass('active');
    $(this).addClass('active');
    indexPage1 = index;
    $outer.find(banner+' .slidesjs-pagination-item a').eq(index).click();
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
