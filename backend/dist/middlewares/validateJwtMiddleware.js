"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var validateJwtMiddleware = express_jwt_1.default({
    secret: '0P5zbijpUmAIv5LP0aQhvKh4Uj6aNagyOtrsrFq42HAimbpgbxpUyRl5RcoZFkFR',
    algorithms: ['HS256'],
    requestProperty: 'token',
});
exports.default = validateJwtMiddleware;
