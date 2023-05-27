import AsyncStorage from "@react-native-community/async-storage";

export default _retrieveData = async key => {
  return new Promise(async function(res, rej) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        let value_split = value.split('"');
        // alert("key==>" + key + value);
        res(value_split[1]);
        return value_split[1];
        // res(value);
        // return value;
      } else {
        res("Empty_LocalCache");
        return "Empty_LocalCache";
      }
    } catch (error) {
      // Error retrieving data
      rej("Local cache _retrieveData error=>", error);
      console.log("Local cache _retrieveData error=>", error);
    }
  });
};
