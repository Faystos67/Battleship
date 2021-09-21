/*jslint browser this */
/*global _, player, utils */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        setGame: function (game) {
            this.game = game;
        },
        play: function () {
            var self = this;
            var x = utils.randomInt(0, 9);
            var y = utils.randomInt(0, 9);
            setTimeout(function () {
                self.game.fire(this, x, y, function (hasSucced) {
                    console.log("enemy hit on : Y = " + y + " X = " + x);
                    self.tries[x][y] = hasSucced;
                });
            }, 2000);
        },
        areShipsOk: function (callback) {
            var self = this;

            this.fleet.forEach(function (ship) {
                var hp;
                var x = 9;
                var y = 9;
                var done = false;
                var coordX;
                var coordY;
                while (!done) {
                    hp = ship.getLife();
                    if (utils.randomInt(0, 1) === 1) // vertical
                    {
                        y = 10 - hp;
                        coordX = utils.randomInt(0, x);
                        coordY = utils.randomInt(0, y);
                        console.log("Vertical ship " + ship.getId() + " coordsY : " + coordY + " coordX : " + coordX);
                        if (self.grid[coordY][coordX] === 0) {
                            hp--;
                            var ligne = coordY;
                            while (hp > 0) {
                                if (self.grid[ligne + 1][coordX] !== 0) {
                                    console.log("         /!\\ ship " + ship.getId() + " coordsY : " + (ligne + 1) + " coordX : " + coordX);
                                    break;
                                }
                                hp--;
                                ligne++;
                            }

                            if (hp === 0) {
                                //Bateau ok, on pose
                                for (var i = ship.getLife(); i > 0; i--) {
                                    self.grid[coordY + i - 1][coordX] = ship.getId();
                                    done = true;
                                }
                            }
                        } else {
                            console.log("         /!\\ ship " + ship.getId() + " coordsY : " + coordY + " coordX : " + coordX);
                        }
                    } else // horizontal
                    {
                        x = 10 - hp;
                        coordX = utils.randomInt(0, x);
                        coordY = utils.randomInt(0, y);
                        console.log("Horizontal ship " + ship.getId() + " coordsY : " + coordY + " coordX : " + coordX);
                        if (self.grid[coordY][coordX] === 0) {
                            hp--;
                            var col = coordX;
                            while (hp > 0) {
                                if (self.grid[coordY][col + 1] !== 0) {
                                    console.log("           /!\\ ship " + ship.getId() + " coordsY : " + coordY + " coordX : " + (col + 1));
                                    break;
                                }
                                hp--;
                                col++;
                            }

                            if (hp === 0) {
                                //Bateau ok, on pose
                                for (var i = ship.getLife(); i > 0; i--) {
                                    self.grid[coordY][coordX + i - 1] = ship.getId();
                                    done = true;
                                }
                            }
                        } else {
                            console.log("           /!\\ ship " + ship.getId() + " coordsY : " + coordY + " coordX : " + coordX);
                        }
                    }
                }
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
            console.log(this.grid);
        }
    });

    global.computer = computer;

}(this));