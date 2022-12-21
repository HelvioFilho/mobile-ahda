import { PostProps } from "../screens/Home";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Post: {
        data: PostProps;
      }
    }
  }
}