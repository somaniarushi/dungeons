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

fairy.addEventListener('change', (e) => {
    socket.emit('visibility', {name: 'fairy', status: e.target.checked})
})



