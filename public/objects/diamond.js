
const elemDiamond = 'diamond'
const objDiamond = document.getElementById(elemDiamond);

objDiamond.onmousedown = function(event) {

    console.log("an attempt to move")

    if (window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objDiamond.getBoundingClientRect().left;
    let shiftY = event.clientY - objDiamond.getBoundingClientRect().top;

    objDiamond.style.position = 'absolute';
    objDiamond.style.zIndex = 1000;
    document.body.append(objDiamond);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objDiamond.style.left = pageX - shiftX + 'px';
      objDiamond.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objDiamond.getBoundingClientRect().left;
      const Y = window.scrollY + objDiamond.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objDiamond.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemDiamond})
      objDiamond.onmouseup = null;
    };

  };

  objDiamond.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemDiamond) {
      objDiamond.style.position = 'absolute';
      objDiamond.style.zIndex = 1000;
      document.body.append(objDiamond);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objDiamond.style.left = shiftX + 'px';
        objDiamond.style.top = shiftY + 'px';
      }
    }

});