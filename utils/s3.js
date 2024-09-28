const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });
const s3 = new AWS.S3();

module.exports = s3;
