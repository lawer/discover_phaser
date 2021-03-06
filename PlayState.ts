/**
 * Created by carlesgm on 28/2/16.
 */
module MyGame {
    export class PlayState extends Phaser.State {
        player:Phaser.Sprite;
        cursor:Phaser.CursorKeys;
        paredes:Phaser.Group;
        moneda:Phaser.Sprite;
        etiquetaPuntos:Phaser.Text;
        private enemigos:Phaser.Group;
        global:any;

        create():void {
            super.create();

            this.global = (<SimpleGame>this.game).global;

            this.creaJugador();
            this.capturaCursores();
            this.crearMundo();
            this.creaMoneda();
            this.inicializaPuntuacion();
            this.creaEnemigos();
        }

        private creaJugador() {
            /*
             Para situar al personaje en el centro de la escena utilizamos variables predefinidas
             Otras útiles son this.world.width, this.world.height, this.world.randomX,
             this.world.randomY
             */
            this.player = this.add.sprite(
                this.world.centerX,
                this.world.centerY,
                'player');

            // Cambiamos el "anchor" del jugador
            this.player.anchor.setTo(0.5, 0.5);

            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            this.physics.arcade.enable(this.player);
            // Agregamos gravedad al jugador
            this.player.body.gravity.y = 500;
        };

        private capturaCursores() {
            // Cogemos los cursores para gestionar la entrada
            this.cursor = this.input.keyboard.createCursorKeys();
        };

        crearMundo():void {
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
        }

        private creaMoneda() {
            // Muestra la moneda
            this.moneda = this.add.sprite(60, 140, 'moneda');

            this.physics.arcade.enable(this.moneda);

            // Cambiamos el "anchor" de la moneda al centro
            this.moneda.anchor.setTo(0.5, 0.5);
        };

        private inicializaPuntuacion() {
            // Muestra la puntuación
            this.etiquetaPuntos = this.add.text(30, 30, 'puntos: 0', {font: '18px Arial', fill: '#ffffff'});
            // Incializa la variable con la puntuación
            this.global.puntos = 0;
        };

        private creaEnemigos() {
            // Create el grupo de enemigos con física Arcade
            this.enemigos = this.game.add.group();
            this.enemigos.enableBody = true;

            // Creamos 10 enemigos de una vez
            // Los enemigos están muertos por defecto por lo que no serán visibles al principio.
            this.enemigos.createMultiple(10, 'enemigo');

            // Ejecuta la función "agregaEnemigo" cada 2.2 secs
            this.time.events.loop(2200, this.agregaEnemigo, this)
        };

        private agregaEnemigo() {
            // Obten el primer enemigo muerto
            var enemigo = this.enemigos.getFirstDead();

            // Si no conseguimos ningun enemigo "return"
            if (!enemigo) {
                return;
            }
            // Initialise the enemy
            enemigo.anchor.setTo(0.5, 1);
            enemigo.reset(this.world.centerX, 0);
            enemigo.body.gravity.y = 500;
            enemigo.body.velocity.x = 100 * this.rnd.sign();
            enemigo.body.bounce.x = 1;
            enemigo.checkWorldBounds = true;
            enemigo.outOfBoundsKill = true;
        };


        //Esta función se ejecuta 60 veces por segundo
        update():void {
            super.update();

            // Activamos las colisiones entre el jugador y las paredes
            this.physics.arcade.collide(this.player, this.paredes);
            this.movePlayer();

            if (!this.player.inWorld) {
                this.muerte();
            }

            this.physics.arcade.overlap(this.player, this.moneda, this.cogerMoneda, null, this);
            this.physics.arcade.collide(this.enemigos, this.paredes);
            // Si el jugador colisiona con un enemigo matamos al jugador
            this.physics.arcade.overlap(this.player, this.enemigos, this.muerte, null, this);

        }

        movePlayer():void {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.player.body.velocity.x = -200;
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.player.body.velocity.x = 200;
            }
            // Si no se pulsan ni el cursor izquierdo ni el derecho
            else {
                // el jugador se para
                this.player.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown && this.player.body.touching.down) {
                // el jugador se mueve hacia arriba (salto)
                this.player.body.velocity.y = -320;
            }
        }

        private muerte() {
            this.game.state.start('menu');
        };

        private cogerMoneda(jugador:Phaser.Sprite, moneda:Phaser.Sprite) {
            this.cambiaPosicionMoneda();

            // Incrementamos la puntuación
            this.global.puntos += 5;

            // Actualizamos la etiqueta con la puntuación
            this.etiquetaPuntos.text = 'puntos: ' + this.global.puntos;
        }

        private cambiaPosicionMoneda() {
            // Creamos un array con todas las posibles posiciones que podrà tomar la moneda
            var posiciones:Point[] = [
                new Point(140, 60), new Point(360, 60), // Fila arriba
                new Point(60, 140), new Point(440, 140), // Fila central
                new Point(130, 300), new Point(370, 300), // Fila abajo
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
        }

    }
}