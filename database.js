const database = function() {}
const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message)
  }
  db.exec(`
    create table if not exists users (
      name text not null,
      accessibility text null,
      price text null
    );
    `)
})

database.GetUsersCount = function() {
  return new Promise((resolve, reject) => {
    sql = 'select count(*) as count from users'
    db.get(sql, (err, row) => {
      if (err) {
        return console.error(err.message)
        reject(err)
      }
      resolve(row.count)
    })
  })
}

database.GetLatestUser = function() {
  return new Promise((resolve, reject) => {
    sql = 'select * from users order by ROWID desc limit 1'
    db.get(sql, (err, row) => {
      if (err) {
        return console.error(err.message)
        reject(err)
      }
      resolve(row)
    })
  })
}

database.InsertUser = function(name, accessibility = null, price = null) {
  return new Promise((resolve, reject) => {
    sql = 'insert into users(name, accessibility, price) values(?, ?, ?)'
    db.run(sql, [name, accessibility, price], function(err) {
      if (err) {
        return console.error(err.message)
        reject(err)
      }
      resolve(1)
    })
  })
}

module.exports = database
