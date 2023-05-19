import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/Signin';
import NewUser from '../pages/NewUser';
import Devices from '../pages/Devices';
import NewDevice from '../pages/NewDevice';
import Details from '../pages/Details';

const Stack = createNativeStackNavigator();

export default function Routes () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}/>

            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}/> 

            <Stack.Screen
                name="NewUser"
                component={NewUser}
                options={{headerShown: false}}/> 

            <Stack.Screen
                name="Devices"
                component={Devices}
                options={{headerShown: false}}/>

            <Stack.Screen
                name="NewDevice"
                component={NewDevice}
                options={{headerShown: false}}/>  

            <Stack.Screen
                name="Details"
                component={Details}
                options={{headerShown: false}}/>  
        </Stack.Navigator>
    )
}