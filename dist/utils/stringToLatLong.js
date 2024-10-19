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
exports.default = ConvertAddrType;
const axios_1 = __importDefault(require("axios"));
function ConvertAddrType(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const encodedLocation = encodeURIComponent(location);
        let addrconversion = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${process.env.GCP_MAPS_API}`);
        //@ts-ignore
        return addrconversion === null || addrconversion === void 0 ? void 0 : addrconversion.results;
    });
}
