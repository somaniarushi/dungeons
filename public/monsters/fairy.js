
const elemFairy = 'fairy'
const objFairy = document.getElementById(elemFairy);

objFairy.onmousedown = function(event) {

    console.log("an attempt to move")


    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objFairy.getBoundingClientRect().left;
    let shiftY = event.clientY - objFairy.getBoundingClientRect().top;

    objFairy.style.position = 'absolute';
    objFairy.style.zIndex = 1000;
    document.body.append(objFairy);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objFairy.style.left = pageX - shiftX + 'px';
      objFairy.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objFairy.getBoundingClientRect().left;
      const Y = window.scrollY + objFairy.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objFairy.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemFairy})
      objFairy.onmouseup = null;
    };

  };

  objFairy.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemFairy) {
      objFairy.style.position = 'absolute';
      objFairy.style.zIndex = 1000;
      document.body.append(objFairy);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objFairy.style.left = shiftX + 'px';
        objFairy.style.top = shiftY + 'px';
      }
    }

});