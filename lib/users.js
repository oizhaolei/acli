"use strict";

function Users(pool, prefix) {
  this.pool = pool;
}

Users.prototype = {
  list : function (callback) {
    console.log("list user...");
    var sql = 'select id, tel, fullname from tbl_user limit 30';
    var args = [ ];

    var query = this.pool.query(sql, args, function(err, data) {
      if (data && data.length > 0 ) {
        console.dir(data);
        if (callback) callback();
      } else {
        if (callback) callback();
      }
    });

  }
};

exports = module.exports = Users;
