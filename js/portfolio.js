$(document).ready(function () {
  let listNum
  // 마우스 커서 효과
  $('body').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    //console.log(mouseX)
  //   if(mouseX >= 1530){
  //       $('body').addClass('overflowX');
  //       gsap.to('.cursor', {left: mouseX - 100, top: mouseY - 100});
  //   } else{
  //   gsap.to('.cursor', {left: mouseX - 100, top: mouseY - 100});
  // }


    // gsap.to('.second_cursor', {duration: 0.3, delay: 0.1});
  });

  /*   $('body').addClass('overflowy');
  $('#intro').stop().delay(8000).fadeOut('slow', function () {
    $('body').removeClass('overflowy');
  }); */

  //  ipod 제어 
  $('#ipod .btn_ipod').on('click', function () {
    const $ipod = $('#ipod');
    const $ipodBtn = $(this);
    const $ctrlBtn = $ipod.find('.btn_ctrl button');
    const $ipodList = $('#ipodScreen .ipod_list a');
    const $first = $ipod.find('.first');
    const $last = $ipod.find('.last');
    const $close = $ipod.find('.close');
    const $end = $ipod.find('.end');
    const $cnt = $('#contents .section');
    const total = $cnt.length;
    let cntY = new Array(total);
    for (let i = 0; i < total; i++) {
      cntY[i] = $cnt.eq(i).offset().top;
    }
    console.log($end, typeof $end);

    // 클릭하면 나오고 '.click' 없애기
    $ipodBtn.parent($ipod).stop().animate({left: '50%',marginLeft: '-238.5px'}).find('.click').addClass('d_n').parent().attr({
      tabIndex: -1
    });

    // #dim 동적생성
    $ipod.siblings().attr({
      'aria-hidden': true, inert: ''
    });
    $ipodBtn.before('<div id="dim"></div>');
    const $dim = $('#dim');
    $dim.stop().fadeIn();

    // 키보드 트래핑 - first, last 요소 제어
    $first.on('keydown', function (e) {
      console.log(e.keyCode); // tab -> 9
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $last.focus();
      }
    });
    $last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $first.focus();
      }
    });

    // 닫기버튼
    $close.on('click', function () {
      $dim.stop().fadeOut(function () {
        $(this).remove();
      });
      $ipod.stop().animate({
        left: '98%',
        marginLeft: 0
      }).find('.click').removeClass('d_n').parent().attr({
        tabIndex: 0
      }).siblings().removeAttr('aria-hidden inert');
      $ipodBtn.focus();
    });
    // #dim 클릭
    $dim.on('click', function () {
      $close.trigger('click');
    });
    // esc로 닫기
    $(window).on('keydown', function (e) {
      if (e.keyCode === 27) $close.click();
    });

    // $ipodList(a태그) 제어
    $ipodList.on('click', function () {
      $ipodList.parent().removeClass('on');
      $(this).parent().addClass('on');
      return false;
    });
    $ipodList.dblclick(function () {
      if ($('html, body').is(':animated')) return false;
      listNum = $(this).parent().index();
      // console.log(listNum)
      $('html, body').stop().animate({
        scrollTop: cntY[listNum]
      }, 700, 'easeOutBack', a11y);
    });

    // .btn_ctrl 제어
    $ctrlBtn.on('click', function () {
      if ($(this).parent().is('.btn_left')) {
        if ($ipodList.parent('.on').children().is('.first')) {
          $first.parent().removeClass('on');
          $end.parent().addClass('on');
        } else {
          $ipodList.parent('.on').removeClass('on').prev().addClass('on');
        }
      } else if ($(this).parent().is('.btn_right')) {
        if ($ipodList.parent('.on').children().is('.end')) {
          $end.parent().removeClass('on');
          $first.parent().addClass('on');
        } else {
          $ipodList.parent('.on').removeClass('on').next().addClass('on');
        }
      } else if ($(this).parent().is('.btn_play')) {
        if ($('html, body').is(':animated')) return false;
        listNum = $ipodList.parent('.on').index();
        $('html, body').stop().animate({
          scrollTop: cntY[listNum]
        }, 700, 'easeOutBack', a11y);
      }
    });

    // 접근성 추가
    function a11y() {
      // 현재 본문
      $cnt.eq(listNum).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex');
      $cnt.eq(listNum).find('.tabIndex').attr('tabIndex', 0)
      // 나머지 본문들
      $cnt.eq(listNum).siblings().attr({
        'aria-hidden': true,
        'inert': ''
      }).find('a, button, .tabIndex').attr('tabIndex', -1);
    }
  });

  // portfolio
  // $(window).on('scroll', function(){
  //   const scrollY = $(this).scrollTop()/*  + $(this).height()*2/3 */;
  //   console.log(scrollY);

  //   if(scrollY > $('#cnt2').offset().top + 20){
  //     //gsap.to('.computer', {left: -300, top: 600, transform: 'scale(1)'});
  //     $('.intro_sulwhasoo').addClass('on');
  //   } else {
  //     $('.intro_sulwhasoo').removeClass('on');
  //   }

  //     if(scrollY >= 1355){
  //       $('.brand_txt').addClass('on');
  //     } else{
  //       $('.brand_txt').removeClass('on');
  //     }
  // });


  // intro_sulwhasoo
  const stickyWrapY = $('.sticky_wrap').offset().top;
  const upImgX = $('.up_img').offset().left;
  const upImgY = $('.up_img').offset().top - stickyWrapY; //부모요소에서 떨어진 거리
  $(window).on('scroll', function(){
    const scrollY = $(this).scrollTop();
    const move = scrollY - stickyWrapY;
    const winWid = $(this).width();
    const winHei = $(this).height();
    // console.log(scrollY, stickyWrapY, upImgX, upImgY);
    //                      937        1012.4718627929688    262.5

    const lastScale = 0.31;           //초기 이미지 scale
    const lastImg = 1920 * lastScale; //초기 이미지 px

    // 모니터 프레임 
    if (scrollY < stickyWrapY+200) {
      $('.monitor_wrap').css({overflow: 'hidden'});
      gsap.to('.monitor>img', {opacity: 1, duration: 0.5, ease: Power3.easeOut});
    } else {
      $('.monitor_wrap').css({overflow: 'visible'});
      gsap.to('.monitor>img', {opacity: 0, duration: 0.5, ease: Power3.easeOut});
    }

    if (scrollY >= stickyWrapY && scrollY < $('.bg_sulwhasoo').offset().top) {
      $('.intro_sulwhasoo').addClass('fix');

      // 브라우저 높이 만큼 스크롤이 움직이는 동안 .up_img의 크기는 커진다 scale(0.48) => scale(1)
      if (scrollY > stickyWrapY+200 && scrollY < stickyWrapY+winHei+200) {

        const lager = (1 - lastScale)*(winWid);  // (1-0.31) = 0.69 * 1920 = 1313이 더 커져야 한다
        const ratio =  move * (1-lastScale) * 0.001 + lastScale;
        /* ratio의 scale
          스크롤:늘어나는 비율 + 고정비율(최초)
          1200 0 + 0.31
          1300 0.069 + 0.31 = 0.379
          1400 0.138 + 0.31 = 0.448
          1500 0.207 + 0.31 = 0.517
          1600 0.276 + 0.31 = 0.586
          1700 0.345 + 0.31 = 0.655
          1800 0.414 + 0.31 = 0.724
          1900 0.483 + 0.31 = 0.793
          2000 0.552 + 0.31 = 0.862
          2100 0.621 + 0.31 = 0.931
          2200 0.69 + 0.31 = 1
          스크롤이 실제 움직일 거리의 1/100 움직일때 : scroll X 0.69 X 0.001 = 0.69(가장 커졌을때)
          수식 : scroll X 0.69 X 0.001 + 0.31

          left(-1013), top(-263)좌표값
          스크롤: 
          1200  0
          1201 1013 * 0.001 = 1.013 (1%)
          1300 1013 * 0.1 = 101.3
          1400 1013 * 0.2 = 202.6
          1500 1013 * 0.3 = 303.9
          1600 1013 * 0.4 = 405.2
          1700 1013 * 0.5 = 506.5 (50%)
          1800 1013 * 0.6 = 607.8
          1900 1013 * 0.7 = 709.1
          2000 1013 * 0.8 = 810.4
          2100 1013 * 0.9 = 911.7
          2200 1013 * 1.0 = 1,013 (100%)

        */
          const posX = upImgX/winHei*move;
          const posY = upImgY/winHei*move;
        // console.log(`scale: ${ratio}, 커질크기: ${lager}, 스크롤: ${scrollY}, x좌표: ${posX}, y좌표: ${posY}`);
        if (ratio <= 1) {
          gsap.to('.up_img', {scale: ratio, left: -posY, top: -posX, duration: 0.5, ease: Power3.easeOut});
          gsap.to('.brand_txt', {visibility: 'hidden', opacity: 0, duration: 0.5, ease: Power3.easeOut});
        }
      } else if (scrollY >= stickyWrapY+winHei+200 && scrollY < stickyWrapY+winHei+400) {
        gsap.to('.up_img', {scale: 1, left: -upImgX, top: -upImgY, duration: 0.5, ease: Power3.easeOut});
        gsap.to('.brand_txt', {visibility: 'hidden', opacity: 0, duration: 0.5, ease: Power3.easeOut});
      } else if (scrollY >= stickyWrapY+winHei+400) {
        gsap.to('.up_img', {scale: 1, left: -upImgX, top: -upImgY-move+(winHei+400), duration: 0.5, ease: Power3.easeOut});
        gsap.to('.brand_txt', {visibility: 'visible', opacity: 1, duration: 0.5, ease: Power3.easeOut});
      }
    }
    else {
      $('.intro_sulwhasoo').removeClass('fix');
    }


  });
});