console.log("a check!! ")

socket = io();

const people = document.getElementsByClassName('check');

jack.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'jack', status: e.target.checked})
})

jessie.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'jessie', status: e.target.checked})
})

corny.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'corny', status: e.target.checked})
})


tristan.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'tristan', status: e.target.checked})
})

dox.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'dox', status: e.target.checked})
})

diamond.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'diamond', status: e.target.checked})
})

hannah.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'hannah', status: e.target.checked})
})

medcalf.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'medcalf', status: e.target.checked})
})

// fairy.addEventListener('change', (e) => {
//     socket.emit('visibility', {name: 'fairy', status: e.target.checked})
// })

// fiona.addEventListener('change', (e) => {
//     socket.emit('visibility', {name: 'fiona', status: e.target.checked})
// })

// annis.addEventListener('change', (e) => {
//     socket.emit('visibility', {name: 'annis', status: e.target.checked})
// })

kaiden.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'kaiden', status: e.target.checked})
})

deimos.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'deimos', status: e.target.checked})
})

phobos.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'phobos', status: e.target.checked})
})

chekov.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'chekov', status: e.target.checked})
})

gustavo.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'gustavo', status: e.target.checked})
})

jose.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'jose', status: e.target.checked})
})






