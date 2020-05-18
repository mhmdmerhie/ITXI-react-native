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
	SafeAreaView,
} from "react-native";
import { Button, Text, SearchBar } from "react-native-elements";
import Artist from "../components/Artist";
import SpotifyWebApi from "spotify-web-api-js";
import ErrorHandler from "../error_handling/ErrorHandler";

let spotify = new SpotifyWebApi();

export default class ArtistsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			searchTerm: "",
			dataSource: [],
			getAlbums: false,
			offset: 0,
			timeout: 0,
			error: null,
			loading: false,
		};
	}

	componentDidMount() {
		this.timer = null;
	}

	handleChange = (term) => {
		this.setState({
			searchTerm: term,
			dataSource: [],
			offset: 0,
			error: null,
			loading: false,
		});
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (this.state.searchTerm.trim() !== "") this.search();
		}, 1000);
	};

	search = () => {
		let searchTerm = this.state.searchTerm;
		this.setState({ loading: true });
		spotify
			.searchArtists(searchTerm, { offset: this.state.offset })
			.then((res) => {
				if (res.artists.items.length === 0 && this.state.offset === 0) {
					this.setState({ error: "no results" });
				} else {
					this.setState({
						dataSource: [...this.state.dataSource, ...res.artists.items],
						error: null,
						loading: false,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				let errorHandler = new ErrorHandler();
				errorHandler.handleError(err.status);
			});
	};

	loadMore = () => {
		this.setState({ offset: this.state.offset + 20 }, () => {
			this.search();
		});
	};

	render() {
		return (
			<View>
				<SearchBar
					placeholder="Search for an artist"
					onChangeText={(term) => this.handleChange(term)}
					platform="android"
					value={this.state.searchTerm}
					showLoading={this.state.loading}
				/>
				{this.state.error === "no results" ? (
					<View style={styles.container}>
						<Text h4>No Results Found</Text>
					</View>
				) : (
					<SafeAreaView>
						<FlatList
							data={this.state.dataSource}
							initialNumToRender={20}
							renderItem={({ item }) => (
								<Artist
									id={item.id}
									name={item.name}
									image={item.images[item.images.length - 1]}
									followers={item.followers.total}
									popularity={item.popularity}
									uri={item.uri}
								></Artist>
							)}
							onEndReached={() => {
								this.loadMore();
							}}
							extraData={this.state.dataSource}
							keyboardDismissMode="on-drag"
							contentContainerStyle={{paddingBottom: 40}}
						></FlatList>
					</SafeAreaView>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
	},
});
