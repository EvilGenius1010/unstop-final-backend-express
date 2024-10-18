const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
import Login from "./routes/login"
import { Request, Response } from "express"
app.use(express.json())

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
