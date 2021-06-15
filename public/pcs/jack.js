
const elemJack = 'jack'
const objJack = document.getElementById(elemJack);

objJack.onmousedown = function(event) {

    console.log("an attempt to move")

    if (window.location.pathname !== '/jack' && window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objJack.getBoundingClientRect().left;
    let shiftY = event.clientY - objJack.getBoundingClientRect().top;

    objJack.style.position = 'absolute';
    objJack.style.zIndex = 1000;
    document.body.append(objJack);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objJack.style.left = pageX - shiftX + 'px';
      objJack.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objJack.getBoundingClientRect().left;
      const Y = window.scrollY + objJack.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objJack.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemJack})
      objJack.onmouseup = null;
    };

  };

  objJack.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemJack) {
      objJack.style.position = 'absolute';
      objJack.style.zIndex = 1000;
      document.body.append(objJack);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objJack.style.left = shiftX + 'px';
        objJack.style.top = shiftY + 'px';
      }
    }

});