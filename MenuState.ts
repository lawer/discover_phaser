module MyGame {
    export class MenuState extends Phaser.State {
        global:any;

        create():void {
            this.global = (<SimpleGame>this.game).global;

            // Imagen de fondo
            this.add.image(0, 0, 'fondo');

            // Nombre del juego
            var nameLabel = this.add.text(
                this.world.centerX, 80, 'Super Coin Box',
                {font: '50px Arial', fill: '#ffffff'}
            );
            nameLabel.anchor.setTo(0.5, 0.5);

            // Puntuación
            var scoreLabel = this.add.text(
                this.world.centerX,
                this.world.centerY,
                'puntos: ' + this.global.puntos,
                {font: '25px Arial', fill: '#ffffff'}
            );
            scoreLabel.anchor.setTo(0.5, 0.5);

            // Información de como empezar
            var startLabel = this.add.text(
                this.world.centerX,
                this.world.height - 80,
                'press the up arrow key to start',
                {font: '25px Arial', fill: '#ffffff'}
            );
            startLabel.anchor.setTo(0.5, 0.5);

            // Capturamos la flecha arriba
            var flechaArriba = this.input.keyboard.addKey(Phaser.Keyboard.UP);

            // Cuando la pulsemos llamará a la función empezar
            flechaArriba.onDown.addOnce(this.empezar, this);
        }

        empezar():void {
            // Start the actual game
            this.game.state.start('play');
        }
    }
}