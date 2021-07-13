
const elemHannah = 'hannah'
const objHannah = document.getElementById(elemHannah);

objHannah.onmousedown = function(event) {

    console.log("an attempt to move")
    
    // if (window.location.pathname !== '/dm') {
    //   return;
    // }

    let shiftX = event.clientX - objHannah.getBoundingClientRect().left;
    let shiftY = event.clientY - objHannah.getBoundingClientRect().top;

    objHannah.style.position = 'absolute';
    objHannah.style.zIndex = 1000;
    document.body.append(objHannah);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objHannah.style.left = pageX - shiftX + 'px';
      objHannah.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objHannah.getBoundingClientRect().left;
      const Y = window.scrollY + objHannah.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objHannah.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemHannah})
      objHannah.onmouseup = null;
    };

  };

  objHannah.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemHannah) {
      objHannah.style.position = 'absolute';
      objHannah.style.zIndex = 1000;
      document.body.append(objHannah);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objHannah.style.left = shiftX + 'px';
        objHannah.style.top = shiftY + 'px';
      }
    }

});