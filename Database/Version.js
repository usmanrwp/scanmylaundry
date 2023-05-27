import DB from "./DB";

const db = new DB();

export default class Version {
  createTable = () => {
    return new Promise(resolve => {
      db.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql("CREATE TABLE IF NOT EXISTS DB_Version (ID, Version, PublishKey)");
        });
      });

      resolve();
    });
  };

  addVersion = data => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("DELETE FROM DB_Version").then(([tx, results]) => {
              // console.warn("delerte", results);
              //insert dbversion
              db.transaction(tx => {
                tx.executeSql(
                  "INSERT INTO DB_Version (Version,Entity, PublishKey) VALUES (?,?, ?)",
                  [data.version, data.entity, data.STRIPE_PUBLISHABLE_KEY]
                ).then(([tx, results]) => {
                  resolve(results);
                });
              })
                .then(result => {
                  //   console.warn(result);

                  db.closeDatabase(db);
                })
                .catch(err => {
                  //   console.warn(err);
                });
              //end of db version
            });
          })
            .then(result => {
              db.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          //   console.warn(err);
        });
    });
  };

  checkVersion = data => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM DB_Version WHERE Version = ?", [
              data[0].version
            ]).then(([tx, results]) => {
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              } else {
                resolve("Empty");
              }
            });
          })
            .then(result => {
              db.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  existanceCheck = () => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            db.executeSql("SELECT 1 FROM DB_Version LIMIT 1")
              .then(() => {})
              .catch(error => {
                resolve("Empty");
                return;
              });

            tx.executeSql("SELECT * FROM DB_Version").then(([tx, results]) => {
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              } else {
                resolve("Empty");
              }
            });
          })
            .then(result => {
              db.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
}
