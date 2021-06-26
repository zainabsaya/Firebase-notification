
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import PushNotification from "react-native-push-notification";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';

const App = () =>{
  const [notification,setnotification] =useState ({title:undefined,body:undefined,Image:undefined})
const getToken = async ()=>{
 const token = await messaging().getToken();
 console.log("..................",token);
}
  useEffect(() => {
    getToken();
     messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        setnotification({
          title:remoteMessage.notification.title,
          body:remoteMessage.notification.body,
          Image:remoteMessage.notification.android.imageUrl,
        })

    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'onNotificationOpenedApp:',
        JSON.stringify(remoteMessage)
      );
      setnotification({
        title:remoteMessage.notification.title,
        body:remoteMessage.notification.body,
        Image:remoteMessage.notification.android.imageUrl,
      })
    });


    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage)
        );
        setnotification({
          title:remoteMessage.notification.title,
          body:remoteMessage.notification.body,
          Image:remoteMessage.notification.android.imageUrl,
        })
      }
    });
}, []);
      return(
        <View>
          <Text>Hello</Text>
          <Text>{`title:${notification?.title}`}</Text>
          <Text>{`title:${notification?.body}`}</Text>
          <Image 
            source={{url:notification?.Image}}
            width ={500}
            height= {500}
          />
        </View>
      )
  }
export default App;
