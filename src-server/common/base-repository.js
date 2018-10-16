"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataStore = require("nedb");
class Repository {
    constructor() {
        this.dataSource = new DataStore({
            inMemoryOnly: true,
        });
    }
    save(data) {
        return new Promise((resolve, reject) => {
            this.dataSource.insert(data, (error, document) => {
                if (error) {
                    reject(error);
                }
                resolve(document);
            });
        });
    }
    getById(_id) {
        return new Promise((resolve, reject) => {
            this.dataSource.findOne({ _id }, (error, document) => {
                if (error) {
                    reject(error);
                }
                resolve(document);
            });
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.dataSource.find({}, {}, (error, documents) => {
                if (error) {
                    reject(error);
                }
                resolve(documents);
            });
        });
    }
    updateById(_id, data) {
        return new Promise((resolve, reject) => {
            this.dataSource.update({ _id }, data, undefined, error => {
                if (error) {
                    reject(error);
                }
                this.getById(_id).then(value => resolve(value));
            });
        });
    }
    deleteById(_id) {
        return new Promise((resolve, reject) => {
            this.dataSource.remove({ _id }, error => {
                if (error) {
                    reject(error);
                }
                resolve(_id);
            });
        });
    }
}
exports.default = Repository;
//# sourceMappingURL=base-repository.js.map