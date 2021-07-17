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
    console.log('gustavo');
    socket.emit('visibility', {name: 'gustavo', status: e.target.checked})
})

jose.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'jose', status: e.target.checked})
})

robert.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'robert', status: e.target.checked})
})

chrisna.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'chrisna', status: e.target.checked})
})

lacroix.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'lacroix', status: e.target.checked})
})

audi.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'audi', status: e.target.checked})
})

lunch.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'lunch', status: e.target.checked})
})

dungeon.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'dungeon', status: e.target.checked})
})

tech.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'tech', status: e.target.checked})
})

throne.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'throne', status: e.target.checked})
})

war.addEventListener('change', (e) => {
    socket.emit('darkness', {name: 'war', status: e.target.checked})
})






