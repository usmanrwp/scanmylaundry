import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "../screens/Dashboard";
import Basket from "../screens/Basket";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgetPassword from "../screens/Login/ForgetPassword";
import Profile from "../screens/Profile";
import Verification from "../screens/Verification";
import Order_Place from "../screens/Order_Place";
import Search from "../screens/Search";
import History from "../screens/History";
import BasketCopy from "../screens/BasketCopy";
import HistoryDetails from "../screens/HistoryDetails";
import Payment from "../screens/Payment";
import PaymentBag from "../screens/PaymentBag";
import Bids from "../screens/Bids";
import AgentProfile from "../screens/AgentProfile";
import Feedback from "../screens/Feedback";
import LoginMain from "../screens/Login/LoginMain";
import navScr from "../screens/firstTimeScr/navScr";
import orderScr from "../screens/firstTimeScr/orderScr";
import deliverScr from "../screens/firstTimeScr/deliverScr";
import collectScr from "../screens/firstTimeScr/collectScr";
import cleanScr from "../screens/firstTimeScr/cleanScr";
import welcome_ from "../screens/firstTimeScr/welcome_";
import QrCode from "../screens/QrCode";

import Test from "../screens/Test";

export default createStackNavigator(
  {
    navScr,
    Dashboard,
    welcome_,
    orderScr,
    cleanScr,
    collectScr,
    deliverScr,
    Basket,
    Register,
    Login,
    ForgetPassword,
    Profile,
    Verification,
    Order_Place,
    Search,
    LoginMain,
    History,
    HistoryDetails,
    Payment,
    PaymentBag,
    Bids,
    QrCode,
    BasketCopy,
    AgentProfile,
    Feedback,
    Test
  },
  {
    initialRouteName: "navScr",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
