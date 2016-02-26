/// <reference path="phaser/phaser.d.ts"/>

module GameModule {
    var game: Phaser.Game;

    class mainState extends Phaser.State {
        player: Phaser.Sprite;

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
        }

        update():void {
            super.update();
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
