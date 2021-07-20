$(document).ready(function() {
  // 마우스 커서 효과
  $('body').on('mousemove', function(e){
    // 스크롤바가 이동한 거리를 포함
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    // console.log(mouseX, mouseY);
    gsap.to('.cursor', {left: mouseX-100, top: mouseY-100});

  // face - 마우스 효과
    const eyeBall = $('.eyeball')
    const eyeBallX = eyeBall.width()/2 + eyeBall.offset().left;
    const eyeBallY = eyeBall.height()/2 + eyeBall.offset().top;

    // gsap.to('.pupil', {left: (mouseX - eyeBallX) + 5 + 'px', top: (mouseY - eyeBallY) + 6 + 'px'});
  });
  $('body').addClass('overflowy');
  $('#intro').stop().delay(14000).fadeOut('slow', function () {
    $('body').removeClass('overflowy');
  });
});