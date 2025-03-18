import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
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
						marginBottom: 6,
						marginHorizontal: 42,
					}}>
					{"\nConvert text into clear, natural speech and make conversations more accessible for everyone."}
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
						}} onPress={()=>navigation.navigate('Fourth')}>
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