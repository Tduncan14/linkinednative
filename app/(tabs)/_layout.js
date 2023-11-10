import {Tabs} from "expo-router"
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 


export default function Layout (){


  return(
    <Tabs>
        <Tabs.Screen name="home" options={{tabBarLabel:"Home",
         tabBarLabelStyle:{color:"#008e97"},
         headerShown:false,tabBarIcon:({focused}) => focused? (
            <Entypo name="home" size={24} color="black" />
         ):(
            <AntDesign name="home" size={24} color="black" />
         )}} />


  <Tabs.Screen name="network" options={{tabBarLabel:"Network",
         tabBarLabelStyle:{color:"#008e97"},
         headerShown:false,tabBarIcon:({focused}) => focused? (
            <Ionicons name="people" size={24} color="black" />
         ):(
            <Ionicons name="people-outline" size={24} color="black" />
         )}} />


    <Tabs.Screen name="post" options={{tabBarLabel:"Post",
         tabBarLabelStyle:{color:"#008e97"},
         headerShown:false,tabBarIcon:({focused}) => focused? (
            
            <AntDesign name="plussquare" size={24} color="black" />
         ):(
            <AntDesign name="plussquareo" size={24} color="black" />
         )}} />
    </Tabs>
  )


}












// import {Stylesheet,Text,View} from 'react-native';
// import React from 'react';


// const _layout = () => {


//     return (
//         <View>
//             <Text>_layout</Text>
//         </View>
//     )
//     }


// export default _layout


// const styles = StyleSheet.create({

// })


