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
exports.default = GetOptimumRoutes;
exports.findNearestMetroStation = findNearestMetroStation;
const COMPUTEROUTESAPI = "https://routes.googleapis.com/directions/v2:computeRoutes";
const axios_1 = __importDefault(require("axios"));
function GetOptimumRoutes(origin, destination, travelMode) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqbody = {
            origin: {
                address: origin
            },
            destination: {
                address: destination
            },
            travelMode: "DRIVE",
            languageCode: "en-US",
            units: "IMPERIAL",
            computeAlternativeRoutes: true
        };
        const getres = yield axios_1.default.post(COMPUTEROUTESAPI, reqbody, {
            headers: {
                "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline",
                "X-Goog-Api-Key": process.env.GCP_MAPS_API,
                "Content-Type": "application/json"
            }
        });
        return getres.data;
    });
}
function findNearestMetroStation() {
    return __awaiter(this, void 0, void 0, function* () {
        // const
        const purpleLineMetroStns = ["Nagasandra", "Dasarahalli", "Jalahalli", "Peenya INdustry", "Peenya", "Goreguntepalya", "Yeshwantpur", "Sampige Road",];
    });
}
