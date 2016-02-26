/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    preload():void {
        super.preload();
    }

    create():void {
        super.create();
    }

    update():void {
        super.update();
    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
        game.state.add('main', mainState);
        game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
