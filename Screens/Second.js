import React from "react";
import { View, Text, Image, } from "react-native";
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
				<View 
					style={{
						alignItems: "center",
						marginTop: 97,
						marginBottom: 42,
					}}>
					<Text 
						style={{
							color: "#000000",
							fontSize: 24,
							fontWeight: "bold",
						}}>
						{"Bridging the Gap with AI!"}
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/8ah4kh0b.png"}} 
					resizeMode = {"stretch"}
					style={{
						width: 301,
						height: 301,
						marginBottom: 90,
						marginLeft: 57,
					}}
				/>
				<Text 
					style={{
						color: "#000000",
						fontSize: 24,
						fontWeight: "bold",
						marginBottom: 0,
						marginHorizontal: 44,
					}}>
					{"Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all."}
				</Text>
				<View 
					style={{
						alignItems: "flex-end",
						marginBottom: 45,
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/g0yl4tm6.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 85,
                            height: 13,
                            marginTop: 100,
                            marginRight: 155,
                            marginBottom: -50,
						}}
					/>
				</View>
			</View>
		</View>
	)
}
