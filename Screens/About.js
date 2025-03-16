import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<Text style={styles.text}>
					{"How can we help you today?"}
				</Text>
				<View style={styles.row}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/ty3vuxsl.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/c1kf8zsw.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
				</View>
				<View style={styles.row2}>
					<Text style={styles.text2}>
						{"Text-to-Speech"}
					</Text>
					<Text style={styles.text3}>
						{"Speech-to-Text"}
					</Text>
				</View>
				<View style={styles.row3}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/njmea5ll.png"}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/e1igyqtn.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<View style={styles.row4}>
					<Text style={styles.text4}>
						{"ASL Converter"}
					</Text>
					<Text style={styles.text5}>
						{"Be My Eyes"}
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/45mrqakr.png"}} 
					resizeMode = {"stretch"}
					style={styles.image5}
				/>
				<Text style={styles.text6}>
					{"AI Assistant"}
				</Text>
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
		width: 175,
		height: 175,
		marginRight: 12,
	},
	image2: {
		width: 177,
		height: 177,
	},
	image3: {
		width: 184,
		height: 184,
		marginRight: 12,
	},
	image4: {
		width: 180,
		height: 180,
		marginVertical: 2,
	},
	image5: {
		width: 183,
		height: 183,
		marginBottom: 6,
		marginLeft: 26,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
		marginLeft: 26,
	},
	row2: {
		flexDirection: "row",
		marginBottom: 5,
		marginLeft: 35,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 1,
		marginHorizontal: 17,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 3,
		marginHorizontal: 43,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#C5C3C3",
	},
	text: {
		color: "#000000",
		fontSize: 28,
		marginTop: 87,
		marginBottom: 24,
		marginHorizontal: 27,
	},
	text2: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 27,
	},
	text3: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
	},
	text4: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		flex: 1,
	},
	text5: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 1,
	},
	text6: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 117,
		marginLeft: 50,
	},
});