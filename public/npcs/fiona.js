
const elemFiona = 'fiona'
const objFiona = document.getElementById(elemFiona);

objFiona.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objFiona.getBoundingClientRect().left;
    let shiftY = event.clientY - objFiona.getBoundingClientRect().top;

    objFiona.style.position = 'absolute';
    objFiona.style.zIndex = 1000;
    document.body.append(objFiona);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objFiona.style.left = pageX - shiftX + 'px';
      objFiona.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objFiona.getBoundingClientRect().left;
      const Y = window.scrollY + objFiona.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objFiona.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemFiona})
      objFiona.onmouseup = null;
    };

  };

  objFiona.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemFiona) {
      objFiona.style.position = 'absolute';
      objFiona.style.zIndex = 1000;
      document.body.append(objFiona);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objFiona.style.left = shiftX + 'px';
        objFiona.style.top = shiftY + 'px';
      }
    }

});