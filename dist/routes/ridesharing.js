"use strict";
// import geohash from "ngeohash"
// import { getDistance, isPointInBoundingBox } from 'geolib';
//
// // Bengaluru bounding box (approximation)
// const BENGALURU_BOUNDS = {
//   minLat: 12.8340,
//   maxLat: 13.1436,
//   minLon: 77.3554,
//   maxLon: 77.8615
// };
//
//
//
//
//
//
// export async function nearbyUsers(lat: string, long: string, radius: string) {
//
//   const centerGeohash = geohash.encode(lat, long, GEOHASH_PRECISION);
//   const neighborHashes = geohash.neighbors(centerGeohash);
//   neighborHashes.push(centerGeohash);
//
//   const nearbyUsers = users.filter(user =>
//     neighborHashes.includes(user.geohash) &&
//     getDistance({ latitude: lat, longitude: long },
//       { latitude: user.lat, longitude: user.long }) <= radius
//   );
//
//   return nearbyUsers
//
// }
