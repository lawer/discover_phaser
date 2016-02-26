/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameModule;
(function (GameModule) {
    var game;
    var mainState = (function (_super) {
        __extends(mainState, _super);
        function mainState() {
            _super.apply(this, arguments);
        }
        mainState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            // Precargamos el sprite del jugador
            game.load.image("player", "assets/player.png");
            game.load.image('paredV', 'assets/wallVertical.png');
            game.load.image('paredH', 'assets/wallHorizontal.png');
        };
        mainState.prototype.crearMundo = function () {
            // Creamos un grupo para las paredes y les asignamos física
            this.paredes = game.add.group();
            this.paredes.enableBody = true;
            game.add.sprite(0, 0, 'paredV', 0, this.paredes); // Izquierda
            game.add.sprite(480, 0, 'paredV', 0, this.paredes); // Derecha
            game.add.sprite(0, 0, 'paredH', 0, this.paredes); // Arriba Izquierda
            game.add.sprite(300, 0, 'paredH', 0, this.paredes); // Arriba Derecha
            game.add.sprite(0, 320, 'paredH', 0, this.paredes); // Abajo Izquierda
            game.add.sprite(300, 320, 'paredH', 0, this.paredes); // Abajo Derecha
            game.add.sprite(-100, 160, 'paredH', 0, this.paredes); // Centro Izquierda
            game.add.sprite(400, 160, 'paredH', 0, this.paredes); // Centro Derecha
            // Escalamos las paredes para usar todo el espacio
            var centroArriba = game.add.sprite(100, 80, 'paredH', 0, this.paredes);
            centroArriba.scale.setTo(1.5, 1);
            var centroAbajo = game.add.sprite(100, 240, 'paredH', 0, this.paredes);
            centroAbajo.scale.setTo(1.5, 1);
            // Set all the walls to be immovable
            this.paredes.setAll('body.immovable', true);
        };
        mainState.prototype.create = function () {
            _super.prototype.create.call(this);
            game.stage.backgroundColor = "#3498db";
            game.physics.startSystem(Phaser.Physics.ARCADE);
            /*
             Para situar al personaje en el centro de la escena utilizamos variables predefinidas
             Otras útiles son game.world.width, game.world.height, game.world.randomX,
             game.world.randomY
             */
            this.player = this.game.add.sprite(game.world.centerX, game.world.centerY, 'player');
            // Cambiamos el "anchor" del jugador
            this.player.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.player);
            // Agregamos gravedad al jugador
            this.player.body.gravity.y = 500;
            // Cogemos los cursores para gestionar la entrada
            this.cursor = game.input.keyboard.createCursorKeys();
            this.crearMundo();
        };
        mainState.prototype.movePlayer = function () {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.player.body.velocity.x = -200;
            }
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.player.body.velocity.x = 200;
            }
            else {
                // el jugador se para
                this.player.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown && this.player.body.touching.down) {
                // el jugador se mueve hachi arriba (salto)
                this.player.body.velocity.y = -320;
            }
        };
        mainState.prototype.update = function () {
            //Esta función se ejecuta 60 veces por segundo
            _super.prototype.update.call(this);
            this.movePlayer();
        };
        return mainState;
    })(Phaser.State);
    var SimpleGame = (function () {
        function SimpleGame() {
            game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");
            game.state.add("main", mainState);
            game.state.start("main");
        }
        return SimpleGame;
    })();
    GameModule.SimpleGame = SimpleGame;
})(GameModule || (GameModule = {}));
window.onload = function () {
    var game = new GameModule.SimpleGame();
};
//# sourceMappingURL=main.js.map