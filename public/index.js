var socket = io();

// DM overrides for display
if (window.location.pathname !== '/dm') {
    diamond.style.display = 'block';
}


// Visibility changing socket
socket.on('visibility', function(input) {
    console.log(input)
    const elem = document.getElementById(input.name);
    if (input.status === false) {
        if (window.location.pathname !== '/dm') {
            elem.style.display = 'none';
        }
    } else {
        elem.style.display = 'block';
    }
})