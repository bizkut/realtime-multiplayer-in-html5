'use strict';

const drawPlayer = require('./player');
const drawBullets = require('./bullets');

function renderer (ctx, options = {}) {
    function draw (game) {
        ctx.clearRect(0, 0, 720, 480);

        for (const player of game.players.values()) {
            drawPlayer(ctx, player, {
                color: '#c58242',
                infoColor: '#cc8822',
                stateText: player.name + ' (local_pos)'
            });

            const ghosts = game.getGhosts(player.id);

            if (options.showDestinationPosition && !options.naiveApproach && player !== game.localPlayer) {
                drawPlayer(ctx, Object.assign({}, ghosts.local, {
                    width: player.width,
                    height: player.height
                }), {
                    stateText: 'dest_pos'
                });
            }

            if (options.showServerPosition && !options.naiveApproach) {
                const ghostOptions = {
                    stateText: 'server_pos',
                    infoColor: 'rgba(255,255,255,0.2)'
                };

                drawPlayer(ctx, Object.assign({}, ghosts.server, {
                    width: player.width,
                    height: player.height
                }), ghostOptions);
            }
        }

        drawBullets(ctx, game.bullets);
    }

    return {
        draw
    };
}

module.exports = renderer;
