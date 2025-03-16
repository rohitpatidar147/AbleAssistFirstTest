import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, Button} from "react-native";
export default ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.view}>
					<Text style={styles.text}>
						{"Bridging the Gap with AI!"}
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/bc0ws1qa.png"}} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<Text style={styles.text2}>
					{"Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all."}
				</Text>
				<View style={styles.view2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/r6lmeyfq.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
				</View>
                <Button
                          title="Next"
                          onPress={() => navigation.navigate("Third")} // Navigate to "Third" page
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
		width: 301,
		height: 301,
		marginBottom: 90,
		marginLeft: 57,
	},
	image2: {
		width: 85,
		height: 13,
		marginRight: 44,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#C5C3C3",
	},
	text: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
	},
	text2: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 66,
		marginHorizontal: 44,
	},
	view: {
		alignItems: "center",
		marginTop: 97,
		marginBottom: 42,
	},
	view2: {
		alignItems: "flex-end",
		marginBottom: 43,
	},
});