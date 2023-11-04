import {StyleSheet,Text,View,SafeAreaView,Pressable,TextInput,Image,KeyboardAvoidingView,Alert} from 'react-native';
import React,{useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import {useRouter} from 'expo-router';
import axios from 'axios';
 


const register = () => {
 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const router = useRouter()


    const handleRegister= async ()=> {

        const user = {
            name:name,
            email:email,
            password:password,
            profileImage:image
        }

        axios.post("http://ip-config:8000/register",user).then((response) => {

        console.log(response);

        Alert.alert("Registration successful, you have been register")

        // reseting the state after sending
        setName("")
        setEmail("")
        setPassword("")
        setImage("")
        })
        .catch(err => {
            Alert.alert("Registration failed");
            console.log('this is the error',err)
        })
           
        


         

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "White", alignItems: "center", marginTop:-8 }}>
            <View>
                <Image style={{ width: 150, height: 100, resizeMode: "contain" }} source={{ uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png" }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Register your account</Text>
                </View>

                <View style={{  }}>
                    <View
                        value={name}
                        style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <Ionicons  style={{marginLeft:8}} name="person" size={24} color="black" />
                        <TextInput 
                        onChangeText={(text) => setName(text)} style={{
                            color: "gray", marginVertical: 10, width: 300,fontSize:name? 18 : 18
                        }}
                            placeholder="set username" />
                    </View>


                    <View
                        value={email}
                       
                        style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="black" />
                        <TextInput
                         onChangeText={(text) => setEmail(text)}
                         style={{
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



                    <View
                        value={image}
                        onChangeText={(text) => setImage(text)}
                        style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                       <AntDesign style={{marginLeft:8}} name="camera" size={24} color="black" />
                        <TextInput  style={{
                            color: "gray", marginVertical: 10, width: 300,fontSize:email? 18 : 18
                        }}
                            placeholder="post image" />
                    </View>




                

                    <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text>Have account already?</Text>
                       <Pressable onPress={()=>router.replace('/login')} ><Text style={{ color: "#007fff" }}> Login </Text></Pressable> 
                    </View>

                    {/* ending button */}


                    <View style={{ marginTop: 80 }}>

                        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#0072b1", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Register</Text>
                        </Pressable>

{/* 
                        <Pressable onPress={() => router.replace('/login')} style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}> Have an account already ?</Text>
                        </Pressable> */}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


export default register

const styles = StyleSheet.create({
    
})