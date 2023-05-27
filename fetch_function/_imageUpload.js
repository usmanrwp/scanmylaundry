import RNFetchBlob from 'rn-fetch-blob';
import Internet_Check from '../functions/Internet_Check';
import Toast_ from '../functions/Toast_';

export default _imageUpload = (url, id, fileName, imageType, base_64) => {
  return new Promise(async function (resolve, reject) {
    const ic_res = await Internet_Check();
    if (ic_res === false || ic_res === 'false') {
      Toast_('No Internet Connection');
      resolve(ic_res.toString());
      return ic_res.toString();
    }

    let my_url = 'https://scanmylaundry.com/api/' + url + '.php';

    await RNFetchBlob.fetch(
      'POST',
      my_url,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // custom content type
        {
          name: 'image',
          filename: fileName,
          type: imageType,
          data: base_64,
        },
        {
          name: 'uemail',
          data: id,
          // uemail: ,
        },
      ],
    )
      .then(resp => {
        resolve(resp.data);
        return resp.data;
      })
      .catch(err => {
        reject(err);
        return err;
      });
  });
};
