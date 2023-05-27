import AsyncStorage from "@react-native-community/async-storage";

export default (_storeData = async (key, valule) => {
  return new Promise(async function(res, rej) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(valule))
        .then(jsonData => {
          console.log("return add");
          res();
        })
        .catch(error => {
          // Error saving data
          console.log("Local Cache _storeData Error=> ", error);
          res();
        });
    } catch (error) {
      // Error saving data
      res();
      console.log("Local Cache _storeData Error=> ", error);
    }
  });
});
