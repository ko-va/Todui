"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Todo_1 = require("./Todo");
var List = /** @class */ (function () {
    function List() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], List.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], List.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], List.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], List.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.lists; }),
        __metadata("design:type", User_1.User)
    ], List.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Todo_1.Todo; }, function (todo) { return todo.list; }, { eager: true, cascade: true }),
        __metadata("design:type", Array)
    ], List.prototype, "todos", void 0);
    List = __decorate([
        typeorm_1.Entity()
    ], List);
    return List;
}());
exports.List = List;
