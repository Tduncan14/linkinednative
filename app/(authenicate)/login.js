import {
    StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const login = () => {

    const [ email, setEmail ] = useState('');
    const [password, setPassword ] = useState('')
    const router = useRouter();


    useEffect(() => {

        const checkLoginStatus = async () => {
            try{

                const token = await AsyncStorage.getItem("authToken");


                if(token){
                    router.replace('/(tabs)/home');
                }


            }

            catch(err){
                console.log(err)
            }
        }
        checkLoginStatus();

         
        
    },[])

    const handleLogin = () => {
        const user = { 
            email:email,
            password:password
        }

        axios.post("",user).then((response)=> {

        console.log(response)
         
            const token = response.data.token;
            AsyncStorage.setItem("authToken",token)
            router.replace("./(tabs)/home");
        })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "White", alignItems: "center" }}>
            <View>
                <Image style={{ width: 150, height: 100, resizeMode: "contain" }} source={{ uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png" }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 12, color: "#041E42" }}> Log in to your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View
                    
                        style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="black" />
                        <TextInput  value={email} onChangeText={((text) => setEmail(text))} style={{
                            color: "gray", marginVertical: 10, width: 300,fontSize:email? 18 : 18
                        }}
                            placeholder="enter your email" />
                    </View>

                    <View style={{ marginTop: 2 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="black" />
                            <TextInput value={password}   onChangeText={(text)=>setPassword(text)  }secureTextEntry={true} style={{
                                color: "gray", marginVertical: 10, width: 300, fontSize:password? 18: 18
                            }} placeholder="enter your password" />
                        </View>
                    </View>


                    <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text>Keep me logged in</Text>
                        <Text style={{ color: "#007fff" }}>Forgot password ?</Text>
                    </View>

                    {/* ending button */}


                    <View style={{ marginTop: 80 }}>

                        <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: "#0072b1", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Login</Text>
                        </Pressable>


                        <Pressable onPress={() => router.replace('/register')} style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}> Don't have account? Sign up</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}



export default login

const styles = StyleSheet.create({

})