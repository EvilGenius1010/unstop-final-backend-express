import prisma from "../utils/prisma";
const accountSID = process.env.ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio = require('twilio')
const client = twilio(accountSID, authToken);


export default async function Login(phone_no: string, name: string) {
  //   const checkUserExists = await prisma.user.findUnique({
  //     where: {
  //       phone_no: phone_no,
  //       name: name
  //     }
  //   })
  //   if (checkUserExists == null) {
  //     const pushUsertoDB = await prisma.user.create(phone_no)
  //   }

  const checkUserExists = await prisma.user.findUnique({
    where: {
      phone_no: phone_no,
      name: name
    }
  })
  if (checkUserExists == null) {
    const pushUsertoDB = await prisma.user.create({

      data: {

        phone_no: phone_no,
        name: name
      }
    })
  }


  return checkUserExists

}

export async function sendOTP(phone_no: string) {
  let sendOTP = client.messages
    .create({

      body: 'Hello from twilio-node',
      to: '+918859900177', // Text your number
      from: '+917558483544'
    })
    .then((message: any) => console.log(message.sid));
  console.log(sendOTP.body)
  return sendOTP.body

}
