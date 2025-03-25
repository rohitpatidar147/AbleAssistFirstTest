
import React from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
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
						fontSize: 28,
						marginTop: 87,
						marginBottom: 24,
						marginHorizontal: 27,
					}}>
					{"How can we help you today?"}
				</Text>
				<View 
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 5,
						marginLeft: 26,
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/2tdz64i6.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 175,
							height: 175,
							marginRight: 12,
						}}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/007xigo5.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 177,
							height: 177,
						}}
					/>
				</View>
				<View 
					style={{
						flexDirection: "row",
						marginBottom: 5,
						marginLeft: 35,
					}}>
					<Text 
						style={{
							color: "#000000",
							fontSize: 20,
							fontWeight: "bold",
							marginRight: 27,
						}}>
						{"Text-to-Speech"}
					</Text>
					<Text 
						style={{
							color: "#000000",
							fontSize: 20,
							fontWeight: "bold",
						}}>
						{"Speech-to-Text"}
					</Text>
				</View>
				<View 
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 1,
						marginHorizontal: 17,
					}}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/d1mjnxqt.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 184,
							height: 184,
							marginRight: 12,
						}}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/kjxlg9k7.png"}} 
						resizeMode = {"stretch"}
						style={{
							width: 180,
							height: 180,
							marginVertical: 2,
						}}
					/>
				</View>
				<View 
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 3,
						marginHorizontal: 43,
					}}>
					<Text 
						style={{
							color: "#000000",
							fontSize: 20,
							fontWeight: "bold",
							flex: 1,
						}}>
						{"ASL Converter"}
					</Text>
					<Text 
						style={{
							color: "#000000",
							fontSize: 20,
							fontWeight: "bold",
							marginVertical: 1,
						}}>
						{"Be My Eyes"}
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("ChatBotScreen")}>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/nufgzu2q.png"}} 
					resizeMode = {"stretch"}
					style={{
						width: 183,
						height: 183,
						marginBottom: 6,
						marginLeft: 26,
					}}
				/>
				<Text 
					style={{
						color: "#000000",
						fontSize: 20,
						fontWeight: "bold",
						marginBottom: 117,
						marginLeft: 50,
					}}>
					{"AI Assistant"}
				</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}