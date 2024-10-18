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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findNearestStn;
const turf = __importStar(require("@turf/turf"));
function findNearestStn(lat, long) {
    return __awaiter(this, void 0, void 0, function* () {
        const stations = [
            {
                type: 'Feature',
                properties: { name: 'Majestic' },
                geometry: { type: 'Point', coordinates: [77.5713, 12.9767] }
            },
            {
                type: 'Feature',
                properties: { name: 'Indiranagar' },
                geometry: { type: 'Point', coordinates: [77.6408, 12.9784] }
            },
            {
                type: 'Feature',
                properties: { name: 'Mysore Road' },
                geometry: { type: 'Point', coordinates: [77.5426, 12.9542] }
            }, {
                type: 'Feature',
                properties: { name: 'Nagasandra' },
                geometry: { type: 'Point', coordinates: [13.047747, 77.499507] }
            }, {
                type: 'Feature',
                properties: { name: 'Dasarahalli' },
                geometry: { type: 'Point', coordinates: [13.043542, 77.512379] }
            }, {
                type: 'Feature',
                properties: { name: 'Dasarahalli' },
                geometry: { type: 'Point', coordinates: [13.043542, 77.512379] }
            }, {
                type: 'Feature',
                properties: { name: 'Jalahalli' },
                geometry: { type: 'Point', coordinates: [13.039572, 77.519811] }
            }, {
                type: 'Feature',
                properties: { name: 'Peenya Industry' },
                geometry: { type: 'Point', coordinates: [13.036448, 77.525452] }
            }, {
                type: 'Feature',
                properties: { name: 'Peenya' },
                geometry: { type: 'Point', coordinates: [13.036211, 77.525676] }
            }, {
                type: 'Feature',
                properties: { name: 'Goraguntepalya' },
                geometry: { type: 'Point', coordinates: [13.028486, 77.540867] }
            }, {
                type: 'Feature',
                properties: { name: 'Yeshwantpur' },
                geometry: { type: 'Point', coordinates: [13.023309, 77.549864] }
            }, {
                type: 'Feature',
                properties: { name: 'Sandal Soap Factory' },
                geometry: { type: 'Point', coordinates: [13.013484, 77.554337] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Rajajinagar' },
                geometry: { type: 'Point', coordinates: [12.999508, 77.549955] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Rajajinagar' },
                geometry: { type: 'Point', coordinates: [12.999508, 77.549955] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            }, {
                type: 'Feature',
                properties: { name: 'Mahalakshmi' },
                geometry: { type: 'Point', coordinates: [13.008338, 77.548834] }
            },
            // Add more stations here
        ];
        // Create a FeatureCollection from the stations
        const stationsCollection = turf.featureCollection(stations);
        const userLon = parseFloat(lat);
        const userLat = parseFloat(long);
        if (isNaN(userLat) || isNaN(userLon)) {
            return { error: 'Invalid latitude or longitude' };
        }
        const userPoint = turf.point([userLon, userLat]);
        const nearestStation = turf.nearestPoint(userPoint, stationsCollection);
        const distance = turf.distance(userPoint, nearestStation, { units: 'kilometers' });
        return {
            station: nearestStation.properties.name,
        };
    });
}
