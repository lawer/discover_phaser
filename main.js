/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameModule;
(function (GameModule) {
    var game;
    var mainState = (function (_super) {
        __extends(mainState, _super);
        function mainState() {
            _super.apply(this, arguments);
        }
        mainState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            // Precargamos el sprite del jugador
            game.load.image("player", "assets/player.png");
        };
        mainState.prototype.create = function () {
            _super.prototype.create.call(this);
            game.stage.backgroundColor = "#3498db";
            game.physics.startSystem(Phaser.Physics.ARCADE);
            /*
             Para situar al personaje en el centro de la escena utilizamos variables predefinidas
             Otras útiles son game.world.width, game.world.height, game.world.randomX,
             game.world.randomY
             */
            this.player = this.game.add.sprite(game.world.centerX, game.world.centerY, 'player');
            // Cambiamos el "anchor" del jugador
            this.player.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.player);
            // Agregamos gravedad al jugador
            this.player.body.gravity.y = 500;
        };
        mainState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return mainState;
    })(Phaser.State);
    var SimpleGame = (function () {
        function SimpleGame() {
            game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");
            game.state.add("main", mainState);
            game.state.start("main");
        }
        return SimpleGame;
    })();
    GameModule.SimpleGame = SimpleGame;
})(GameModule || (GameModule = {}));
window.onload = function () {
    var game = new GameModule.SimpleGame();
};
//# sourceMappingURL=main.js.map