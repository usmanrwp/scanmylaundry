import AsyncStorage from "@react-native-community/async-storage";

export default _storeData = async id => {
  try {
    await AsyncStorage.setItem("id", JSON.stringify(id))
      .then(jsonData => {})
      .catch(error => {
        // Error saving data
        console.log("Local Cache _storeData Error=> ", error);
      });
  } catch (error) {
    // Error saving data
    console.log("Local Cache _storeData Error=> ", error);
  }
};
