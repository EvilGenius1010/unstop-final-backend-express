const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
import Login, { sendOTP, verifyOTP } from "./routes/login"
import { Request, Response } from "express"
import GetOptimumRoutes from "./routes/optimumroutes"
import { console } from "node:inspector/promises"
import getParkingSpots from "./routes/googleparking"
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
    let abc = await GetOptimumRoutes(origin, destination, "DRIVE")

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

app.post('/sendOTP', async (req: Request, res: Response) => {
  const phone_no = req.body.phone_no
  let check1 = await sendOTP(phone_no)

  res.json({
    msg: check1
  })
})

app.post('/verifyOTP', async (req: Request, res: Response) => {
  const otp = req.body.otp
  const phone_no = req.body.phone_no
  let check1 = await verifyOTP(otp, phone_no)

  res.json({
    msg: check1
  })
}
)


app.post('/getparking', async (req: Request, res: Response) => {
  const location = req.body.location
  const radius = req.body.radius
  try {
    getParkingSpots(location, radius)
  } catch (err) {
    console.log(`Serverside error is ${err}`)
  }

}

)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
