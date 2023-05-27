import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default Internet_Check = () => {
  return new Promise(async function(resolve, reject) {
    // const res=await NetInfo.getConnectionInfo
    NetInfo.isConnected.fetch().then(isConnected => {
      resolve(isConnected);
      return isConnected;
    });
  });
};
