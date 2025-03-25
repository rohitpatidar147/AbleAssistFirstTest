import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Text
                    style={{
                        color: "black",
                        fontSize: 28,
                        marginTop: 87,
                        marginBottom: 24,
                        marginHorizontal: 27,
                    }}
                >
                    {"How can we help you today?"}
                </Text>

                {/* Row 1 */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15,
                        marginLeft: 26,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("TextToSpeech")}>
                        <Image
                            source={{
                                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/2tdz64i6.png",
                            }}
                            resizeMode={"stretch"}
                            style={{ width: 175, height: 175, marginRight: 12 }}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 0,
                                marginLeft: 15,
                            }}
                        >
                            {"Text To Speech"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/007xigo5.png",
                            }}
                            resizeMode={"stretch"}
                            style={{ width: 177, height: 177 }}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 0,
                                marginLeft: 15,
                            }}
                        >
                            {"Speech To Text"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 1,
                        marginHorizontal: 17,
                    }}
                >
                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/d1mjnxqt.png",
                            }}
                            resizeMode={"stretch"}
                            style={{ width: 184, height: 184, marginRight: 12 }}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 15,
                                marginLeft: 25,
                            }}
                        >
                            {"ASL Converter"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/kjxlg9k7.png",
                            }}
                            resizeMode={"stretch"}
                            style={{ width: 180, height: 180, marginVertical: 2 }}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 10,
                                marginLeft: 35,
                            }}
                        >
                            {"Be My Eyes"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* AI Assistant */}
                <TouchableOpacity onPress={() => navigation.navigate("ChatBotScreen")}>
                    <Image
                        source={{
                            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/nufgzu2q.png",
                        }}
                        resizeMode={"stretch"}
                        style={{ width: 183, height: 183, marginBottom: 6, marginLeft: 26 }}
                    />
                    <Text
                        style={{
                            color: "black",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 100,
                            marginLeft: 50,
                        }}
                    >
                        {"AI Assistant"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
