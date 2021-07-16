
const elemPhobos = 'phobos'
const objPhobos = document.getElementById(elemPhobos);

objPhobos.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objPhobos.getBoundingClientRect().left;
    let shiftY = event.clientY - objPhobos.getBoundingClientRect().top;

    objPhobos.style.position = 'absolute';
    objPhobos.style.zIndex = 1000;
    document.body.append(objPhobos);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objPhobos.style.left = pageX - shiftX + 'px';
      objPhobos.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objPhobos.getBoundingClientRect().left;
      const Y = window.scrollY + objPhobos.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objPhobos.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemPhobos})
      objPhobos.onmouseup = null;
    };

  };

  objPhobos.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemPhobos) {
      objPhobos.style.position = 'absolute';
      objPhobos.style.zIndex = 1000;
      document.body.append(objPhobos);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objPhobos.style.left = shiftX + 'px';
        objPhobos.style.top = shiftY + 'px';
      }
    }

});