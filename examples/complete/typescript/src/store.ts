import { FirebaseReducer } from "react-redux-firebase";
import { compose, createStore } from "redux";
import rootReducer from "./reducer.js";

export interface SystemState {
  firebase: FirebaseReducer.Reducer;
}

export default function configureStore(initialState?: any, history?: any) {
  const createStoreWithMiddleware = compose(
    typeof window === "object"
    && typeof (window as any).devToolsExtension !== "undefined"
    ? () => (window as any).__REDUX_DEVTOOLS_EXTENSION__
    : (f: any) => f,
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept("./reducer", () => {
      const nextRootReducer = require("./reducer.js");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
