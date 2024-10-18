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
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const login_1 = __importDefault(require("./routes/login"));
app.use(express.json());
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone_no = req.body.phone_no;
    const name = req.body.name;
    let statusa = (0, login_1.default)(phone_no, name);
    res.json({
        msg: statusa
    });
}));
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
