/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        // Precargamos el sprite del jugador
        this.game.load.image("player", "assets/player.png");
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "#3498db";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        /*
         Para situar al personaje en el centro de la escena utilizamos variables predefinidas
         Otras útiles son game.world.width, game.world.height, game.world.randomX,
         game.world.randomY
         */
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        // Cambiamos el "anchor" del jugador
        this.player.anchor.setTo(0.5, 0.5);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(500, 340, Phaser.AUTO, "gameDiv");
        this.game.state.add("main", mainState);
        this.game.state.start("main");
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map