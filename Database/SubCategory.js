import DB from "./DB";

const db = new DB();

export default class SubCategory {
  createTable = () => {
    return new Promise(resolve => {
      //Category Table Start

      db.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Sub_Categories (OID, Name, Picture, Type, status)"
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
              "INSERT INTO Sub_Categories (Item_Id,C_ID, Name, Picture, Detail,Price, status)  VALUES (?,?, ?, ?, ?,?, ?)",
              [
                prod.ID,
                prod.C_ID,
                prod.Name,
                encodeURI(prod.Picture),
                prod.Detail,
                prod.Price,
                prod.status,
              ]
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

  allSubCategory() {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM Sub_Categories").then(
              ([tx, results]) => {
                // console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  // console.warn(`Prod ID: ${row.Item_Id}`);
                  const {
                    ID,
                    Item_Id,
                    C_ID,
                    Name,
                    Picture,
                    Detail,
                    Price,
                    status
                  } = row;
                  products.push({
                    ID,
                    Item_Id,
                    C_ID,
                    Name,
                    Picture,
                    Detail,
                    Price,
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

  listSubCategory(id) {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT sc.*,c.Quantity as cart  FROM Sub_Categories as sc LEFT JOIN Cart as c ON sc.Item_Id=c.Item_Id WHERE sc.C_ID =? AND status = ? ",
              [id, "1"]
            ).then(([tx, results]) => {
              // console.log("Query completed");
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.warn(`Prod ID: ${row.Item_Id}`);
                const {
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Picture,
                  Detail,
                  Price,
                  cart,
                  status
                } = row;
                products.push({
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Picture,
                  Detail,
                  Price,
                  cart,
                  status
                });
              }
              resolve(products);
            });
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

  countRows = async () => {
    return new Promise(resolve => {
      let len = 0;
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT ID FROM Sub_Categories").then(
              ([tx, results]) => {
                // console.log("Query completed");
                len = results.rows.length;

                resolve(len);
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
  };

  listAllSubCategorywithQuantityTotalPrice() {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT sc.ID,sc.Item_Id,sc.C_ID,sc.Name,sc.Picture,sc.Detail,sc.Price,c.Quantity,c.Total_Price FROM Sub_Categories as sc LEFT JOIN CART as c ON sc.Item_Id=c.Item_Id"
            ).then(([tx, results]) => {
              // console.log("Query completed");

              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);

                const {
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Picture,
                  Detail,
                  Price,
                  Quantity,
                  Total_Price,
                  status
                } = row;
                products.push({
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Picture,
                  Detail,
                  Price,
                  Quantity,
                  Total_Price,
                  status
                });
              }
              resolve(products);
            });
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
