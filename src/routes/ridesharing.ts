import createRedisClient from '../utils/redis'
import geohash from "ngeohash"
import { getDistance } from 'geolib';
//
// // Bengaluru bounding box (approximation)
const BENGALURU_BOUNDS = {
  minLat: 12.8340,
  maxLat: 13.1436,
  minLon: 77.3554,
  maxLon: 77.8615
};



const GEOHASH_PRECISION = 8


export async function nearbyUsers(lat: string, long: string, radius: number) {

  const centerGeohash = geohash.encode(lat, long, GEOHASH_PRECISION);
  const neighborHashes = geohash.neighbors(centerGeohash);
  neighborHashes.push(centerGeohash);

  // const nearbyUsers = users.filter(user =>
  //   neighborHashes.includes(user.geohash) &&
  //   getDistance({ latitude: lat, longitude: long },
  //     { latitude: user.lat, longitude: user.long }) <= radius
  // );

  return nearbyUsers

}
import { createClient } from 'redis';

export async function updateLocation(lat: string, long: string, phone_no: string) {
  const updateLocation = geohash.encode(lat, long)

  // const client = createRedisClient();
  const client = createClient({
    password: 'iZfkEFkWuMuIuxTie1Fpp376YrrRjaWM',
    socket: {
      host: 'redis-16379.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
      port: 16379
    }
  });
  await client.connect()
  const member = {
    latitude: parseFloat(lat),
    longitude: parseFloat(long),
    member: phone_no
  }
  const nearby = await client.geoAdd("blr", member)
  client.quit()
  return nearby
}
