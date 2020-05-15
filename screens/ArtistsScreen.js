import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

export default class ArtistsScreen extends React.Component {

	render() {
		return (
			<View style={styles.container}>
                <Text h1>ARTISTS PAGE!!!</Text>
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
