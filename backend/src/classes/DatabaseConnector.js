const asyncLib = require("async");

class DatabaseConnector {
    constructor (_model) {
        this.model = _model;
    }

    createOne (modelDataObject) {
        return new Promise((resolve, reject) => {
            let modelObject = new this.model();

            Object.assign(modelObject, modelDataObject);

            modelObject.save(function(err, result) {
                if (err) {
                    
                    return reject(err);
                }

                resolve(result);
            });
        });
    }


    returnPaginatedData (pageSize, totalRecordsCount, currentPageNumber, currentPageData) {
        
        return {
            current_page_number: currentPageNumber,
            total_records: totalRecordsCount,
            total_pages: !totalRecordsCount ? 0 : ((isNaN(totalRecordsCount % pageSize)) ? 1 : (totalRecordsCount % pageSize === 0 ) ? (totalRecordsCount / pageSize) : (Math.floor(totalRecordsCount / pageSize) + 1)),
            results: currentPageData,
        };
    }

    find (condition, projection, paginationConfig) {
        return new Promise((resolve, reject) => {
            let pageNumber = parseInt(paginationConfig.page_no),
                pageSize = parseInt(paginationConfig.page_size);
                this.model.count(condition, (err, totalRowsCount) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (!totalRowsCount) {
                            resolve(this.returnPaginatedData(pageSize, 0, pageNumber, []));
                        } else {
                            let skipCount = pageNumber ? pageNumber * pageSize : 0;
                            if (!projection) {
                                projection = {};
                            }
                            let sort = {};
                            if (paginationConfig.sort_by) {
                                sort[paginationConfig.sort_by] = -1;
                                if (paginationConfig.sort_order) {
                                    sort[paginationConfig.sort_by] = paginationConfig.sort_order;
                                }
                            } else {
                                sort = {
                                    _id: -1
                                };
                            }
                            this.model.find(condition, projection).sort(sort).skip(skipCount).limit(pageSize).exec((err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(this.returnPaginatedData(pageSize, totalRowsCount, pageNumber, result));
                                }
                            });
                        }
                    }
                });
            
        });
    }


    findOne (condition, projection) {
        return new Promise((resolve, reject) => {
            if (!projection) {
                projection = {};
            }

            this.model.findOne(condition, projection, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }


    deleteOne (condition) {
        return new Promise((resolve, reject) => {
            this.model.deleteOne(condition, function(err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    updateOne (condition, updateFields) {
        return new Promise((resolve, reject) => {
            this.model.updateOne(condition, updateFields, function(err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    update (condition, updateFields) {
        return new Promise((resolve, reject) => {
            this.model.update(condition, updateFields, {multi: 'true'}, function(err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }
    

    findAll (condition, projection) {
        return new Promise((resolve, reject) => {
            this.model.find(condition, projection, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = DatabaseConnector;
