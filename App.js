import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const App = () => {
    return (
        <HomeScreen />
    );
};

export default React.memo(App)