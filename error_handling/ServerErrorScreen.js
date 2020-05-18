import React from "react";
import {
	Alert,
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	ActivityIndicator,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, SearchBar } from "react-native-elements";

export default class ServerErrorScreen extends React.Component {

	componentDidMount() {
		console.log("500")
	}
	render() {
		return (
			<View>
				<Text>Something went wrong please try again later</Text>
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
