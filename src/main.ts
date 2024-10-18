const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
import Login from "./routes/login"
import { Request, Response } from "express"
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
  let statusa = Login(phone_no, name);

  res.json({
    msg: statusa
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
