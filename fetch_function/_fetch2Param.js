import Internet_Check from "../functions/Internet_Check";
import Toast_ from "../functions/Toast_";

export default (_fetch2Param = (url, y_, z_) => {
	return new Promise(async function (resolve, reject) {


		const ic_res = await Internet_Check();
		if (ic_res === false || ic_res === "false") {
			Toast_("No Internet Connection");
			resolve(ic_res.toString());
			return ic_res.toString();
		}

		let my_url = 'https://scanmylaundry.com/api/' + url + '.php';

		await fetch(my_url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				y: y_,
				z: z_
			})
		})
			.then((response) => response.json())
			.then((responseJson) => {
				// Showing response message coming from server after inserting records.
				resolve(responseJson);
				return responseJson;
			})
			.catch((error) => {
				reject(error);
				return error;
			});
	});
});
