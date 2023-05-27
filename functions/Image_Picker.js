import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

export default Image_Picker = type => {
  return new Promise(async function(resolve, reject) {
    console.warn("TYPE", type);
    if (type.toLowerCase() === "gallery") {
    console.warn("galleryyy");
    //start of gallery
      ImagePicker.openPicker({
        width: 250,
        height: 250,
        cropping: true,
        mediaType: "photo",
        compressImageQuality: 0.7,
        compressImageMaxWidth: 250,
        compressImageMaxHeight: 250,
        includeBase64: true,
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true
      })
        .then(image => {
          resolve(image);
        })
        .catch(err => {
          let a = err.toString().toLowerCase();
          if (a.includes("error: user cancelled image selection"))
            resolve("cancel");

            console.warn("errrrrrrr ",err);
        });
    } //end of gallery

    //start of camera
    else if (type.toLowerCase() === "camera") {
      console.warn("andr h");


      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //   {
      //   title: 'We need your permission'
      //   },
      //   );
      //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {

         ImagePicker.openCamera({
        width: 250,
        height: 250,
        cropping: true,
        compressImageQuality: 0.7,
        compressImageMaxWidth: 250,
        compressImageMaxHeight: 250,
        useFrontCamera: true,
        includeBase64: true,
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true
      })
        .then(image => {
          resolve(image);
        })
        .catch(err => {
          console.warn("errorr", err);

          let a = err.toString().toLowerCase();
          if (a.includes("error: user cancelled image selection"))
            resolve("cancel");
        });

        // }

    } //end of camera
    else {
      resolve(false);
    }
  });
};
