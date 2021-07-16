
const elemRob = 'robert'
const objRob = document.getElementById(elemRob);

objRob.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objRob.getBoundingClientRect().left;
    let shiftY = event.clientY - objRob.getBoundingClientRect().top;

    objRob.style.position = 'absolute';
    objRob.style.zIndex = 1000;
    document.body.append(objRob);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objRob.style.left = pageX - shiftX + 'px';
      objRob.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objRob.getBoundingClientRect().left;
      const Y = window.scrollY + objRob.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objRob.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemRob})
      objRob.onmouseup = null;
    };

  };

  objRob.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemRob) {
      objRob.style.position = 'absolute';
      objRob.style.zIndex = 1000;
      document.body.append(objRob);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objRob.style.left = shiftX + 'px';
        objRob.style.top = shiftY + 'px';
      }
    }

});