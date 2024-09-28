const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
