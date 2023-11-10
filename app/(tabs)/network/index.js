import {StyleSheet, Text, View} from 'react-native';
import  React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';



const index = () => { 
    
    const [userId, setUserId] = useState('')

   
     useEffect(()=>{

        const fetchUser =  async () => {
            const token = await AsyncStorage.getItem('authToken');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId)
        }

        

     },[])
    

    return (
        <View>
            <Text>index </Text>
        </View>
    )
}



export default index

const styles = StyleSheet.create({

})