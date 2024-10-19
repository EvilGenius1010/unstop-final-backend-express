import prisma from "../utils/prisma";
const accountSID = process.env.ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio = require('twilio')
const client = twilio(accountSID, authToken);
const SERVICE_SID = "VAfa0e7ebb8ed5d2b72df66c7e785515d3"

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
  try {
    const checkUserExists = await prisma.user.findUnique({
      where: {
        phone_no: phone_no,

      }
    })

    if (checkUserExists) {
      let checkOTPsent = await sendOTP(phone_no)
      return { msg: "user already exists" }
    }
    else {
      const pushUsertoDB = await prisma.user.create({

        data: {

          phone_no: phone_no,
          name: name
        }
      })
      sendOTP(phone_no)
      return pushUsertoDB

    }
  } catch (err) {
    console.log(`Serverside error is ${err}`)
  }

}

export async function sendOTP(phone_no: string) {
  // let sendOTP = client.messages
  //   .create({
  //
  //     body: 'Hello from twilio-node',
  //     to: '+918859900177', // Text your number
  //     from: '+917558483544'
  //   })
  //   .then((message: any) => console.log(message.sid));
  // console.log(sendOTP.body)
  // return sendOTP.body
  try {

    const otpResponse = await client.verify.v2
      .services(SERVICE_SID)
      .verifications.create({
        channel: "sms",
        to: `+91${phone_no}`,
      });
    console.log(otpResponse)
    return otpResponse.body
  } catch (err) {
    console.log(`Error is ${err}`)
  }
}


export async function verifyOTP(otp: string, phone_no: string) {
  try {
    const verificationCheck = await client.verify.v2
      .services(SERVICE_SID)
      .verificationChecks.create({
        code: otp,
        to: `+91${phone_no}`,
      });

    console.log(verificationCheck.status);
    return verificationCheck.status
  } catch (err) {
    console.log(`Error is ${err}`)
  }

}
