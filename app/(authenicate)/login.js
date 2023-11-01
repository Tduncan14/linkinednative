import {StyleSheet, Text, View,SafeAreaView,Image
} from 'react-native';
import React from 'react';


const login = () => {

    return(
        <SafeAreaView style={{flex:1,backgroundColor:"White",alignItems:"center"}}>
            <View>
                <Image style={{width:150, height:100, resizeMode:"contain"}} source={{uri:"https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"}} />
            </View>
        </SafeAreaView>
    )
}



export default login

const styles = StyleSheet.create({
    
})