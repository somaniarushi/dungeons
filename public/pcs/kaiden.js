
const elemKaiden = 'kaiden'
const objKaiden = document.getElementById(elemKaiden);

objKaiden.onmousedown = function(event) {

    console.log("an attempt to move")

    if (window.location.pathname !== '/kaiden' && window.location.pathname !== '/dm') {
      return;
    }

    let shiftX = event.clientX - objKaiden.getBoundingClientRect().left;
    let shiftY = event.clientY - objKaiden.getBoundingClientRect().top;

    objKaiden.style.position = 'absolute';
    objKaiden.style.zIndex = 1000;
    document.body.append(objKaiden);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      objKaiden.style.left = pageX - shiftX + 'px';
      objKaiden.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function getLocation() {
      const X = window.scrollX + objKaiden.getBoundingClientRect().left;
      const Y = window.scrollY + objKaiden.getBoundingClientRect().top;
      return {X, Y};
    }

    document.addEventListener('mousemove', onMouseMove);

    objKaiden.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      //trigger a web socket event
      socket.emit('change', {location: getLocation(), element: elemKaiden})
      objKaiden.onmouseup = null;
    };

  };

  objKaiden.ondragstart = function() {
    return false;
  };

  socket.on('change', function(input){
    console.log("Change has been detected")
    console.log(input.location.X, input.location.Y)
    console.log(input.element)

    if (input.element === elemKaiden) {
      objKaiden.style.position = 'absolute';
      objKaiden.style.zIndex = 1000;
      document.body.append(objKaiden);
  
      moveAt(input.location.X, input.location.Y);
  
      function moveAt(shiftX, shiftY) {
        objKaiden.style.left = shiftX + 'px';
        objKaiden.style.top = shiftY + 'px';
      }
    }

});