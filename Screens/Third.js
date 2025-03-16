import React from "react";
import { View, ScrollView, Text, Image, } from "react-native";
export default (props) => {
	return (
		<View 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<View  
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
				}}>
				<Text 
					style={{
						color: "#000000",
						fontSize: 24,
						fontWeight: "bold",
						marginTop: 91,
						marginBottom: 52,
						marginHorizontal: 42,
					}}>
					{"Effortless Communication at Your Fingertips! 🎙️ "}
				</Text>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/pfs5h9wi.png"}} 
					resizeMode = {"stretch"}
					style={{
						width: 299,
						height: 299,
						marginBottom: 115,
						marginLeft: 57,
					}}
				/>
				<Text 
					style={{
						color: "#000000",
						fontSize: 24,
						fontWeight: "bold",
						marginBottom: 67,
						marginHorizontal: 42,
					}}>
					{"\nConvert text into clear, natural speech and make conversations more accessible for everyone."}
				</Text>
				<View 
					style={{
						alignItems: "flex-end",
						marginBottom: 44,
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/3xk1w1go.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 85,
                            height: 13,
                            marginTop: -10,
                            marginRight: 155,
                            marginBottom: 50,
						}}
					/>
				</View>
			</View>
		</View>
	)
}