        // api/server-info.js
        // This is your mock data for server information
        const serverInfo = {
          serverName: "! RC3-BASEMAPS",
          mapName: "CONQUEST LARGE LANCANG DAM",
          gameMode: "CUSTOM GO HZ",
          antiCheatInfo: "Server protected by The K-50 AntiCheat. Vi les, Questions, Request, Appeal, Visit us: www.eps.gg",
          discordLink: "https://discord.gg/",
          players: "60/64",
          ping: "104ms",
          tickrate: "60 Hz",
          settings: [
            { "label": "REGION", "value": "EUROPE DE" },
            { "label": "PUNKBUSTER", "value": "ON" },
            { "label": "FAIRFIGHT", "value": "ON" },
            { "label": "PASSWORD", "value": "OFF" },
            { "label": "PRESET", "value": "NORMAL" }
          ],
          advanced: [
            { "label": "MINIMAP", "value": "ON" },
            { "label": "ONLY SQUAD LEADER SPAWN", "value": "OFF" },
            { "label": "VEHICLES", "value": "ON" },
            { "label": "TEAM BALANCE", "value": "ON" },
            { "label": "MINIMAP SPOTTING", "value": "ON" },
            { "label": "HUD", "value": "ON" },
            { "label": "3P VEHICLE CAM", "value": "ON" },
            { "label": "REGENERATIVE HEALTH", "value": "ON" },
            { "label": "KILL CAM", "value": "ON" },
            { "label": "FRIENDLY FIRE", "value": "OFF" },
            { "label": "3D SPOTTING", "value": "ON" },
            { "label": "ENEMY NAME TABS", "value": "ON" }
          ],
          rules: [
            { "label": "TICKETS", "value": "400" },
            { "label": "VEHICLE SPAWN DELAY", "value": "25" },
            { "label": "BULLET DAMAGE", "value": "100" },
            { "label": "KICK AFTER TEAM KILLS", "value": "5" },
            { "label": "PLAYER HEALTH", "value": "100" },
            { "label": "PLAYER RESPAWN TIME", "value": "100" },
            { "label": "KICK AFTER IDLE", "value": "300" },
            { "label": "BAN AFTER KICKS", "value": "3" }
          ]
        };

        // This is the Vercel Serverless Function handler
        module.exports = (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          // Vercel automatically handles CORS for API routes by default
          res.status(200).json(serverInfo);
        };
        