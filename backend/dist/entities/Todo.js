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
exports.Todo = void 0;
var typeorm_1 = require("typeorm");
var List_1 = require("./List");
var User_1 = require("./User");
var Todo = /** @class */ (function () {
    function Todo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Todo.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todo.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todo.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Todo.prototype, "isToggled", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Todo.prototype, "listId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Todo.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return List_1.List; }, function (list) { return list.todos; }),
        __metadata("design:type", List_1.List)
    ], Todo.prototype, "list", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.todos; }),
        __metadata("design:type", User_1.User)
    ], Todo.prototype, "user", void 0);
    Todo = __decorate([
        typeorm_1.Entity()
    ], Todo);
    return Todo;
}());
exports.Todo = Todo;
