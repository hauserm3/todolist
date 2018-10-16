"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CrudResolver {
    constructor(repository) {
        this.repository = repository;
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(data);
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getById(id);
        });
    }
    updateOneById(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.updateById(id, update);
        });
    }
    deleteOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteById(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    bulkUpdate(ids, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () { return yield this.updateOneById(id, { [field]: value }); })));
        });
    }
    bulkDelete(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () { return yield this.deleteOneById(id); })));
        });
    }
}
exports.default = CrudResolver;
//# sourceMappingURL=base-resolver.js.map