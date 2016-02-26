/// <reference path="phaser/phaser.d.ts"/>

module GameModule {
    var game: Phaser.Game;

    class mainState extends Phaser.State {
        player: Phaser.Sprite;
        cursor: Phaser.CursorKeys;

        preload():void {
            super.preload();
            // Precargamos el sprite del jugador
            game.load.image("player", "assets/player.png");
        }

        create():void {
            super.create();
            game.stage.backgroundColor = "#3498db";
            game.physics.startSystem(Phaser.Physics.ARCADE);

            /*
             Para situar al personaje en el centro de la escena utilizamos variables predefinidas
             Otras útiles son game.world.width, game.world.height, game.world.randomX,
             game.world.randomY
             */
            this.player = this.game.add.sprite(
                game.world.centerX,
                game.world.centerY,
                'player');

            // Cambiamos el "anchor" del jugador
            this.player.anchor.setTo(0.5, 0.5);

            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.player);
            // Agregamos gravedad al jugador
            this.player.body.gravity.y = 500;

            // Cogemos los cursores para gestionar la entrada
            this.cursor = game.input.keyboard.createCursorKeys();
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
                // el jugador se mueve hachi arriba (salto)
                this.player.body.velocity.y = -320;
            }
        }

        update():void {
            super.update();
            this.movePlayer();
        }
    }

    export class SimpleGame {

        constructor() {
            game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

            game.state.add("main", mainState);
            game.state.start("main");
        }
    }
}

window.onload = () => {
    var game = new GameModule.SimpleGame();
};
