import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import ArtistsScreen from "../screens/ArtistsScreen";
import AlbumsScreen from "../screens/AlbumsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Artists" component={ArtistsScreen} />
			<Stack.Screen
				name="Albums"
				component={AlbumsScreen}
				options={({ route }) => ({ title: route.params.artist })}
			/>
		</Stack.Navigator>
	);
}
