
const elemGustavo = 'gustavo'
const objGustavo = document.getElementById(elemGustavo);

objGustavo.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objGustavo.getBoundingClientRect().left;
    let shiftY = event.clientY - objGustavo.getBoundingClientRect().top;

    objGustavo.style.position = 'absolute';
    objGustavo.style.zIndex = 1000;
    document.body.append(objGustavo);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objGustavo.style.left = pageX - shiftX + 'px';
      objGustavo.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objGustavo.getBoundingClientRect().left;
      const Y = window.scrollY + objGustavo.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objGustavo.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemGustavo})
      objGustavo.onmouseup = null;
    };

  };

  objGustavo.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemGustavo) {
      objGustavo.style.position = 'absolute';
      objGustavo.style.zIndex = 1000;
      document.body.append(objGustavo);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objGustavo.style.left = shiftX + 'px';
        objGustavo.style.top = shiftY + 'px';
      }
    }

});