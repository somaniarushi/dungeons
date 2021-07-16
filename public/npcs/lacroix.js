
const elemLa = 'lacroix'
const objLa = document.getElementById(elemLa);

objLa.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objLa.getBoundingClientRect().left;
    let shiftY = event.clientY - objLa.getBoundingClientRect().top;

    objLa.style.position = 'absolute';
    objLa.style.zIndex = 1000;
    document.body.append(objLa);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objLa.style.left = pageX - shiftX + 'px';
      objLa.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objLa.getBoundingClientRect().left;
      const Y = window.scrollY + objLa.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objLa.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemLa})
      objLa.onmouseup = null;
    };

  };

  objLa.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemLa) {
      objLa.style.position = 'absolute';
      objLa.style.zIndex = 1000;
      document.body.append(objLa);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objLa.style.left = shiftX + 'px';
        objLa.style.top = shiftY + 'px';
      }
    }

});