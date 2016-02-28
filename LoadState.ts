module MyGame {
    export class LoadState extends Phaser.State {
        preload():void {
            super.preload();

            // Agregamos un texto de cargando a la pantalla
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...',
                {font: '30px Arial', fill: '#ffffff'});
            etiquetaCargando.anchor.setTo(0.5, 0.5);

            // Muestra la barra de progreso
            var progressBar = this.add.sprite(this.world.centerX, 200, 'progressBar');
            progressBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(progressBar);

            // Precargamos los sprites
            this.load.image("player", "assets/player.png");
            this.load.image('paredV', 'assets/wallVertical.png');
            this.load.image('paredH', 'assets/wallHorizontal.png');
            this.load.image('moneda', 'assets/coin.png');
            this.load.image('enemigo', 'assets/enemy.png');

            // Cargamos una imagen que hará de fondo en la pantalla de menu
            this.load.image('fondo', 'assets/background.png');
        }

        create():void {
            super.create();
            this.game.state.start('menu');
        }
    }
}

