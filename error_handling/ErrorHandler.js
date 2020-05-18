import React from "react";
import { Alert } from "react-native";
import ServerErrorScreen from "./ServerErrorScreen";
import * as WebBrowser from "expo-web-browser";
import LoginScreen from "../screens/LoginScreen";

export default class ErrorHandler {
	handleError = async (errorCode) => {
		switch (errorCode) {
			case 500:
				return Alert.alert(
					"Unauthorized",
					"Your session have expired please login in again"
				);
			case 401:
				return Alert.alert(
					"Unauthorized",
					"Your session have expired please login in again"
				);
				break;
			default:
				break;
		}
	};
}
