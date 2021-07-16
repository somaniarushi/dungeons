var socket = io();

// DM overrides for display
if (window.location.pathname === '/dm') {
    jack.style.display = 'block';
    jessie.style.display = 'block';
    corny.style.display = 'block';
    // fairy.style.display = 'block';
    tristan.style.display = 'block';
    dox.style.display = 'block';
    // diamond.style.display = 'block';
    hannah.style.display = 'block';
    medcalf.style.display = 'block';
    // fiona.style.display = 'block';
    // fairy.style.display = 'block';
    // annis.style.display = 'block';
    kaiden.style.display = 'block';
    deimos.style.display = 'block';
    phobos.style.display = 'block';
    chekov.style.display = 'block';
    gustavo.style.display = 'block';
    jose.style.display = 'block';
    robert.style.display = 'block';
    chrisna.style.display = 'block';
    lacroix.style.display = 'block';
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