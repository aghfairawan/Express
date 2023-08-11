"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTransaction = exports.updateTransaction = exports.transaction = void 0;
;
// movies
exports.transaction = [
    {
        id: 1,
        name: "Asep",
        detail: "jajan ciki"
    },
    {
        id: 2,
        name: "Usep",
        detail: "beli rumah"
    },
    {
        id: 3,
        name: "Udin",
        detail: "beli rumah orang"
    },
    {
        id: 4,
        name: "Uded",
        detail: "beli beli aja gabut hehehe"
    },
];
function updateTransaction(id, updatedTransaction) {
    const indexToUpdate = exports.transaction.findIndex(item => item.id === id);
    if (indexToUpdate === -1) {
        return null; // Transaction not found
    }
    exports.transaction[indexToUpdate] = Object.assign(Object.assign({}, exports.transaction[indexToUpdate]), updatedTransaction);
    return exports.transaction[indexToUpdate];
}
exports.updateTransaction = updateTransaction;
;
function patchTransaction(id, updatedFields) {
    const indexToUpdate = exports.transaction.findIndex(item => item.id === id);
    if (indexToUpdate === -1) {
        return null; // Transaction not found
    }
    exports.transaction[indexToUpdate] = Object.assign(Object.assign({}, exports.transaction[indexToUpdate]), updatedFields);
    return exports.transaction[indexToUpdate];
}
exports.patchTransaction = patchTransaction;
