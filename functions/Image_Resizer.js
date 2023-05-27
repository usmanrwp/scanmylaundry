import ImageResizer from "react-native-image-resizer";

export default (Image_Resizer = responseParameter => {
  return new Promise(async function(res, rej) {
    await ImageResizer.createResizedImage(
      responseParameter.uri,
      550,
      550,
      "JPEG",
      100
    )
      .then(response => {
        res(response);
        return response;
      })
      .catch(err => {
        res("error");
        return "error";
      });
  });
});
