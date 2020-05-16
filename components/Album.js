import React from "react";
import {
	Alert,
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { Button, Text, ListItem, Rating } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

export default class Artist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.id,
			name: this.props.name,
			image:
				typeof this.props.image === "undefined"
					? "https://www.theyearinpictures.co.uk/images//image-placeholder.png "
					: this.props.image.url,
			artists: this.props.artists,
			release_date: this.props.release_date,
			total_tracks: this.props.total_tracks,
			external_url:
				typeof this.props.external_url === "undefined"
					? ""
					: this.props.external_url,
		};
	}

    openAlbumPreview = async () => {
        await WebBrowser.openBrowserAsync(this.state.external_url)
    }

	render() {
		let state = this.state;
		return (
			<ListItem
				key={state.id}
				title={
					<>
						<Text style={styles.name}>{state.name}</Text>
					</>
				}
				leftAvatar={{
					renderPlaceholderContent: <ActivityIndicator />,
					source: { uri: state.image },
				}}
				subtitle={
                    <>
					<Text>
						{state.artists.map((artist, i) => {
                            let separator = " "
                            if (i + 1 < state.artists.length) {
                                separator = " + "
                            } 
							return artist.name + separator;
						})}
					</Text>
                    <Text>{state.release_date}</Text>
                    <Text>{state.total_tracks} tracks</Text>
                    </>
                }
                onPress={() => {this.openAlbumPreview()}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	name: {
		fontSize: 20,
	},
	followers: {
		fontSize: 15,
		color: "grey",
	},
});
