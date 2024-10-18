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
const prisma_1 = __importDefault(require("../utils/prisma"));
const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = twilio(accountSID, authToken);
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
                name: name
            }
        });
        if (checkUserExists == null) {
            const pushUsertoDB = yield prisma_1.default.user.create({
                data: {
                    phone_no: phone_no,
                    name: name
                }
            });
        }
        return checkUserExists;
    });
}
function sendOTP(phone_no) {
    return __awaiter(this, void 0, void 0, function* () {
        let sendOTP = client.messages
            .create({
            body: 'Hello from twilio-node',
            to: '+918859900177', // Text your number
            from: '+917558483544'
        })
            .then((message) => console.log(message.sid));
        console.log(sendOTP.body);
        return sendOTP.body;
    });
}
