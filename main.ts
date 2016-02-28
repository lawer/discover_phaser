import Point = Phaser.Point;

module MyGame {
    export class SimpleGame extends Phaser.Game {
        global:any;

        constructor() {
            super(500, 340, Phaser.AUTO, "gameDiv");

            this.global = {
                puntos: 0
            };

            this.state.add("boot", BootState);
            this.state.add("load", LoadState);
            this.state.add("menu", MenuState);
            this.state.add("play", PlayState);

            this.state.start("boot");
        }
    }
}

window.onload = () => {
    var game = new MyGame.SimpleGame();
};
