import React from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";
export default ({navigation}) => {
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
			alignItems: "center",
			marginBottom: 45,
		  }}>
			<TouchableOpacity 
			  style={{
				marginTop: "10",
				backgroundColor: "#D9D9D9",
				borderRadius: 20,
				paddingVertical: 16,
				paddingHorizontal: 25,
			  }} onPress={()=>navigation.navigate('Third')}>
			  <Text 
				style={{
				  color: "#77A600",
				  fontSize: 24,
				  fontWeight: "bold",
				}}>
				{"Next"}
			  </Text>
			</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
