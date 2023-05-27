import * as Font from "expo-font";

const Fonts = async () => {
  await Font.loadAsync({
    Raleway_Regular: require("../assets/fonts/Raleway-Regular.ttf"),
    Raleway_Black: require("../assets/fonts/Raleway-Black.ttf"),
    Raleway_BlackItalic: require("../assets/fonts/Raleway-BlackItalic.ttf"),
    Raleway_Bold: require("../assets/fonts/Raleway-Bold.ttf"),
    Raleway_BoldItalic: require("../assets/fonts/Raleway-BoldItalic.ttf"),
    Raleway_ExtraBold: require("../assets/fonts/Raleway-ExtraBold.ttf"),
    Raleway_ExtraBoldItalic: require("../assets/fonts/Raleway-ExtraBoldItalic.ttf"),
    Raleway_ExtraLight: require("../assets/fonts/Raleway-ExtraLight.ttf"),
    Raleway_ExtraLightItalic: require("../assets/fonts/Raleway-ExtraLightItalic.ttf"),
    Raleway_Light: require("../assets/fonts/Raleway-Light.ttf"),
    Raleway_LightItalic: require("../assets/fonts/Raleway-LightItalic.ttf"),
    Raleway_Medium: require("../assets/fonts/Raleway-Medium.ttf"),
    Raleway_MediumItalic: require("../assets/fonts/Raleway-MediumItalic.ttf"),
    Raleway_RegularItalic: require("../assets/fonts/Raleway-RegularItalic.ttf"),
    Raleway_SemiBold: require("../assets/fonts/Raleway-SemiBold.ttf"),
    Raleway_SemiBoldItalic: require("../assets/fonts/Raleway-SemiBoldItalic.ttf"),
    Raleway_Thin: require("../assets/fonts/Raleway-Thin.ttf"),
    Raleway_ThinItalic: require("../assets/fonts/Raleway-ThinItalic.ttf")
  });
};

export default Fonts;
