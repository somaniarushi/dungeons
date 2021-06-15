
const elemMedcalf = 'medcalf'
const objMedcalf = document.getElementById(elemMedcalf);

objMedcalf.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objMedcalf.getBoundingClientRect().left;
    let shiftY = event.clientY - objMedcalf.getBoundingClientRect().top;

    objMedcalf.style.position = 'absolute';
    objMedcalf.style.zIndex = 1000;
    document.body.append(objMedcalf);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objMedcalf.style.left = pageX - shiftX + 'px';
      objMedcalf.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objMedcalf.getBoundingClientRect().left;
      const Y = window.scrollY + objMedcalf.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objMedcalf.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemMedcalf})
      objMedcalf.onmouseup = null;
    };

  };

  objMedcalf.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemMedcalf) {
      objMedcalf.style.position = 'absolute';
      objMedcalf.style.zIndex = 1000;
      document.body.append(objMedcalf);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objMedcalf.style.left = shiftX + 'px';
        objMedcalf.style.top = shiftY + 'px';
      }
    }

});