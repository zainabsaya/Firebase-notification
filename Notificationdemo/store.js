import react,{ Component } from "react";
import PushNotification from "react-native-push-notification";
class AppStore extends Component {
    constructor () {
        PushNotification.configure( {
            onRegister: function ( token ) {
                console.log( "TOKEN:", token );
            },

            onNotification: function ( notification ) {
                console.log( "NOTIFICATION:", notification );
                // notification.finish( PushNotificationIOS.FetchResult.NoData );
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        } );


    }
    testPush  = () =>{
        PushNotification.localNotification({
            title: "My Notification Title", // (optional)
            message: "My Notification Message", // (required)
            
          });
    }
}
 export default AppStore;