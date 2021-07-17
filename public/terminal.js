socket = io();

let pass = false;
let fails = 0;

const valid_inputs = ['tech', 'lunch', 'audi', 'throne', 'dungeon', 'war', 'hallway']
const valid_camera = ['h1', 'h2', 'l']

$('body').terminal({
    help: function() {
        if (pass === false) {
            this.echo('passphrase [password] — enter password to gain access\n');
        }
        else {
            this.echo('\nlights [ROOM NAME] — toggle light switch in ROOM NAME. Ask DM for DC. On successful roll, ROOM NAME is revealed. Type it in. All future turns, ROOM NAME lights can be toggled as bonus action.\n')
            this.echo('cutoff [ROOM NAME] — toggle magical darkness in ROOM NAME. Ask DM for DC. On successful roll, ROOM NAME is revealed. Type it in. All future turns, ROOM NAME cutoff can be toggled as bonus action.\n')
            this.echo('lasers [CODE] — toggle lasers. Ask DM for DC. On successful roll, CODE is revealed. Type it in. All future turns, lasers can be toggled as bonus action.\n')
            this.echo('dungeon [CODE] — open dungeon. Ask DM for DC. On successful roll, CODE is revealed. Type it in. All future turns, dungeon can be opened as BA.\n')
            this.echo('camera [CAMERA NAME] — toggle camera. Ask DM for DC. On successful roll, CAMERA NAME is revealed. Type it in. All future turns, CAMERA NAME can be toggled as bonus action.\n')
        }
        
    },
    sudo: function(...args) {
        this.echo("Nice try! Did you really think I wouldn't expect you to do this?\n");
    },
    passphrase: function(word) {
        var name = "strahd";
        if (fails >= 3) {
            this.echo("Access locked.\n")
        }
        else if (String(word).toLowerCase() === name) {
            pass = true;
            this.echo("Access Granted. Welcome, Children of La Croix. Run help again to view commands. \n")
        }
        else {
            fails += 1;
            this.echo(`You have failed ${fails} times. After 3 fails, access is locked.\n`)
        }
    },
    lights: function(param) {
        let where = param.toLowerCase();
        if (pass !== true) {
            this.echo('Access denied. \n')
        }
        else if (valid_inputs.includes(where)) {
            socket.emit('toggle', {name: where})
            this.echo(`${where} room lights toggled. \n`)
        }
        else {
            this.echo("Input invalid. Please try again. \n")
        }
    },
    cutoff: function(param) {
        let where = param.toLowerCase();
        if (pass !== true) {
            this.echo('Access denied. \n')
        }
        else if (valid_inputs.includes(where)) {
            socket.emit('cutoff', {name: where})
            this.echo(`${where} room lights cutoff toggled. \n`)
        }
        else {
            this.echo("Input invalid. Please try again. \n")
        }
    },
    lasers: function(param) {
        let code = param.toLowerCase();
        if (pass !== true) {
            this.echo('Access denied \n')
        }
        else if (code === 'joseph') {
            socket.emit('toggle', {name: 'laser'})
            this.echo('Lasers toggled.\n')
        }
        else {
            this.echo("Input invalid. Please try again. \n");
        }
    },
    dungeon: function(param) {
        let code = param.toLowerCase();
        if (pass !== true) {
            this.echo('Access denied \n');
        }
        else if (code === 'chrisna') {
            this.echo("Dungeon has been opened. \n");
        }
        else {
            this.echo("Input invalid. Please try again. \n");
        }
    },
    camera: function(param) {
        let where = param.toLowerCase();
        if (pass !== true) {
            this.echo("Access denied. \n");
        }
        else if (valid_camera.includes(where)) {
            socket.emit('togglecam', {name: where})
            this.echo(`${where} room camera toggled. \n`)
        }
    }

}, {
    greetings: 'Hello. \nEnter help to list commands \n'
});