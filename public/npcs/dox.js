
const elemDox = 'dox'
const objDox = document.getElementById(elemDox);

objDox.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objDox.getBoundingClientRect().left;
    let shiftY = event.clientY - objDox.getBoundingClientRect().top;

    objDox.style.position = 'absolute';
    objDox.style.zIndex = 1000;
    document.body.append(objDox);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objDox.style.left = pageX - shiftX + 'px';
      objDox.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objDox.getBoundingClientRect().left;
      const Y = window.scrollY + objDox.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objDox.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemDox})
      objDox.onmouseup = null;
    };

  };

  objDox.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemDox) {
      objDox.style.position = 'absolute';
      objDox.style.zIndex = 1000;
      document.body.append(objDox);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objDox.style.left = shiftX + 'px';
        objDox.style.top = shiftY + 'px';
      }
    }

});