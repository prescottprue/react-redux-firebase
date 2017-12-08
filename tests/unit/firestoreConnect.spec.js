import React, { Children, Component, cloneElement } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import reactReduxFirebase from "../../src/enhancer";
import { createStore, compose, combineReducers } from "redux";
import firestoreConnect, {
  createFirestoreConnect
} from "../../src/firestoreConnect";

describe("firestoreConnect", () => {
  class Passthrough extends Component {
    render() {
      return <div>{JSON.stringify("yes")}</div>;
    }
  }

  class ProviderMock extends Component {
    getChildContext() {
      return { store: this.props.store };
    }

    state = { test: null, dynamic: "" };

    render() {
      return Children.only(
        cloneElement(this.props.children, {
          testProp: this.state.test,
          dynamicProp: this.state.dynamic
        })
      );
    }
  }

  ProviderMock.childContextTypes = {
    store: PropTypes.object.isRequired
  };

  ProviderMock.propTypes = {
    store: PropTypes.object,
    children: PropTypes.node
  };
  const fakeReduxFirestore = (instance, otherConfig) => next => (
    reducer,
    initialState,
    middleware
  ) => {
    const store = next(reducer, initialState, middleware);
    store.firestore = { listeners: {} };
    return store;
  };

  const createContainer = () => {
    const createStoreWithMiddleware = compose(
      reactReduxFirebase(Firebase, { userProfile: "users" }),
      fakeReduxFirestore(Firebase)
    )(createStore);
    const store = createStoreWithMiddleware(
      combineReducers({ firestore: (state = {}) => state })
    );

    @firestoreConnect(props => [`test/${props.dynamicProp}`])
    class Container extends Component {
      render() {
        return <Passthrough {...this.props} />;
      }
    }

    const tree = TestUtils.renderIntoDocument(
      <ProviderMock store={store}>
        <Container pass="through" />
      </ProviderMock>
    );

    return {
      container: TestUtils.findRenderedComponentWithType(tree, Container),
      parent: TestUtils.findRenderedComponentWithType(tree, ProviderMock),
      store
    };
  };

  it("should receive the store in the context", () => {
    const { container, store } = createContainer();
    expect(container.context.store).to.equal(store);
  });

  it("disables watchers on unmount", () => {
    const { container, store } = createContainer();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(container).parentNode);
    expect(container.context.store).to.equal(store);
  });

  it("does not change watchers props changes that do not change listener paths", () => {
    const { container, store } = createContainer();
    container.setState({ test: "somethingElse" });
    expect(container.context.store).to.equal(store);
  });

  it("reapplies watchers when props change", () => {
    const { container, store } = createContainer();
    container.setState({
      dynamic: "somethingElse"
    });
    expect(container.context.store).to.equal(store);
  });

  describe("sets displayName static as ", () => {
    describe("FirestoreConnect(${WrappedComponentName}) for", () => {
      // eslint-disable-line no-template-curly-in-string
      it("standard components", () => {
        class TestContainer extends Component {
          render() {
            return <Passthrough {...this.props} />;
          }
        }

        const containerPrime = firestoreConnect()(TestContainer);
        expect(containerPrime.displayName).to.equal(
          `FirestoreConnect(TestContainer)`
        );
      });

      it("string components", () => {
        const str = "Test";
        const stringComp = firestoreConnect()("Test");
        expect(stringComp.displayName).to.equal(`FirestoreConnect(${str})`);
      });
    });

    it('"Component" for all other types', () => {
      const stringComp = firestoreConnect()(<div />);
      expect(stringComp.displayName).to.equal("FirestoreConnect(Component)");
    });
  });

  it("sets WrappedComponent static as component which was wrapped", () => {
    class Container extends Component {
      render() {
        return <Passthrough {...this.props} />;
      }
    }

    const containerPrime = firestoreConnect()(Container);
    expect(containerPrime.wrappedComponent).to.equal(Container);
  });
});

describe("createFirestoreConnect", () => {
  it("creates a function", () => {
    expect(createFirestoreConnect("store")).to.be.a.function;
  });
});
