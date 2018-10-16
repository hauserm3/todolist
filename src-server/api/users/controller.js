"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolver_1 = require("./resolver");
const crud_controller_1 = require("../../common/crud-controller");
class UserController extends crud_controller_1.default {
    constructor() {
        super(new resolver_1.default());
    }
}
exports.default = UserController;
//# sourceMappingURL=controller.js.map