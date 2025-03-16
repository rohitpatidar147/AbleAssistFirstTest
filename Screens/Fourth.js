import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
export default ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<Text style={styles.text}>
					{"Seamlessly Transform Speech into Text! 🗣️ "}
				</Text>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/8y1d0onn.png"}} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<Text style={styles.text2}>
					{"Instantly convert your voice into written words for effortless communication."}
				</Text>
				<Text style={styles.text3}>
					{"And that's just the beginning—explore many more features designed to make life easier for you!"}
				</Text>
				<View style={styles.view}>
					<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
						<Text style={styles.text4}>
							{"Get Started"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	button: {
		backgroundColor: "#D9D9D9",
		borderRadius: 20,
		paddingVertical: 16,
		paddingHorizontal: 25,
	},
	image: {
		width: 285,
		height: 285,
		marginBottom: 48,
		marginLeft: 45,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#C4C5C3",
	},
	text: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 81,
		marginBottom: 28,
		marginHorizontal: 46,
	},
	text2: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 38,
		marginHorizontal: 29,
	},
	text3: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 28,
		marginHorizontal: 30,
	},
	text4: {
		color: "#77A600",
		fontSize: 24,
		fontWeight: "bold",
	},
	view: {
		alignItems: "center",
		marginBottom: 29,
	},
});