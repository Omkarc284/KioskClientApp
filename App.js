import { createAppContainer,  createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MyMap from './src/screens/location';
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import InventoryScreen from "./src/screens/InventoryScreen"
import SaleScreen from "./src/screens/SaleScreen";
import DashboardScreen from "./src/screens/DashboardScreen"
import AddInventory from "./src/screens/AddInventory";
import AddSale from "./src/screens/AddSale";
import FaceLogin from "./src/screens/FaceLogin";
import RatingScreen from "./src/screens/Review";
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from "./src/navigationRef";
import { navigate } from "./src/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

SplashScreen.preventAutoHideAsync();

const navigator = createSwitchNavigator(
  {
    ResolveAuth : ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Welcome: {
        title: "Welcome",
        screen: MyMap,
        navigationOptions: {
          headerShown: false
        }
      },
      // Authenticate: FaceLogin,
      Login: LoginScreen
    }),
    mainFlow: createStackNavigator({
      Home: HomeScreen,
      Inventory: InventoryScreen,
      Sale: SaleScreen,
      Dashboard: DashboardScreen,
      'Add Inventory': AddInventory,
      'Create Sale': AddSale,
      Ratings: RatingScreen
    })
    
  },
  // {
  //   initialRouteName: "Login",
    
  // }
);

const App = createAppContainer(navigator);

export default () => {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        
        
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        setTimeout(() => {}, 2000);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);
  return (
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)}} />
    </AuthProvider>
  )
}