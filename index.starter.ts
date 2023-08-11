import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { transaction, updateTransaction, Transaction, patchTransaction } from './data'; // Import the updateTransaction function
import bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("halo dunia ini saya");
});

// Get all
app.get("/transaction", (req, res) => {
  res.status(200).json({
    massage: "Sucsess get all transaction data",
    transaction,
})
});

// Get data transaction by ID
app.get('/transaction/:id', (req, res) =>{
  const transactionId = transaction.filter((item:any) => {
    console.log("dalam", item);
    return item.id == req.params.id;
  });
  console.log("luar", transactionId);
  if (transactionId.length != 0){
    res.json({
      message : "Sucsess get transaction by id",
      transactionId,
    });
  } else{
    res.json({
      message : "Failed get transaction by id"
    })
  }
});

// Post data transaction
app.post('/transaction', (req, res) =>{
  console.log(req.body);
  console.log(req.body.id);
  console.log(req.body.name);

  transaction.push(req.body);
  console.log("coba coba", transaction)

  res.json({
    message: "Sucsess adding one transaction data",
    transaction,
  });
});

//patch data transaction with the given ID
app.patch('/transaction/:id', (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const updatedFields: Partial<Transaction> = req.body;

  const updated = patchTransaction(idToUpdate, updatedFields);

  if (updated === null) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json({ message: 'Transaction updated successfully', updated });
});

// PUT data transaction with the given ID
app.put('/transaction/:id', (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const updatedTransaction: Transaction = req.body;

  const updated = updateTransaction(idToUpdate, updatedTransaction);

  if (updated === null) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json({ message: 'Transaction updated successfully', updated });
});


// Delete data transaction with the given ID
app.delete('/transaction/:id', async (req, res) =>{
  const idToDelete = parseInt(req.params.id);

  const indexToDelete = transaction.findIndex(item => item.id === idToDelete);

  if(indexToDelete === -1){
    return res.status(404).json({message: 'Item Not Found'})
  };

  transaction.splice(indexToDelete, 1);

  res.json({message: 'Transaction deleted sucsessfully'});
   
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
