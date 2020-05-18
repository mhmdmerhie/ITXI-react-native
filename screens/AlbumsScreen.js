import React from "react";
import { Alert, StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Text, SearchBar } from "react-native-elements";
import SpotifyWebApi from "spotify-web-api-js";
import Album from "../components/Album";

let spotify = new SpotifyWebApi();
class AlbumsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            id: props.id,
            artist: props.artist,
            offset: 0,
            dataSource: [],
            loading: false,
		};
	}

	componentDidMount() {
        this.getAlbums();
    }
    
    getAlbums = () => {
		spotify
			.getArtistAlbums(this.state.id, { offset: this.state.offset })
			.then((res) => {
				if (res.items === 0) {
					this.setState({ error: "no results" });
				} else {
					this.setState({
						dataSource: [...this.state.dataSource, ...res.items],
						error: null,
						loading: false,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				switch (err.status) {
					case 401:
						this.setState({ error: "unauthorized" });
						break;
					case 404:
						this.setState({ error: 404 });
						break;
					case 500:
						this.setState({ error: "server" });
					default:
						break;
				}
			});
	};

	loadMore = () => {
		this.setState({ offset: this.state.offset + 20 }, () => {
			this.getAlbums();
		});
	};

    renderFooter = () => {
		if (!this.state.loading) return null;

		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: "#CED0CE",
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	render() {
		return (
			<View>
				<FlatList
					data={this.state.dataSource}
					initialNumToRender={20}
					renderItem={({ item }) => (
						<Album
                        id={item.id}
                        name={item.name}
                        image={item.images[item.images.length - 1]}
                        artists={item.artists}
                        release_date={item.release_date}
                        total_tracks={item.total_tracks}
                        external_url={item.external_urls.spotify}
						></Album>
					)}
					onEndReached={() => {
						this.loadMore();
					}}
					extraData={this.state.dataSource}
					ListFooterComponent={this.renderFooter}
					keyboardDismissMode="on-drag"
				></FlatList>
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

export default function({navigation, route}) {
    return <AlbumsScreen id={route.params.id} artist={route.params.artist} />
}