"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const login_1 = __importStar(require("./routes/login"));
const optimumroutes_1 = __importDefault(require("./routes/optimumroutes"));
const promises_1 = require("node:inspector/promises");
const googleparking_1 = __importDefault(require("./routes/googleparking"));
const geohash = require('ngeohash');
const GEOHASH_PRECISION = 6;
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Content-Type", "application/json");
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    // res.setHeader("Access-Control-Max-Age", 7200);
    next();
});
const { createClient } = require('redis');
const client = createClient({
    password: process.env.REDIS_CLOUD_API_KEY,
    socket: {
        host: 'redis-16379.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16379
    }
});
try {
    client.on('error', (err) => promises_1.console.log('Redis Client Error', err));
    // Connect to Redis
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.connect();
        promises_1.console.log("HI");
    }))();
}
catch (err) {
    promises_1.console.log(`Error with starting redis is ${err}`);
}
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone_no = req.body.phone_no;
    const name = req.body.name;
    try {
        let statusa = yield (0, login_1.default)(phone_no, name);
        res.json({
            msg: statusa
        });
    }
    catch (err) {
        promises_1.console.log(err);
        res.json({
            msg: `Serverside Error occurred ${err}`
        });
    }
}));
app.post('/optimumroutes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const origin = req.body.origin;
    const destination = req.body.destination;
    const travelModes = req.body.travelModes;
    try {
        let abc = yield (0, optimumroutes_1.default)(origin, destination, travelModes);
        // let travelTimeMetro = calculateMetroRoutes(origin, destination)
        promises_1.console.log(abc);
        res.json({
            msg: abc
        });
    }
    catch (err) {
        promises_1.console.log(err);
        res.json({
            msg: `Serverside Error occurred ${err}`
        });
    }
}));
// app.post('/neareststn', async (req: Request, res: Response) => {
//   const lat = req.body.lat
//   const long = req.body.long
//
//   try {
//     let neareststn = await findNearestStn(lat, long)
//     res.json({
//       msg: neareststn
//     })
//
//   } catch (err) {
//     console.log(`Serverside error ${err}`)
//   }
// })
//
app.post('/verifyOTP', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = req.body.otp;
    const phone_no = req.body.phone_no;
    try {
        let check1 = yield (0, login_1.verifyOTP)(otp, phone_no);
        res.json({
            msg: check1
        });
    }
    catch (err) {
        promises_1.console.log(`Serverside error is ${err}`);
    }
}));
// app.post('/updatelocation', express.json(), async (req: Request, res: Response) => {
//   const { userId, latitude, longitude } = req.body;
//   const userGeohash = geohash.encode(latitude, longitude, GEOHASH_PRECISION);
//
//   try {
//     // Store user location using Redis GEOADD
//     await client.geoAdd('user_locations', {
//       longitude,
//       latitude,
//       member: userId
//     });
//
//     // Store user geohash for faster lookups
//     await client.hSet('user_geohashes', userId, userGeohash);
//
//     res.json({ message: 'Location updated successfully' });
//   } catch (error) {
//     console.error('Error updating location:', error);
//     res.status(500).json({ error: 'Failed to update location' });
//   }
// });
//
//
// app.post('/nearbyusers', async (req: Request, res: Response) => {
//   const latitude = req.body.latitude
//   const longitude = req.body.longitude
//   const radius = req.body.radius;
//   const lat = parseFloat(latitude);
//   const lon = parseFloat(longitude);
//   const rad = parseFloat(radius);
//
//   if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
//     return res.status(400).json({ error: 'Invalid parameters' });
//   }
//
//   try {
//     // Use Redis GEORADIUS to find nearby users
//     const nearbyUsers = await client.geoRadius('user_locations', lon, lat, rad, 'km', {
//       WITHDIST: true,
//       WITHCOORD: true,
//       COUNT: 50 // Limit the number of results
//     });
//
//     // Format the result
//     //@ts-ignore
//     const formattedUsers = nearbyUsers.map(user => ({
//       id: user.member,
//       distance: parseFloat(user.distance),
//       latitude: user.coordinates.latitude,
//       longitude: user.coordinates.longitude
//     }));
//
//     res.json(formattedUsers);
//   } catch (error) {
//     console.error('Error finding nearby users:', error);
//     res.status(500).json({ error: 'Failed to find nearby users' });
//   }
// });
//
//
// app.post('/convertaddr', async (req: Request, res: Response) => {
//   const addr = req.body.addr
//   try {
//     const getLatLongitude = await ConvertAddrType(addr)
//     res.json({
//       msg: getLatLongitude
//     })
//   } catch (err) {
//     console.log(`Serverside error is ${err}`)
//   }
// })
//
app.post('/getparking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.body.location;
    const radius = req.body.radius;
    try {
        const getParking = yield (0, googleparking_1.default)(location, radius);
        res.json({
            msg: getParking
        });
    }
    catch (err) {
        promises_1.console.log(`Serverside error is ${err}`);
    }
}));
app.listen(PORT, () => {
    promises_1.console.log(`Listening on port ${PORT}`);
});
