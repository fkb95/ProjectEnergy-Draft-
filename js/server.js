var express = require('express')();
var http = require('http').Server(express);
var mysql = require('mysql');
var url = require('url');
var server_port = 1337;

http.listen(server_port, function(){
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    console.log("--------------------------------------------------------");
    console.log("| ...........  Project Energy Server (PeS) ..........  |");
    console.log("| ...................................................  |");
    console.log("| ===========  ||||||   ||||||     |||||| ===========  |");
    console.log("| /\\/\\/\\/\\/\\/  ||  ||   ||         ||     /\\/\\/\\/\\/\\/  |");
    console.log("| ===========  ||||||   ||||||     |||||| ===========  |");
    console.log("| /\\/\\/\\/\\/\\/  ||       ||             || /\\/\\/\\/\\/\\/  |");
    console.log("| ===========  ||    0  ||||||  0  ||||||  0  =======  |");
    console.log("| ...................................................  |");
    console.log("--------------------------------------------------------");
    console.log("(PeS) > Server started on port " + server_port);
    console.log("(PeS) > Welcome back.");    
});

var db_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '***********',
    database : 'projectenergy'
});

db_connection.connect();

function console_log(log_string){
    console.log("(PeS) > LOG: "+log_string);
};

function console_call(f_name){
     console.log("(PeS) > LOG: function "+f_name+" called.");
};

function console_success(f_name){
    console.log("(PeS) > LOG: function "+f_name+" executed successfully.");
};

function console_error(n, f_name, err){
    console.log("(PeS) > ERROR("+n+"): function "+f_name+" err: " + err);
};

express.use(function(req, res, next) {
    console_log("Access-Control-Allow enabled.");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

express.get('/getBrands', function(req,res){ 
    var f_name = "getBrands";
    var err_n = 20;
    console_call(f_name);
    db_connection.query('SELECT * FROM brand', function(err, rows, fields) {
        if (!err){
            res.send(rows);
            console_success(f_name);
        }else{
            res.send(f_name+" ERROR("+err_n+")");
            console_error(err_n, f_name, err);
        }
    });    
});

express.get('/getCategories', function(req,res){ 
    var f_name = "getCategories";
    var err_n = 21;
    console_call(f_name);
    db_connection.query('SELECT * FROM category', function(err, rows, fields) {
        if (!err){
            res.send(rows);
            console_success(f_name);
        }else{
            res.send(f_name+" ERROR("+err_n+")");
            console_error(err_n, f_name, err);
        }
    });    
});

express.get('/getDevices', function(req,res){ 
    var f_name = "getDevices";
    var err_n = 22;
    console_call(f_name);
    db_connection.query('CALL getDevices()', function(err, rows, fields) {
        if (!err){
            res.send(rows);
            console_success(f_name);
        }else{
            res.send(f_name+" ERROR("+err_n+")");
            console_error(err_n, f_name, err);
        }
    });    
});

express.post('/getDeviceByID', function(req,res){ 
    var f_name = "getDeviceByID";
    var err_n = 22.5;
    console_call(f_name);
    var body = '';
    req.on('data', function(chunk) {
        body += chunk.toString('utf8');
    });
    req.on('end', function() {
        body = JSON.parse(body);
        if(body.deviceid){
           db_connection.query("CALL getDevicesByID("+body.deviceid+")", function(err, rows, fields) {
                if (!err){
                    console.log(body.deviceid);
                    res.send(rows);
                    console_success(f_name);
                }else{
                    res.send(f_name+" ERROR("+err_n+")");
                    console_error(err_n, f_name, err);
                }
            });   
        }else{
            res.send(f_name+" ERROR(22.533)");
            console_error(22.533, f_name, "id missing");
        }
    }); 
     
});

express.post('/getDevicesByTextSearch', function(req,res){ 
    var f_name = "getDevicesByTextSearch";
    console_call(f_name);
    var body = '';
    req.on('data', function(chunk) {
        body += chunk.toString('utf8');
    });
    req.on('end', function() {
        body = JSON.parse(body);
        if(body.searchstring){
           db_connection.query("CALL getDevicesByTextSearch('"+body.searchstring+"')", function(err, rows, fields) {
                if (!err){
                    console.log(body.searchstring)
                    res.send(rows);
                    console_success(f_name);
                }else{
                    res.send(f_name+" ERROR(23)");
                    console_error(23, f_name, err);
                }
            }); 
        }else{
            res.send(f_name+" ERROR(24)");
            console_error(24, f_name, "searchstring missing");
        }
    }); 
});

express.post('/insertDevice', function(req,res){
    var f_name = "insertDevice";
    console_call(f_name);
    try{
        var body = '';
        req.on('data', function(chunk) {
            body += chunk.toString('utf8');
        });
        req.on('end', function() {
            body = JSON.parse(body);
            console.log(body);
            var name = body.name;
            var desc = body.desc;
            var brand = body.brand;
            var category = body.category;
            var minwatt = body.minwatt;
            var maxwatt = body.maxwatt;
            var khw = body.khw;
            var volts = body.volts;
            var ampere = body.ampere;
            var resistence = body.resistence;
            if(name){
                var query = "CALL insertDevice('"+name+"','"+desc+"',"+brand+","+category+","+minwatt+","+maxwatt+","+khw+","+volts+","+ampere+","+resistence+")";
                db_connection.query(query, function(err, rows, fields) {
                    if (!err){
                        res.send("Device inserted");
                        console_success(f_name);
                    }else{
                        res.send(f_name+" ERROR(25)");
                        console_error(25, f_name, err);
                    }
                });
            }else{
                res.send(f_name+" ERROR(26)");
                console_error(26, f_name, "err");
            }
        });             
    }catch(ex){
        res.send(f_name+" ERROR(27)");
        console_error(27, f_name, ex);
    }  
});

express.post('/deleteDeviceByID', function(req,res){
    var f_name = "deleteDeviceByID";
    console_call(f_name);
    try{
        var body = '';
        req.on('data', function(chunk) {
            body += chunk.toString('utf8');
        });
        req.on('end', function() {
            body = JSON.parse(body);
            var DeviceID = body.DeviceID;       
            if(DeviceID){
                var query = "DELETE FROM device WHERE DeviceID = " + DeviceID;
                db_connection.query(query, function(err, rows, fields) {
                    if (!err){
                        res.send("Device deleted");
                        console_success(f_name);
                    }else{
                        res.send(f_name+" ERROR(25)");
                        console_error(28, f_name, err);
                    }
                });
            }else{
                res.send(f_name+" ERROR(26)");
                console_error(29, f_name, "err");
            }
        });             
    }catch(ex){
        res.send(f_name+" ERROR(27)");
        console_error(30, f_name, ex);
    }  
});

express.post('/insertBrand', function(req,res){
    var f_name = "insertBrand";
    console_call(f_name);
    try{
        var body = '';
        req.on('data', function(chunk) {
            body += chunk.toString('utf8');
        });
        req.on('end', function() {
            body = JSON.parse(body);
            console.log(body);
            var name = body.name;
            var desc = body.desc;
            var webs = body.webs;
            if(name){
                var query = "CALL insertBrand('"+name+"','"+desc+"','"+webs+"')";
                db_connection.query(query, function(err, rows, fields) {
                    if (!err){
                        res.send("Brand inserted");
                        console_success(f_name);
                    }else{
                        res.send(f_name+" ERROR(28)");
                        console_error(28, f_name, err);
                    }
                });
            }else{
                res.send(f_name+" ERROR(29)");
                console_error(29, f_name, "err");
            }
        });             
    }catch(ex){
        res.send(f_name+" ERROR(30)");
        console_error(30, f_name, ex);
    }  
});

express.post('/getBrandsByTextSearch', function(req,res){ 
    var f_name = "getBrandsByTextSearch";
    console_call(f_name);
    var body = '';
    req.on('data', function(chunk) {
        body += chunk.toString('utf8');
    });
    req.on('end', function() {
        body = JSON.parse(body);
        if(body.searchstring){
           db_connection.query("CALL getBrandsByTextSearch('"+body.searchstring+"')", function(err, rows, fields) {
                if (!err){
                    console.log(body.searchstring)
                    res.send(rows);
                    console_success(f_name);
                }else{
                    res.send(f_name+" ERROR(31)");
                    console_error(31, f_name, err);
                }
            }); 
        }else{
            res.send(f_name+" ERROR(32)");
            console_error(32, f_name, "searchstring missing");
        }
    }); 
});
