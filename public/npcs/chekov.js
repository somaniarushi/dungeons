
const elemChekov = 'chekov'
const objChekov = document.getElementById(elemChekov);

objChekov.onmousedown = function(event) {

    console.log("an attempt to move")
    
    // if (window.location.pathname !== '/dm') {
    //   return;
    // }

    let shiftX = event.clientX - objChekov.getBoundingClientRect().left;
    let shiftY = event.clientY - objChekov.getBoundingClientRect().top;

    objChekov.style.position = 'absolute';
    objChekov.style.zIndex = 1000;
    document.body.append(objChekov);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objChekov.style.left = pageX - shiftX + 'px';
      objChekov.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objChekov.getBoundingClientRect().left;
      const Y = window.scrollY + objChekov.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objChekov.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemChekov})
      objChekov.onmouseup = null;
    };

  };

  objChekov.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemChekov) {
      objChekov.style.position = 'absolute';
      objChekov.style.zIndex = 1000;
      document.body.append(objChekov);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objChekov.style.left = shiftX + 'px';
        objChekov.style.top = shiftY + 'px';
      }
    }

});