/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    player: Phaser.Sprite;

    preload():void {
        super.preload();
        // Precargamos el sprite del jugador
        this.game.load.image("player", "assets/player.png");
    }

    create():void {
        super.create();
        this.game.stage.backgroundColor = "#3498db";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        /*
         Para situar al personaje en el centro de la escena utilizamos variables predefinidas
         Otras útiles son game.world.width, game.world.height, game.world.randomX,
         game.world.randomY
         */
        this.player = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'player');

        // Cambiamos el "anchor" del jugador
        this.player.anchor.setTo(0.5, 0.5);
    }

    update():void {
        super.update();
    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");

        this.game.state.add("main", mainState);
        this.game.state.start("main");
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
