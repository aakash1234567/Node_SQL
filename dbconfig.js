const config = {  
    server: 'localhost',  // server url
    authentication: {
        type: 'default',
        options: {
            userName: '', // username
            password: ''  // password
        },
    },
    options: {
        encrypt: true,
        database: 'example',  //DB Name
        port: 1433, //Port number 1433 is default
        trustServerCertificate: true  
    },
};  

module.exports = config