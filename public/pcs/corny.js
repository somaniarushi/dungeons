
const elemCorny = 'corny'
const objCorny = document.getElementById(elemCorny);

objCorny.onmousedown = function(event) {

    console.log("an attempt to move")

    if (window.location.pathname !== '/corny' && window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objCorny.getBoundingClientRect().left;
    let shiftY = event.clientY - objCorny.getBoundingClientRect().top;

    objCorny.style.position = 'absolute';
    objCorny.style.zIndex = 1000;
    document.body.append(objCorny);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objCorny.style.left = pageX - shiftX + 'px';
      objCorny.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objCorny.getBoundingClientRect().left;
      const Y = window.scrollY + objCorny.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objCorny.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemCorny})
      objCorny.onmouseup = null;
    };

  };

  objCorny.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemCorny) {
      objCorny.style.position = 'absolute';
      objCorny.style.zIndex = 1000;
      document.body.append(objCorny);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objCorny.style.left = shiftX + 'px';
        objCorny.style.top = shiftY + 'px';
      }
    }

});