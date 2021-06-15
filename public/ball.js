
ball.onmousedown = function(event) {

    console.log("an attempt to move")

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + ball.getBoundingClientRect().left;
      const Y = window.scrollY + ball.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    ball.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: 'ball'})
      ball.onmouseup = null;
    };

  };

  ball.ondragstart = function() {
    return false;
  };

  socket.on('change', function(obj){


    console.log("Change has been detected")
    console.log(obj.location.X, obj.location.Y)

    if (obj.element === "ball") {
      ball.style.position = 'absolute';
      ball.style.zIndex = 1000;
      document.body.append(ball);
  
      moveAt(obj.location.X, obj.location.Y);
  
      function moveAt(shiftX, shiftY) {
        ball.style.left = shiftX + 'px';
        ball.style.top = shiftY + 'px';
      }
    }

});