import ImgToBase64 from 'react-native-image-base64';

export default (Base_64 = (uri) => {
	return new Promise(async function(res, rej) {
		await ImgToBase64.getBase64String(uri)
			.then((base64String) => {
				res(base64String);
				return base64String;
			})
			.catch((err) => {
				res('error');
				return 'error';
			});
	});
});
