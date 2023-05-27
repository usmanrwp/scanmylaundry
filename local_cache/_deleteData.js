import AsyncStorage from '@react-native-community/async-storage';

export default (_deleteData = async () => {
	try {
		let ans = await AsyncStorage.clear();
	} catch (error) {
		// Error saving data
		console.log('error ppp=>', error);
	}
});
