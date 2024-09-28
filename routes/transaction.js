const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../utils/db');

AWS.config.update({ region: 'ap-south-1' });
const sqs = new AWS.SQS();
const sns = new AWS.SNS();

router.post('/', (req, res) => {
    const { amount, userId } = req.body;
    const transactionId = uuidv4();

    // Store in DynamoDB
    const params = {
        TableName: 'Transactions',
        Item: {
            TransactionId: transactionId,
            Amount: amount,
            UserId: userId,
        },
    };

    // Add the transaction to DynamoDB
    const docClient = new AWS.DynamoDB.DocumentClient();
    docClient.put(params, (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Send notification via SNS
        const snsParams = {
            Message: `Transaction ${transactionId} of amount ${amount} was successful.`,
            TopicArn: 'arn:aws:sns:ap-south-1:442426860300:BankTransactionNotifications',
        };
        sns.publish(snsParams, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Transaction recorded', transactionId });
        });
    });
});

module.exports = router;
