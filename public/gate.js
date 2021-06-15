
gate.onmousedown = function(event) {

    console.log("an attempt to move")

    let shiftX = event.clientX - gate.getBoundingClientRect().left;
    let shiftY = event.clientY - gate.getBoundingClientRect().top;

    gate.style.position = 'absolute';
    gate.style.zIndex = 1000;
    document.body.append(gate);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      gate.style.left = pageX - shiftX + 'px';
      gate.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + gate.getBoundingClientRect().left;
      const Y = window.scrollY + gate.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    gate.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: 'gate'})
      gate.onmouseup = null;
    };

  };

  gate.ondragstart = function() {
    return false;
  };

  socket.on('change', function(obj){


    console.log("Change has been detected")
    console.log(obj.location.X, obj.location.Y)

    if (obj.element === "gate") {
      gate.style.position = 'absolute';
      gate.style.zIndex = 1000;
      document.body.append(gate);
  
      moveAt(obj.location.X, obj.location.Y);
  
      function moveAt(shiftX, shiftY) {
        gate.style.left = shiftX + 'px';
        gate.style.top = shiftY + 'px';
      }
    }

});