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
const Boom = require("boom");
const utils_1 = require("../helper/utils");
const logger_1 = require("../helper/logger");
class CrudController {
    constructor(crudResolver) {
        this.crudResolver = crudResolver;
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`POST - ${utils_1.default.getUrl(request)}`);
                const data = yield this.crudResolver.save(request.payload);
                return response({
                    statusCode: 200,
                    data: {
                        id: data['_id'],
                    },
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.updateById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`PUT - ${utils_1.default.getUrl(request)}`);
                const id = encodeURIComponent(request.params.id);
                const entity = yield this.crudResolver.updateOneById(id, request.payload);
                return response({
                    statusCode: 200,
                    data: entity,
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.getById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET - ${utils_1.default.getUrl(request)}`);
                const id = encodeURIComponent(request.params.id);
                const entity = yield this.crudResolver.getOneById(id);
                return response({
                    statusCode: 200,
                    data: entity,
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET - ${utils_1.default.getUrl(request)}`);
                const entities = yield this.crudResolver.getAll();
                return response({
                    statusCode: 200,
                    data: entities,
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`DELETE - ${utils_1.default.getUrl(request)}`);
                const id = encodeURIComponent(request.params.id);
                yield this.crudResolver.deleteOneById(id);
                return response({
                    statusCode: 200,
                    data: { id },
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.bulkUpdate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET - ${utils_1.default.getUrl(request)}`);
                const ids = request.payload.ids;
                let field = '';
                let value = '';
                for (const param of Object.keys(request.payload)) {
                    if (!Array.isArray(request.payload[param])) {
                        field = param;
                        value = request.payload[param];
                    }
                }
                const entities = yield this.crudResolver.bulkUpdate(ids, field, value);
                return response({
                    statusCode: 200,
                    data: entities,
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
        this.bulkDelete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`GET - ${utils_1.default.getUrl(request)}`);
                const ids = request.payload.ids;
                const entities = yield this.crudResolver.bulkDelete(ids);
                if (!entities) {
                    return response(Boom.notFound('Items not found.'));
                }
                return response({
                    statusCode: 200,
                    data: entities,
                });
            }
            catch (error) {
                return response(Boom.badImplementation(error));
            }
        });
    }
}
exports.default = CrudController;
//# sourceMappingURL=crud-controller.js.map