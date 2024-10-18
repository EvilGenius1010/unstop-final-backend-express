

import * as turf from '@turf/turf';
import GetOptimumRoutes from './optimumroutes';

interface Station {
  type: 'Feature';
  properties: {
    name: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}


export default async function findNearestStn(lat: string, long: string) {

  const stations: Station[] = [
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


  const userLon = parseFloat(lat)
  const userLat = parseFloat(long)

  if (isNaN(userLat) || isNaN(userLon)) {
    return { error: 'Invalid latitude or longitude' };
  }

  const userPoint = turf.point([userLon, userLat]);
  const nearestStation = turf.nearestPoint(userPoint, stationsCollection);

  const distance = turf.distance(userPoint, nearestStation, { units: 'kilometers' });

  return {
    station: nearestStation.properties.name,
  }

}






export async function findTravelTimeByMetro(originstn: string, deststn: string) {
  const avgSpeed = 42;
  type stnstore = {
    first: string,
    second: string
  }
  let greenLineDistanceMap: Map<stnstore, string> = new Map();
  greenLineDistanceMap.set({ first: "Nagasandra", second: "Peenya Industry" }, "2.50")
  greenLineDistanceMap.set({ first: "Peenya Industry", second: "Yeshwanthpur" }, "4.8")
  greenLineDistanceMap.set({
    first: "Yeshwanthpur", second: "Sampige Road"
  }, "5.1")
  greenLineDistanceMap.set({ first: "Sampige Road", second: "National College" }, "4.0")
  greenLineDistanceMap.set({ first: "National College", second: "Rashtreeya Vidyalaya Road" }, "4.1")
  greenLineDistanceMap.set({ first: "Rashtreeya Vidyalaya Road", second: "Yelachenahalli" }, "3.9")
  greenLineDistanceMap.set({ first: "Yelachenahalli", second: "Silk Institute" }, "6.29")

  let purpleLineDistanceMap: Map<stnstore, string> = new Map();
  purpleLineDistanceMap.set({ first: "Whitefield", second: "Krishnarajapura" }, "13.71")
  purpleLineDistanceMap.set({ first: "Krishnarajapura", second: "Baiyappanahalli" }, "2.50")
  purpleLineDistanceMap.set({ first: "Baiyappanahalli", second: "M G Road" }, "6.7")
  purpleLineDistanceMap.set({ first: "M G Road", second: "Magadi Road" }, "5.12")
  purpleLineDistanceMap.set({ first: "Magadi Road", second: "Mysuru Road" }, "6.4")
  purpleLineDistanceMap.set({ first: "Mysuru Road", second: "Kengeri" }, "7.5")
  purpleLineDistanceMap.set({ first: "Kengeri", second: "Challaghatta" }, "2.05")

  let key1, key2, line1, line2;
  for (const [key, value] of greenLineDistanceMap.entries()) {
    if (key.first === originstn) {
      key1 = key;
      line1 = "green"
    }
  }
  for (const [key, value] of purpleLineDistanceMap.entries()) {
    if (key.first === originstn) {
      key1 = key;
      line2 = "purple"
    }
  }

  for (const [key, value] of greenLineDistanceMap.entries()) {
    if (key.first === deststn) {
      key1 = key;
      line2 = "green"
    }
  }
  for (const [key, value] of purpleLineDistanceMap.entries()) {
    if (key.first === deststn) {
      key1 = key;
      line2 = "purple"
    }
  }

  let distance = "";
  if (line1 === line2) {
    distance = "24";
  }
  else { //find dist to majestic and add 10 min.

  }


  //@ts-ignore
  let metroTravelTime = parseFloat(parseInt(distance)) / 42
  return metroTravelTime

}

