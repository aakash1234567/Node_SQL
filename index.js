const Connection = require('tedious').Connection;  
const Request = require('tedious').Request; 
const TYPES = require('tedious').TYPES;   
const config = require("./dbconfig")

const connection = new Connection(config);  
connection.on("connect", async function (err) {
    if(err) {
        console.log('Error: ', err)
    } else {
        console.log("Successful connection");
        write();
    }
});

connection.connect();

async function write() {
    const request = new Request("INSERT INTO tab (name, age) OUTPUT INSERTED.name VALUES (@name, @age);", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    request.addParameter('name', TYPES.NVarChar,'dummy');  
    request.addParameter('age', TYPES.Int, 15);  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
                console.log('NULL');  
            } else {  
                console.log("Name of inserted item is " + column.value);  
            }  
        });  
    });

    request.on("requestCompleted", function () {
        read()
    });
    connection.execSql(request); 
}

async function read() {  
    const request = new Request("SELECT * FROM tab", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    let result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
                console.log('NULL');  
            } else {  
                result+= column.value + " ";  
            }  
        });  
        console.log(result);  
        result = ""
    });  
    
    request.on("requestCompleted", function () {
        connection.close();
    });
    connection.execSql(request);  
} 