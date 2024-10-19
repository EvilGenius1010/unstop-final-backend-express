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
exports.calculateMetroRoutes = calculateMetroRoutes;
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
// export async function findTravelTimeByMetro(originstn: string, deststn: string) {
//   const avgSpeed = 42;
//   type stnstore = {
//     first: string,
//     second: string
//   }
//   let greenLineDistanceMap: Map<stnstore, string> = new Map();
//   greenLineDistanceMap.set({ first: "Nagasandra", second: "Peenya Industry" }, "2.50")
//   greenLineDistanceMap.set({ first: "Peenya Industry", second: "Yeshwanthpur" }, "4.8")
//   greenLineDistanceMap.set({
//     first: "Yeshwanthpur", second: "Sampige Road"
//   }, "5.1")
//   greenLineDistanceMap.set({ first: "Sampige Road", second: "National College" }, "4.0")
//   greenLineDistanceMap.set({ first: "National College", second: "Rashtreeya Vidyalaya Road" }, "4.1")
//   greenLineDistanceMap.set({ first: "Rashtreeya Vidyalaya Road", second: "Yelachenahalli" }, "3.9")
//   greenLineDistanceMap.set({ first: "Yelachenahalli", second: "Silk Institute" }, "6.29")
//
//   let purpleLineDistanceMap: Map<stnstore, string> = new Map();
//   purpleLineDistanceMap.set({ first: "Whitefield", second: "Krishnarajapura" }, "13.71")
//   purpleLineDistanceMap.set({ first: "Krishnarajapura", second: "Baiyappanahalli" }, "2.50")
//   purpleLineDistanceMap.set({ first: "Baiyappanahalli", second: "M G Road" }, "6.7")
//   purpleLineDistanceMap.set({ first: "M G Road", second: "Magadi Road" }, "5.12")
//   purpleLineDistanceMap.set({ first: "Magadi Road", second: "Mysuru Road" }, "6.4")
//   purpleLineDistanceMap.set({ first: "Mysuru Road", second: "Kengeri" }, "7.5")
//   purpleLineDistanceMap.set({ first: "Kengeri", second: "Challaghatta" }, "2.05")
//
//   let key1, key2, line1, line2;
//   for (const [key, value] of greenLineDistanceMap.entries()) {
//     if (key.first === originstn) {
//       key1 = key;
//       line1 = "green"
//     }
//   }
//   for (const [key, value] of purpleLineDistanceMap.entries()) {
//     if (key.first === originstn) {
//       key1 = key;
//       line2 = "purple"
//     }
//   }
//
//   for (const [key, value] of greenLineDistanceMap.entries()) {
//     if (key.first === deststn) {
//       key1 = key;
//       line2 = "green"
//     }
//   }
//   for (const [key, value] of purpleLineDistanceMap.entries()) {
//     if (key.first === deststn) {
//       key1 = key;
//       line2 = "purple"
//     }
//   }
//
//   let distance = "";
//   if (line1 === line2) {
//     distance = "24";
//   }
//   else { //find dist to majestic and add 10 min.
//
//   }
//
//
//   //@ts-ignore
//   let metroTravelTime = parseFloat(parseInt(distance)) / 42
//   return metroTravelTime
//
// }
//
//
function calculateMetroRoutes(origin, dest) {
    const avgSpeed = 42; // km/h
    function createDistanceMap(distances) {
        const map = new Map();
        distances.forEach(([first, second, distance]) => {
            map.set(`${first}-${second}`, distance);
            map.set(`${second}-${first}`, distance); // Add reverse direction
        });
        return map;
    }
    const greenLineDistances = [
        ["Nagasandra", "Peenya Industry", 2.50],
        ["Peenya Industry", "Yeshwanthpur", 4.8],
        ["Yeshwanthpur", "Sampige Road", 5.1],
        ["Sampige Road", "Majestic1", 2.0],
        ["Majestic1", "National College", 2.0],
        ["National College", "Rashtreeya Vidyalaya Road", 4.1],
        ["Rashtreeya Vidyalaya Road", "Yelachenahalli", 3.9],
        ["Yelachenahalli", "Silk Institute", 6.29]
    ];
    const purpleLineDistances = [
        ["Whitefield", "Krishnarajapura", 13.71],
        ["Krishnarajapura", "Baiyappanahalli", 2.50],
        ["Baiyappanahalli", "M G Road", 6.7],
        ["M G Road", "Majestic2", 2.56],
        ["Majestic2", "Magadi Road", 2.56],
        ["Magadi Road", "Mysuru Road", 6.4],
        ["Mysuru Road", "Kengeri", 7.5],
        ["Kengeri", "Challaghatta", 2.05]
    ];
    const greenLineDistanceMap = createDistanceMap(greenLineDistances);
    const purpleLineDistanceMap = createDistanceMap(purpleLineDistances);
    function getLine(station) {
        if (greenLineDistances.some(([first, second]) => first === station || second === station)) {
            return 'green';
        }
        if (purpleLineDistances.some(([first, second]) => first === station || second === station)) {
            return 'purple';
        }
        return null;
    }
    function calculateDistance(originStn, destStn) {
        const line1 = getLine(originStn);
        const line2 = getLine(destStn);
        if (!line1 || !line2) {
            throw new Error('Invalid station');
        }
        if (line1 === line2) {
            const distanceMap = line1 === 'green' ? greenLineDistanceMap : purpleLineDistanceMap;
            const stations = line1 === 'green' ? greenLineDistances : purpleLineDistances;
            let totalDistance = 0;
            let currentStation = originStn;
            let found = false;
            while (currentStation !== destStn && !found) {
                for (const [first, second] of stations) {
                    if (first === currentStation) {
                        const distance = distanceMap.get(`${first}-${second}`);
                        if (distance !== undefined) {
                            totalDistance += distance;
                            currentStation = second;
                            if (currentStation === destStn) {
                                found = true;
                            }
                            break;
                        }
                    }
                }
            }
            return totalDistance;
        }
        else {
            // For simplicity, we're assuming Majestic is the interchange point
            if (line1 == "green") {
                const distToMajestic1 = calculateDistance(originStn, 'Majestic1');
                const distToMajestic2 = calculateDistance('Majestic2', destStn);
                return distToMajestic1 + distToMajestic2;
            }
            else {
                const distToMajestic1 = calculateDistance('Majestic1', originStn);
                const distToMajestic2 = calculateDistance(originStn, "Majestic2");
                return distToMajestic1 + distToMajestic2;
            }
        }
    }
    function calculateTravelTime(distance) {
        const timeInHours = distance / avgSpeed;
        return Math.round(timeInHours * 60); // Convert to minutes and round
    }
    // Example usage
    const originStn = origin;
    const destStn = dest;
    try {
        const distance = calculateDistance(originStn, destStn);
        const travelTime = calculateTravelTime(distance);
        console.log(`Distance from ${originStn} to ${destStn}: ${distance.toFixed(2)} km`);
        console.log(`Estimated travel time: ${travelTime} minutes`);
        return travelTime;
    }
    catch (error) {
        console.error(error);
    }
}
