
const elemAnnis = 'annis'
const objAnnis = document.getElementById(elemAnnis);

objAnnis.onmousedown = function(event) {

    console.log("an attempt to move")


    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objAnnis.getBoundingClientRect().left;
    let shiftY = event.clientY - objAnnis.getBoundingClientRect().top;

    objAnnis.style.position = 'absolute';
    objAnnis.style.zIndex = 1000;
    document.body.append(objAnnis);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objAnnis.style.left = pageX - shiftX + 'px';
      objAnnis.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objAnnis.getBoundingClientRect().left;
      const Y = window.scrollY + objAnnis.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objAnnis.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemAnnis})
      objAnnis.onmouseup = null;
    };

  };

  objAnnis.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemAnnis) {
      objAnnis.style.position = 'absolute';
      objAnnis.style.zIndex = 1000;
      document.body.append(objAnnis);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objAnnis.style.left = shiftX + 'px';
        objAnnis.style.top = shiftY + 'px';
      }
    }

});