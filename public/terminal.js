let pass = false;
let fails = 0;

$('body').terminal({
    help: function() {
        if (pass === false) {
            this.echo('pass [password] — enter password to gain access\n');
        }
        else {
            this.echo('lights [ROOM NAME] — toggle light switch in ROOM NAME. Ask DM for DC. On successful roll, ROOM NAME is revealed. Type it in.\n')
        }
        
    },
    sudo: function(...args) {
        this.echo("Nice try! Did you really think I wouldn't expect you to do this?\n");
    },
    pass: function(word) {
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
        else if (where === 'lunch') {
            console.log("lunch has been triggered");
            this.echo('Lunch room lights toggled. \n')
        }
        else if (where === 'tech') {
            console.log("tech has been triggered");
            this.echo('Tech room lights toggled. \n')
        }
        else  if (where === 'weapons') {
            console.log("weapons has been triggered");
            this.echo('Weapons room lights toggled. \n')
        }
        else if (where === 'throne') {
            console.log("throne has been triggered");
            this.echo('Throne room lights toggled. \n')
        }
        else if (where === 'dungeon') {
            console.log('dungeon light has been triggered');
            this.echo('Dungeon light toggled. \n')
        }
        else if (where === 'audi') {
            console.log('audi has been triggered');
            this.echo('Auditorium light toggled. \n')
        }
        else {
            this.echo("Input invalid. Please try again. \n")
        }
    }
}, {
    greetings: 'Hello, Kenzie. \nEnter help to list commands \n'
});