import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet,Button } from "react-native";
export default ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<Text style={styles.text}>
					{"Effortless Communication at Your Fingertips! 🎙️ "}
				</Text>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/ct21qs47.png"}} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<Text style={styles.text2}>
					{"\nConvert text into clear, natural speech and make conversations more accessible for everyone."}
				</Text>
				<View style={styles.view}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/b9w1bwip.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
				</View>
                <Button
                 title="Next"
                  onPress={() => navigation.navigate("Fourth")} // Navigate to "Fourth" page
                  />
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	image: {
		width: 299,
		height: 299,
		marginBottom: 115,
		marginLeft: 57,
	},
	image2: {
		width: 85,
		height: 13,
		marginRight: 30,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#C5C3C3",
	},
	text: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 91,
		marginBottom: 52,
		marginHorizontal: 42,
	},
	text2: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 67,
		marginHorizontal: 42,
	},
	view: {
		alignItems: "flex-end",
		marginBottom: 44,
	},
});