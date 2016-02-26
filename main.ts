/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;

    preload():void {
        super.preload();
    }

    create():void {
        super.create();
        this.game.stage.backgroundColor = "#3498db";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
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
