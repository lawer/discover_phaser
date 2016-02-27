/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameModule;
(function (GameModule) {
    var Point = Phaser.Point;
    var mainState = (function (_super) {
        __extends(mainState, _super);
        function mainState() {
            _super.apply(this, arguments);
        }
        mainState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            // Precargamos los sprites
            this.load.image("player", "assets/player.png");
            this.load.image('paredV', 'assets/wallVertical.png');
            this.load.image('paredH', 'assets/wallHorizontal.png');
            this.load.image('moneda', 'assets/coin.png');
        };
        mainState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.inicializaCampoDeJuego();
            this.creaJugador();
            this.capturaCursores();
            this.crearMundo();
            this.creaMoneda();
            this.inicializaPuntuacion();
        };
        mainState.prototype.inicializaCampoDeJuego = function () {
            this.stage.backgroundColor = "#3498db";
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
        ;
        mainState.prototype.creaJugador = function () {
            /*
             Para situar al personaje en el centro de la escena utilizamos variables predefinidas
             Otras útiles son this.world.width, this.world.height, this.world.randomX,
             this.world.randomY
             */
            this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');
            // Cambiamos el "anchor" del jugador
            this.player.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            this.physics.arcade.enable(this.player);
            // Agregamos gravedad al jugador
            this.player.body.gravity.y = 500;
        };
        ;
        mainState.prototype.capturaCursores = function () {
            // Cogemos los cursores para gestionar la entrada
            this.cursor = this.input.keyboard.createCursorKeys();
        };
        ;
        mainState.prototype.crearMundo = function () {
            // Creamos un grupo para las paredes y les asignamos física
            this.paredes = this.add.group();
            this.paredes.enableBody = true;
            this.add.sprite(0, 0, 'paredV', 0, this.paredes); // Izquierda
            this.add.sprite(480, 0, 'paredV', 0, this.paredes); // Derecha
            this.add.sprite(0, 0, 'paredH', 0, this.paredes); // Arriba Izquierda
            this.add.sprite(300, 0, 'paredH', 0, this.paredes); // Arriba Derecha
            this.add.sprite(0, 320, 'paredH', 0, this.paredes); // Abajo Izquierda
            this.add.sprite(300, 320, 'paredH', 0, this.paredes); // Abajo Derecha
            this.add.sprite(-100, 160, 'paredH', 0, this.paredes); // Centro Izquierda
            this.add.sprite(400, 160, 'paredH', 0, this.paredes); // Centro Derecha
            // Escalamos las paredes para usar todo el espacio
            var centroArriba = this.add.sprite(100, 80, 'paredH', 0, this.paredes);
            centroArriba.scale.setTo(1.5, 1);
            var centroAbajo = this.add.sprite(100, 240, 'paredH', 0, this.paredes);
            centroAbajo.scale.setTo(1.5, 1);
            // Set all the walls to be immovable
            this.paredes.setAll('body.immovable', true);
        };
        mainState.prototype.creaMoneda = function () {
            // Muestra la moneda
            this.moneda = this.add.sprite(60, 140, 'moneda');
            this.physics.arcade.enable(this.moneda);
            // Cambiamos el "anchor" de la moneda al centro
            this.moneda.anchor.setTo(0.5, 0.5);
        };
        ;
        mainState.prototype.inicializaPuntuacion = function () {
            // Muestra la puntuación
            this.etiquetaPuntos = this.add.text(30, 30, 'puntos: 0', { font: '18px Arial', fill: '#ffffff' });
            // Incializa la variable con la puntuación
            this.puntos = 0;
        };
        ;
        //Esta función se ejecuta 60 veces por segundo
        mainState.prototype.update = function () {
            _super.prototype.update.call(this);
            // Activamos las colisiones entre el jugador y las paredes
            this.physics.arcade.collide(this.player, this.paredes);
            this.movePlayer();
            if (!this.player.inWorld) {
                this.muerte();
            }
            this.physics.arcade.overlap(this.player, this.moneda, this.cogerMoneda, null, this);
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
                // el jugador se mueve hacia arriba (salto)
                this.player.body.velocity.y = -320;
            }
        };
        mainState.prototype.muerte = function () {
            this.game.state.start('main');
        };
        ;
        mainState.prototype.cogerMoneda = function (jugador, moneda) {
            this.cambiaPosicionMoneda();
            // Incrementamos la puntuación
            this.puntos += 5;
            // Actualizamos la etiqueta con la puntuación
            this.etiquetaPuntos.text = 'puntos: ' + this.puntos;
        };
        mainState.prototype.cambiaPosicionMoneda = function () {
            // Creamos un array con todas las posibles posiciones que podrà tomar la moneda
            var posiciones = [
                new Point(140, 60), new Point(360, 60),
                new Point(60, 140), new Point(440, 140),
                new Point(130, 300), new Point(370, 300),
            ];
            // Quitamos la posición actual de las disponibles en el Array
            // Si no lo hicieramos al ser aleatorio la moneda podría aparecer en la misma posición otra vez.
            // Aprovechamos el hecho que no se repite nunca la "x"
            for (var i = 0; i < posiciones.length; i++) {
                if (posiciones[i].x === this.moneda.x) {
                    // La función "splice" toma 2 parametros:
                    // la posición inicial y el número de elementos a eliminar partiendo de dicha posición.
                    posiciones.splice(i, 1);
                }
            }
            // Elegimos la nueva posición aleatoriamente.
            var newPosition = this.rnd.pick(posiciones);
            // Situamos la moneda en la nueva posición.
            this.moneda.reset(newPosition.x, newPosition.y);
        };
        return mainState;
    })(Phaser.State);
    var SimpleGame = (function () {
        function SimpleGame() {
            this.game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");
            this.game.state.add("main", mainState);
            this.game.state.start("main");
        }
        return SimpleGame;
    })();
    GameModule.SimpleGame = SimpleGame;
})(GameModule || (GameModule = {}));
window.onload = function () {
    var game = new GameModule.SimpleGame();
};
//# sourceMappingURL=main.js.map