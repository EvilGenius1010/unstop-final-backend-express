"use strict";
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
exports.nearbyUsers = nearbyUsers;
exports.updateLocation = updateLocation;
const ngeohash_1 = __importDefault(require("ngeohash"));
//
// // Bengaluru bounding box (approximation)
const BENGALURU_BOUNDS = {
    minLat: 12.8340,
    maxLat: 13.1436,
    minLon: 77.3554,
    maxLon: 77.8615
};
const GEOHASH_PRECISION = 8;
function nearbyUsers(lat, long, radius) {
    return __awaiter(this, void 0, void 0, function* () {
        const centerGeohash = ngeohash_1.default.encode(lat, long, GEOHASH_PRECISION);
        const neighborHashes = ngeohash_1.default.neighbors(centerGeohash);
        neighborHashes.push(centerGeohash);
        // const nearbyUsers = users.filter(user =>
        //   neighborHashes.includes(user.geohash) &&
        //   getDistance({ latitude: lat, longitude: long },
        //     { latitude: user.lat, longitude: user.long }) <= radius
        // );
        return nearbyUsers;
    });
}
const redis_1 = require("redis");
function updateLocation(lat, long, phone_no) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateLocation = ngeohash_1.default.encode(lat, long);
        // const client = createRedisClient();
        const client = (0, redis_1.createClient)({
            password: 'iZfkEFkWuMuIuxTie1Fpp376YrrRjaWM',
            socket: {
                host: 'redis-16379.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
                port: 16379
            }
        });
        yield client.connect();
        const member = {
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            member: phone_no
        };
        const nearby = yield client.geoAdd("blr", member);
        client.quit();
        return nearby;
    });
}
