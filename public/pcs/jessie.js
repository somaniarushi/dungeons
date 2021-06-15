
const elemJessie = 'jessie'
const objJessie = document.getElementById(elemJessie);

objJessie.onmousedown = function(event) {

    console.log("an attempt to move")

    let shiftX = event.clientX - objJessie.getBoundingClientRect().left;
    let shiftY = event.clientY - objJessie.getBoundingClientRect().top;

    objJessie.style.position = 'absolute';
    objJessie.style.zIndex = 1000;
    document.body.append(objJessie);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objJessie.style.left = pageX - shiftX + 'px';
      objJessie.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objJessie.getBoundingClientRect().left;
      const Y = window.scrollY + objJessie.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objJessie.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemJessie})
      objJessie.onmouseup = null;
    };

  };

  objJessie.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemJessie) {
      objJessie.style.position = 'absolute';
      objJessie.style.zIndex = 1000;
      document.body.append(objJessie);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objJessie.style.left = shiftX + 'px';
        objJessie.style.top = shiftY + 'px';
      }
    }

});