import Toast from "react-native-root-toast";

const Toast_ = text => {
  Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER
  });
};
export default Toast_;
