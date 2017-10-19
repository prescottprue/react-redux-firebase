## FAQ

1. How is this different than [`redux-react-firebase`](https://github.com/tiberiuc/redux-react-firebase)?

    This library was actually originally forked from redux-react-firebase, but adds extended functionality such as:
    * [populate functionality](http://react-redux-firebase.com/docs/populate) (similar to mongoose's `populate` or SQL's `JOIN`)
    * `react-native` support ([web/js](http://react-redux-firebase.com/docs/recipes/react-native.html) or native modules through [`react-native-firebase`](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules))
    * tons of [integrations](#integrations)
    * [`profileFactory`](http://react-redux-firebase.com/docs/config) - change format of profile stored on Firebase
    * [`getFirebase`](http://react-redux-firebase.com/docs/thunks) - access to firebase instance that fires actions when methods are called
    * [access to firebase's `storage`](http://react-redux-firebase.com/docs/storage) and `messaging` services
    * `uniqueSet` method helper for only setting if location doesn't already exist
    * Object or String notation for paths (`[{ path: '/todos' }]` equivalent to `['/todos']`)
    * Action Types and other Constants are exposed for external usage (such as with `redux-observable`)
    * Server Side Rendering Support
    * [Complete Firebase Auth Integration](http://react-redux-firebase.com/docs/auth.html#examples) including `signInWithRedirect` compatibility for OAuth Providers

    #### Well why not combine?
    I have been talking to the author of [redux-react-firebase](https://github.com/tiberiuc/redux-react-firebase) about combining, but we are not sure that the users of both want that at this point. Join us on the [redux-firebase gitter](https://gitter.im/redux-firebase/Lobby) if you haven't already since a ton of this type of discussion goes on there.

    #### What about [redux-firebase](https://github.com/colbyr/redux-firebase)?
    The author of [redux-firebase](https://github.com/colbyr/redux-firebase) has agreed to share the npm namespace! Currently the plan is to take the framework agnostic redux core logic of `react-redux-firebase` and [place it into `redux-firebase`](https://github.com/prescottprue/redux-firebase)). Eventually `react-redux-firebase` and potentially other framework libraries can depend on that core (the new `redux-firebase`).

2. Why use redux if I have Firebase to store state?

    This isn't a super quick answer, so I wrote up [a medium article to explain](https://medium.com/@prescottprue/firebase-with-redux-82d04f8675b9)

3. Where can I find some examples?

    * [Recipes Section](http://react-redux-firebase.com/docs/recipes/) of [the docs](http://react-redux-firebase.com/docs/recipes/)
    * [examples folder](/examples) contains [complete example apps](/examples/complete) as well as [useful snippets](/examples/snippets)

4. How does `connect` relate to `firebaseConnect`?

    ![data flow](/docs/static/dataFlow.png)

5. How do I help?

  * Join the conversion on [gitter][gitter-url]
  * Post Issues
  * Create Pull Requests
