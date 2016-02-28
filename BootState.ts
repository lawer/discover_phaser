module MyGame {
    export class BootState extends Phaser.State {
        preload():void {
            super.preload();
            this.load.image('progressBar', 'assets/progressBar.png');
        }

        create():void {
            super.create();

            this.inicializaCampoDeJuego();
            this.game.state.start('load');
        }

        private inicializaCampoDeJuego() {
            this.stage.backgroundColor = "#3498db";
            this.physics.startSystem(Phaser.Physics.ARCADE);
        };
    }
}