
const elemTristan = 'tristan'
const objTristan = document.getElementById(elemTristan);

objTristan.onmousedown = function(event) {

    console.log("an attempt to move")


    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objTristan.getBoundingClientRect().left;
    let shiftY = event.clientY - objTristan.getBoundingClientRect().top;

    objTristan.style.position = 'absolute';
    objTristan.style.zIndex = 1000;
    document.body.append(objTristan);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objTristan.style.left = pageX - shiftX + 'px';
      objTristan.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objTristan.getBoundingClientRect().left;
      const Y = window.scrollY + objTristan.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objTristan.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemTristan})
      objTristan.onmouseup = null;
    };

  };

  objTristan.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemTristan) {
      objTristan.style.position = 'absolute';
      objTristan.style.zIndex = 1000;
      document.body.append(objTristan);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objTristan.style.left = shiftX + 'px';
        objTristan.style.top = shiftY + 'px';
      }
    }

});