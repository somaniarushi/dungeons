
const elemDeimos = 'deimos'
const objDeimos = document.getElementById(elemDeimos);

objDeimos.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objDeimos.getBoundingClientRect().left;
    let shiftY = event.clientY - objDeimos.getBoundingClientRect().top;

    objDeimos.style.position = 'absolute';
    objDeimos.style.zIndex = 1000;
    document.body.append(objDeimos);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objDeimos.style.left = pageX - shiftX + 'px';
      objDeimos.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objDeimos.getBoundingClientRect().left;
      const Y = window.scrollY + objDeimos.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objDeimos.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemDeimos})
      objDeimos.onmouseup = null;
    };

  };

  objDeimos.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemDeimos) {
      objDeimos.style.position = 'absolute';
      objDeimos.style.zIndex = 1000;
      document.body.append(objDeimos);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objDeimos.style.left = shiftX + 'px';
        objDeimos.style.top = shiftY + 'px';
      }
    }

});