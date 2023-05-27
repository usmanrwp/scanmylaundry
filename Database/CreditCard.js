import DB from "./DB";

const db = new DB();

export default class CreditCard {
    createTable = () => {
        return new Promise(resolve => {
            //Category Table Start
            db.initDB().then(db => {
                db.transaction(tx => {
                    tx.executeSql(
                        "CREATE TABLE IF NOT EXISTS CreditCard (CardNo, Expiry, CVC,  Name, Address1, Address2, PostalCode, City)"
                    );
                });
            });

            resolve();
        });
    };

    addCategory(prod) {
        // alert(JSON.stringify(prod.CardNo))
        return new Promise(resolve => {
            db.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(
                            "INSERT INTO CreditCard (CardNo, Expiry, CVC,  Name, Address1, Address2, PostalCode, City)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                            [prod.CardNo, prod.Expiry, prod.CVC, prod.Name, prod.Address1, prod.Address2, prod.PostalCode, prod.City]
                        ).then(([tx, results]) => {
                            resolve(results);
                        });
                    })
                        .then(result => {
                            console.warn(result);
                            db.closeDatabase(db);
                        })
                        .catch(err => {
                            console.warn(err);
                        });
                })
                .catch(err => {
                    console.warn(err);
                });
        });
    }

    listCategory() {
        return new Promise(resolve => {
            const products = [];
            db.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql("SELECT * FROM CreditCard", []).then(
                            ([tx, results]) => {
                                // console.log("Query completed");
                                var len = results.rows.length;
                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const { CardNo, Expiry, CVC, Name, Address1, Address2, PostalCode, City } = row;
                                    products.push({ CardNo, Expiry, CVC, Name, Address1, Address2, PostalCode, City });
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

    clearCart = () => {
        return new Promise(resolve => {
            db.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql("DELETE FROM CreditCard")
                            .then(([tx, results]) => {
                                console.warn("results", results);

                                resolve();
                            })
                            .catch(([tx, results]) => {
                                console.warn("results error\n", results);

                                resolve();
                            });
                    })
                        .then(result => {
                            this.closeDatabase(db);
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

    update_card_record(prod) {
        return new Promise(resolve => {
          db.initDB()
            .then(db => {
              db.transaction(tx => {
                tx.executeSql(
                  'UPDATE CreditCard SET Expiry = ?, CVC = ?, Name= ?, Address1=?, Address2=?, PostalCode=?, City=? WHERE CardNo = ?', 
                  [prod.Expiry, prod.CVC, prod.Name, prod.Address1, prod.Address2, prod.PostalCode, prod.City, prod.CardNo]
                ).then(([tx, results]) => {
                  resolve(results);
                });
              })
                .then(result => {
                    console.warn(result);
    
                    db.close();
                })
                .catch(err => {
                    console.warn(err);
                });
            })
            .catch(err => {
                console.warn(err);
            });
        });
      }

}
