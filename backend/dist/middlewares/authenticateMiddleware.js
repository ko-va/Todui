"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var middleware = express_jwt_1.default({
    secret: 'asd',
    algorithms: ['HS256'],
    /*getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
        return req.headers.authorization.split(' ')[1];
      }
  
      return null;
    }*/
});
exports.default = middleware;
