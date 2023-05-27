import AsyncStorage from "@react-native-community/async-storage";

export default _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("id");
    if (value !== null) {
      let value_split = value.split('"');
      return value_split[1];
    } else {
      return "Empty_LocalCache";
    }
  } catch (error) {
    // Error retrieving data
    console.log("Local cache _retrieveData error=>", error);
  }
};
