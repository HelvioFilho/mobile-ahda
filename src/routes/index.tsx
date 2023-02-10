import { NavigationContainer } from "@react-navigation/native";
import { BottomRoute } from "./app.routes";

export function Routes(){
  return (
    <NavigationContainer>
      <BottomRoute />
    </NavigationContainer>
  )
}