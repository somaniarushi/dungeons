
const elemJose = 'jose'
const objJose = document.getElementById(elemJose);

objJose.onmousedown = function(event) {

    console.log("an attempt to move")
    
    // if (window.location.pathname !== '/dm') {
    //   return;
    // }

    let shiftX = event.clientX - objJose.getBoundingClientRect().left;
    let shiftY = event.clientY - objJose.getBoundingClientRect().top;

    objJose.style.position = 'absolute';
    objJose.style.zIndex = 1000;
    document.body.append(objJose);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objJose.style.left = pageX - shiftX + 'px';
      objJose.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objJose.getBoundingClientRect().left;
      const Y = window.scrollY + objJose.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objJose.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemJose})
      objJose.onmouseup = null;
    };

  };

  objJose.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemJose) {
      objJose.style.position = 'absolute';
      objJose.style.zIndex = 1000;
      document.body.append(objJose);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objJose.style.left = shiftX + 'px';
        objJose.style.top = shiftY + 'px';
      }
    }

});