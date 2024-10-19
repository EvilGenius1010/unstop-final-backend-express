const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
import Login, { sendOTP, verifyOTP } from "./routes/login"
import { Request, Response } from "express"
import GetOptimumRoutes from "./routes/optimumroutes"
import { console } from "node:inspector/promises"
import getParkingSpots from "./routes/googleparking"
import ConvertAddrType from "./utils/stringToLatLong"
import findNearestStn, { calculateMetroRoutes } from "./routes/neareststn"
const geohash = require('ngeohash');

interface User {
  id: string;
  latitude: number;
  longitude: number;
  geohash: string;
}

const GEOHASH_PRECISION = 6;





app.use(express.json())

app.use((req: Request, res: Response, next: any) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Content-Type", "application/json")
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

  client.on('error', (err: any) => console.log('Redis Client Error', err));

  // Connect to Redis
  (async () => {
    await client.connect();
    console.log("HI")
  })();

} catch (err) {
  console.log(`Error with starting redis is ${err}`)
}





app.post('/login', async (req: Request, res: Response) => {
  const phone_no = req.body.phone_no
  const name = req.body.name
  try {
    let statusa = await Login(phone_no, name);

    res.json({
      msg: statusa
    })
  }

  catch (err) {
    console.log(err)
    res.json({
      msg: `Serverside Error occurred ${err}`
    })
  }
})

app.post('/optimumroutes', async (req: Request, res: Response) => {
  const origin = req.body.origin;
  const destination = req.body.destination
  const travelModes = req.body.travelModes
  try {
    let abc = await GetOptimumRoutes(origin, destination, travelModes)
    // let travelTimeMetro = calculateMetroRoutes(origin, destination)
    console.log(abc)
    res.json({
      msg: abc
    })
  }
  catch (err) {
    console.log(err)
    res.json({
      msg: `Serverside Error occurred ${err}`
    })
  }
})

app.post('/neareststn', async (req: Request, res: Response) => {
  const lat = req.body.lat
  const long = req.body.long

  try {
    let neareststn = await findNearestStn(lat, long)
    res.json({
      msg: neareststn
    })

  } catch (err) {
    console.log(`Serverside error ${err}`)
  }
})



app.post('/verifyOTP', async (req: Request, res: Response) => {
  const otp = req.body.otp
  const phone_no = req.body.phone_no
  try {
    let check1 = await verifyOTP(otp, phone_no)

    res.json({
      msg: check1
    })
  }
  catch (err) {
    console.log(`Serverside error is ${err}`)
  }
}
)

// app.post('/updatelocation', express.json(), async (req: Request, res: Response) => {
//   const phone_no = req.body.phone_no
//   const latitude = req.body.latitude
//   const longitude = req.body.longitude
//   const userGeohash = geohash.encode(latitude, longitude, GEOHASH_PRECISION);
//
//   try {
//     // Store user location using Redis GEOADD
//     await client.geoAdd('user_locations', {
//       longitude,
//       latitude,
//       member: phone_no
//     });
//
//     // Store user geohash for faster lookups
//     await client.hSet('user_geohashes', phone_no, userGeohash);
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


app.post('/convertaddr', async (req: Request, res: Response) => {
  const addr = req.body.addr
  try {
    const getLatLongitude = await ConvertAddrType(addr)
    res.json({
      msg: getLatLongitude
    })
  } catch (err) {
    console.log(`Serverside error is ${err}`)
  }
})


app.post('/getparking', async (req: Request, res: Response) => {
  const location = req.body.location
  const radius = req.body.radius
  try {
    const getParking = await getParkingSpots(location, radius)
    res.json({
      msg: getParking
    })
  } catch (err) {
    console.log(`Serverside error is ${err}`)
  }

}

)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
