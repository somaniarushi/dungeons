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

audion.style.display = 'none';
lunchoff.style.display = 'none';
dungeonon.style.display = 'none';
techoff.style.display = 'none';
throneon.style.display = 'none';
waron.style.display = 'none';
laseroffcams.style.display = 'none';
hallwayoff.style.display = 'none';


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

// Visibility changing socket
socket.on('darkness', function(input) {
    console.log(input)
    const elems = document.getElementsByClassName(input.name);
    console.log(elems);
    if (input.status === false) {
        if (window.location.pathname !== '/dm') {
            for(item of elems) {
                item.style.display = 'none';
            }
        }
    } else {
        for(item of elems) {
            item.style.display = 'block';
        }
    }
})

//light status toggle
socket.on('toggle', function(input) {
    console.log(input);
    const elems = document.getElementsByClassName(input.name);
    for(item of elems) {
        if (item.style.display === 'none') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
});

// Visibility changing socket
socket.on('cutoff', function(input) {
    console.log(input)
    const elems = document.getElementsByClassName(input.name);
    console.log(elems);

    let number_nones = 0;

    for (item of elems) {
        if (item.style.display === 'none') {
            number_nones+= 1;
        }
    }
    if (number_nones === 2) {
        elems[0].style.display = 'block';
    } else {
        for (item of elems) {
            item.style.display = 'none';
        }
    }
})

socket.on('togglecam', function(input) {
    console.log(input);
    const elem = document.getElementById(input.name);
    console.log(elem);
    if(elem.style.display === 'none') {
        console.log("get in here!")
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
})