var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'YOUR_USERNAME',
      password : 'YOUR_PASSWORD',
      database : 'DB_NAME'
    }
);
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
 
/* Begin transaction */
connection.beginTransaction(function(err) {
      if (err) { throw err; }
      
      connection.query('INSERT INTO names SET name=?', "sameer", function(err, result) {
               if (err) { 
                  connection.rollback(function() {
                  throw err;
                  });
               }
            
               var log = result.insertId;
            
               connection.query('INSERT INTO log SET logid=?', log, function(err, result) {
                        if (err) { 
                        connection.rollback(function() {
                           throw err;
                        });
                        }  
                        
                        connection.commit(function(err) {
                              if (err) { 
                                 connection.rollback(function() {
                                    throw err;
                                 });
                              }
                              console.log('Transaction Complete.');
                              connection.end();
                        });
               });
      });
});
/* End transaction */
As noted in the NodeJS documentation, beginTransaction(), commit() and rollback() are simply convenience functions that execute the MySQL START TRANSACTION, COMMIT, and ROLLBACK commands respectively. If you check the MySQL nodejs module you will see the code like below for ‘commit’ .

Connection.prototype.commit = function commit(options, callback) {
    if (!callback && typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = options || {};
    options.sql = 'COMMIT';
    options.values = null;
    return this.query(options, callback);
};