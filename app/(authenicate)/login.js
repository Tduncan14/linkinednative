import {
    StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput
} from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


const login = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "White", alignItems: "center" }}>
            <View>
                <Image style={{ width: 150, height: 100, resizeMode: "contain" }} source={{ uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png" }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 12, color: "#041E42" }}> Log in to your Account</Text>
                </View>

                <View style={{marginTop:70}}>
                    <View style={{ flexDirection: "row", alignItems: "center",gap:5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="black" />
                        <TextInput style={{color:"gray",marginVertical:10,width:300
                    }} placeholder="enter your Email" />
                    </View>

                    <View  style={{marginTop:2}}>
                    <View style={{ flexDirection: "row", alignItems: "center",gap:5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <AntDesign  style={{marginLeft:8}} name="lock" size={24} color="black" />
                        <TextInput secureTextEntry={true} style={{color:"gray",marginVertical:10,width:300
                    }} placeholder="enter your password" />
                    </View>
                    </View>


                    <View style={{marginTop:16,flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>
                        <Text>Keep me logged in</Text>
                        <Text>Forgot password</Text>
                    </View>

                
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}



export default login

const styles = StyleSheet.create({

})