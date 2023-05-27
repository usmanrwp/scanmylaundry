import DB from "./DB";

const db = new DB();

export default class Category {
  createTable = () => {
    return new Promise(resolve => {
      //Category Table Start

      db.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Categories (OID, Name, Picture, Type, super_category_id, status)"
          );
        });
      });

      resolve();
    });
  };

  addCategory(prod) {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "INSERT INTO Categories (OID,Name,Picture,Type, super_category_id, status)  VALUES (?, ?, ?, ?, ?, ?)",
              [prod.OID, prod.Name, prod.Picture, prod.Type, prod.super_category_id, prod.status]
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
        })
        .catch(err => {
          //   console.warn(err);
        });
    });
  }

  listCategory() {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM Categories WHERE status =?", ["1"]).then(
              ([tx, results]) => {
                // console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  //   console.warn(`Prod ID: ${row.OID}, Prod Name: ${row.Name}`);
                  const { OID, Name, Picture, Type, super_category_id, status } = row;
                  products.push({
                    OID,
                    Name,
                    Type,
                    Picture,
                    super_category_id,
                    status
                  });
                }
                resolve(products);
              }
            );
          })
            .then(result => {
              db.closeDatabase(db);
            })
            .catch(err => {
              //   console.log(err);
            });
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }




  super_Category_match(idd) {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM Categories WHERE super_category_id= ?", [idd]).then(
              ([tx, results]) => {
                // console.log("Query completed");
                var len = results.rows.length;
                // alert(JSON.stringify(results.rows.item(1)));
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  //   console.warn(`Prod ID: ${row.OID}, Prod Name: ${row.Name}`);
                  const { OID, Name, Picture, Type, super_category_id, status } = row;
                  products.push({
                    OID,
                    Name,
                    Type,
                    Picture,
                    super_category_id,
                    status
                  });
                }
                resolve(products);
              }
            );
          })
            .then(result => {
              db.closeDatabase(db);
            })
            .catch(err => {
              //   console.log(err);
            });
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }




}
