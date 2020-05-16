import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import SpotifyWebApi from "spotify-web-api-js";

let spotify = new SpotifyWebApi();
export default class LoginScreen extends React.Component {
	state = {
		result: null,
	};

	componentDidMount() {
		Linking.addEventListener("url", (url) => {this.handleUrlChange(url.url)});
	}

	componentWillUnmount() {
		Linking.removeEventListener("url", (url) => {this.handleUrlChange(url.url)});
	}

	handleUrlChange = (url) => {
		let hash = url.toString();
		let token = hash.split("&")[0].split("=")[1];
		spotify.setAccessToken(token);
		const { navigate } = this.props.navigation;
		navigate('Artists')
	};

	login = async () => {
		let result = await WebBrowser.openBrowserAsync(
			"https://accounts.spotify.com/authorize?client_id=07bf4452c6e048a08f5ab7f6d00d16fc&redirect_uri=exp://192.168.0.111:19000&scope=user-read-private%20user-read-email&response_type=token&state=123"
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="Login" type="outline" onPress={this.login} />
				<Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
