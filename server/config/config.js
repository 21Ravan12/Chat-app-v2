// Exporting configuration settings as a module
module.exports = {
    // MongoDB connection URI
    mongoUri: 'mongodb://localhost:27017',
    
    // Name of the primary database
    dbName: 'My_social_web_database',
    
    // Name of the secondary database
    dbName1: 'chatApp',
    
    // Email credentials for nodemailer
    emailCredentials: {
      // Email address used for sending emails
      user: '',
      
      // Password for the email account
      pass: ''
    }
  };
