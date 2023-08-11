"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = require("./data"); // Import the updateTransaction function
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("halo dunia ini saya");
});
// Get all
app.get("/transaction", (req, res) => {
    res.status(200).json({
        massage: "Sucsess get all transaction data",
        transaction: data_1.transaction,
    });
});
// Get data from transaction id
app.get('/transaction/:id', (req, res) => {
    const transactionId = data_1.transaction.filter((item) => {
        console.log("dalam", item);
        return item.id == req.params.id;
    });
    console.log("luar", transactionId);
    if (transactionId.length != 0) {
        res.json({
            message: "Sucsess get transaction by id",
            transactionId,
        });
    }
    else {
        res.json({
            message: "Failed get transaction by id"
        });
    }
});
// Post data transaction
app.post('/transaction', (req, res) => {
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.name);
    data_1.transaction.push(req.body);
    console.log("coba coba", data_1.transaction);
    res.json({
        message: "Sucsess adding one transaction data",
        transaction: data_1.transaction,
    });
});
//patch method
app.patch('/transaction/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedFields = req.body;
    const updated = (0, data_1.patchTransaction)(idToUpdate, updatedFields);
    if (updated === null) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully', updated });
});
// PUT Method
app.put('/transaction/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedTransaction = req.body;
    const updated = (0, data_1.updateTransaction)(idToUpdate, updatedTransaction);
    if (updated === null) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully', updated });
});
app.delete('/transaction/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToDelete = parseInt(req.params.id);
    const indexToDelete = data_1.transaction.findIndex(item => item.id === idToDelete);
    if (indexToDelete === -1) {
        return res.status(404).json({ message: 'Item Not Found' });
    }
    ;
    data_1.transaction.splice(indexToDelete, 1);
    res.json({ message: 'Transaction deleted sucsessfully' });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
