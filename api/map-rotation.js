        // api/map-rotation.js
        // This is your mock data for map rotation
        const mapRotation = [
          "SIEGE OF SHANGHAI",
          "OPERATION LOCKER",
          "DAWNBREAKER",
          "ROGUE TRANSMISSION",
          "ZAVOD 311",
          "FLOOD ZONE",
          "HAINAN RESORT",
          "GOLMUD RAILWAY"
        ];

        // This is the Vercel Serverless Function handler
        module.exports = (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          // Vercel automatically handles CORS for API routes by default
          res.status(200).json(mapRotation);
        };
        