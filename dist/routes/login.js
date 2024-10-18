"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
const prisma_1 = __importDefault(require("../utils/prisma"));
const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = twilio(accountSID, authToken);
const SERVICE_SID = "VAfa0e7ebb8ed5d2b72df66c7e785515d3";
function Login(phone_no, name) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const checkUserExists = await prisma.user.findUnique({
        //     where: {
        //       phone_no: phone_no,
        //       name: name
        //     }
        //   })
        //   if (checkUserExists == null) {
        //     const pushUsertoDB = await prisma.user.create(phone_no)
        //   }
        const checkUserExists = yield prisma_1.default.user.findUnique({
            where: {
                phone_no: phone_no,
            }
        });
        if (checkUserExists) {
            let checkOTPsent = yield sendOTP(phone_no);
            return { msg: "user already exists" };
        }
        else {
            const pushUsertoDB = yield prisma_1.default.user.create({
                data: {
                    phone_no: phone_no,
                    name: name
                }
            });
            sendOTP(phone_no);
            return pushUsertoDB;
        }
    });
}
function sendOTP(phone_no) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const otpResponse = yield client.verify.v2
            .services(SERVICE_SID)
            .verifications.create({
            channel: "sms",
            to: `+91${phone_no}`,
        });
        console.log(otpResponse);
        return otpResponse.body;
    });
}
function verifyOTP(otp, phone_no) {
    return __awaiter(this, void 0, void 0, function* () {
        const verificationCheck = yield client.verify.v2
            .services(SERVICE_SID)
            .verificationChecks.create({
            code: otp,
            to: `+91${phone_no}`,
        });
        console.log(verificationCheck.status);
        return verificationCheck.status;
    });
}
