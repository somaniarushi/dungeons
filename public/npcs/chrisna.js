
const elemChrisna = 'chrisna'
const objChrisna = document.getElementById(elemChrisna);

objChrisna.onmousedown = function(event) {

    console.log("an attempt to move")
    
    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objChrisna.getBoundingClientRect().left;
    let shiftY = event.clientY - objChrisna.getBoundingClientRect().top;

    objChrisna.style.position = 'absolute';
    objChrisna.style.zIndex = 1000;
    document.body.append(objChrisna);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objChrisna.style.left = pageX - shiftX + 'px';
      objChrisna.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objChrisna.getBoundingClientRect().left;
      const Y = window.scrollY + objChrisna.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objChrisna.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemChrisna})
      objChrisna.onmouseup = null;
    };

  };

  objChrisna.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemChrisna) {
      objChrisna.style.position = 'absolute';
      objChrisna.style.zIndex = 1000;
      document.body.append(objChrisna);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objChrisna.style.left = shiftX + 'px';
        objChrisna.style.top = shiftY + 'px';
      }
    }

});