import AsyncStorage from "@react-native-community/async-storage";

export default (_deleteData = async key => {
  return new Promise(async function(res, rej) {
    try {
      let ans = await AsyncStorage.removeItem(key);
      res();
      return;
    } catch (error) {
      // Error saving data
      console.log("error ppp=>", error);
      res();
      return;
    }
  });
});
