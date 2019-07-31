import {createAppContainer, createStackNavigator} from 'react-navigation'
import Login from '../screens/login/Login'
import Home from '../screens/home/Home'

const AppNavigation = createStackNavigator({
    Login:Login,
    Home:Home,
},{
    initialRouteName:'Login',
    headerMode:'none'
})

export default createAppContainer(AppNavigation)