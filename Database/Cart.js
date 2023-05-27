import DB from "./DB";

const db = new DB();

export default class Cart {
  addItem(Item_Id, C_ID, Name, Price) {
    return new Promise(resolve => {
      db.initDB()
        .then(async db => {
          let totalQuantity = 0;
          let len = 0;
          let totalPrice = 0;
          const st = "SELECT * FROM Cart where Item_Id = " + Item_Id;

          await db.transaction(tx => {
            tx.executeSql(st).then(([tx, results]) => {
              len = results.rows.length;

              if (len > 0) {
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  const { Quantity } = row;
                  totalQuantity = Number(Quantity) + 1;
                  totalPrice = Number(Price) * Number(totalQuantity);
                }
              } else {
                totalQuantity = 1;
                totalPrice = Price;
              }
            });
          });
          if (len > 0) {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  "UPDATE Cart SET Quantity = ?, Total_Price = ? WHERE Item_Id = ?",
                  [totalQuantity, totalPrice, Item_Id]
                )
                .then(([tx, results]) => {
                  //   resolve(totalPrice + "~" + totalQuantity);
                });
            });
          } else {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  "INSERT INTO Cart(Item_Id,C_ID, Name, Price,Quantity,Total_Price)  VALUES (?, ?, ?, ?,?,?)",
                  [Item_Id, C_ID, Name, Price, totalQuantity, totalPrice]
                )
                .then(([tx, results]) => {
                  //   resolve(totalPrice + "~" + totalQuantity);
                });
            });
          }

          const allPriceTotalQuery =
            "SELECT SUM(Total_Price) AS Total_Price from Cart";
          await db.transaction(tx => {
            tx.executeSql(allPriceTotalQuery).then(([tx, results]) => {
              resolve(results.rows.item(0).Total_Price + "~" + totalQuantity);
            });
          });

          // .then(result => {
          //   //   console.warn(result);

          //   db.closeDatabase(db);
          // })
          // .catch(err => {
          //   //   console.warn(err);
          // });
        })
        .catch(err => {
          //   console.warn(err);
        });
    });
  }

  removeItem(Item_Id, C_ID) {
    return new Promise(resolve => {
      db.initDB()
        .then(async db => {
          let totalQuantity = 0;
          let len = 0;
          let totalPrice = 0;
          const st = "SELECT * FROM Cart where Item_Id = " + Item_Id;
          await db.transaction(tx => {
            tx.executeSql(st).then(([tx, results]) => {
              len = results.rows.length;

              if (len > 0) {
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  const { Quantity, Total_Price, Price } = row;
                  if (Quantity === 1) {
                    totalQuantity = 0;
                    totalPrice = 0;
                  } else {
                    totalQuantity = Number(Quantity) - 1;
                    totalPrice = Number(Total_Price) - Number(Price);
                  }
                }
              } else {
                resolve(0 + "~" + 0);
              }
            });
          });
          if (totalQuantity === 0) {
            db.transaction(async tx => {
              const delete_query = "DELETE FROM Cart where Item_Id=" + Item_Id;
              await tx.executeSql(delete_query).then(([tx, results]) => {
                //   resolve(totalPrice + "~" + totalQuantity);
              });
            });
          } else {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  "UPDATE Cart SET Quantity = ?, Total_Price = ? WHERE Item_Id = ?",
                  [totalQuantity, totalPrice, Item_Id]
                )
                .then(([tx, results]) => {
                  //   resolve(totalPrice + "~" + totalQuantity);
                });
            });
          }

          const allPriceTotalQuery =
            "SELECT SUM(Total_Price) AS Total_Price from Cart";
          await db.transaction(tx => {
            tx.executeSql(allPriceTotalQuery).then(([tx, results]) => {
              resolve(results.rows.item(0).Total_Price + "~" + totalQuantity);
            });
          });

          // .then(result => {
          //   //   console.warn(result);

          //   db.closeDatabase(db);
          // })
          // .catch(err => {
          //   //   console.warn(err);
          // });
        })
        .catch(err => {
          //   console.warn(err);
        });
    });
  }

  totalPrice = () => {
    return new Promise(resolve => {
      db.initDB()
        .then(async db => {
          const allPriceTotalQuery =
            "SELECT SUM(Total_Price) AS Total_Price from Cart";
          await db
            .transaction(tx => {
              tx.executeSql(allPriceTotalQuery).then(([tx, results]) => {
                if (results.rows.length > 0) {
                  resolve(results.rows.item(0).Total_Price);
                } else {
                  resolve(0);
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

  cartSelect = () => {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          const st = "SELECT * FROM Cart";
          db.transaction(tx => {
            tx.executeSql(st).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Price,
                  Quantity,
                  Total_Price
                } = row;
                products.push({
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Price,
                  Quantity,
                  Total_Price
                });
              }
              resolve(products);
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

  cartQuantity = Item_Id => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          const st = "SELECT * FROM Cart where Item_Id = " + Item_Id;
          db.transaction(tx => {
            tx.executeSql(st).then(([tx, results]) => {
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                console.warn(row);
                resolve(row.Quantity);
              } else {
                resolve(0);
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

  cartItemTotalPrice = Item_Id => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM Cart WHERE Item_Id = ?", [
              Item_Id
            ]).then(([tx, results]) => {
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                const { Total_Price } = row;
                resolve(Total_Price);
              } else {
                resolve(0);
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

  cartList() {
    return new Promise(resolve => {
      const products = [];
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT c.Name,c.ID, c.Item_Id,c.C_ID,c.Name,c.Price,c.Quantity,c.Total_Price,a.Picture,a.Item_Id as SC_ID FROM Cart as c INNER JOIN Sub_Categories as a ON c.Item_Id=a.Item_Id"
            ).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.warn(`Prod ID: ${row.SC_ID}`);
                const {
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Price,
                  Quantity,
                  Total_Price,
                  Picture,
                  SC_ID
                } = row;
                products.push({
                  ID,
                  Item_Id,
                  C_ID,
                  Name,
                  Price,
                  Quantity,
                  Total_Price,
                  Picture,
                  SC_ID
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

  clearCart = () => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("DELETE FROM Cart")
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

  totalCartItems = () => {
    return new Promise(resolve => {
      db.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT SUM(Quantity) AS Quantity from Cart").then(
              ([tx, results]) => {
                
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  const { Quantity } = row;
                  resolve(Quantity);
                } else {
                  resolve(0);
                }
              }
            );
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
