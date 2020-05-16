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
import { useNavigation } from "@react-navigation/native";

class Artist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			name: props.name,
			image:
				typeof props.image === "undefined"
					? "https://www.theyearinpictures.co.uk/images//image-placeholder.png "
					: props.image.url,
			followers: props.followers,
			popularity: props.popularity,
			uri: props.uri,
			getAlbums: false,
		};
    }
    
    getAlbums = () => {
        const { navigation } = this.props;
        navigation.navigate("Albums", {id: this.state.id, artist: this.state.name})
    }

	render() {
        let state = this.state;
		return (
			<ListItem
				key={state.id}
				title={
					<>
						<Text style={styles.name}>{state.name}</Text>
						<Rating
							imageSize={15}
							startingValue={(state.popularity * 1.0) / 20}
							style={{ alignItems: "flex-start" }}
							readonly={true}
						/>
					</>
				}
				leftAvatar={{
					renderPlaceholderContent: <ActivityIndicator />,
                    source: { uri: state.image },
				}}
				subtitle={
					<Text style={styles.followers}>
						{state.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
						followers
					</Text>
                }
                onPress={() => {this.getAlbums()}}
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
        color: "grey"
    }
});

export default function(props) {
    const navigation = useNavigation();
    return <Artist {...props} navigation={navigation} />
}
