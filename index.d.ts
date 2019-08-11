import React from 'react'
import * as FirestoreTypes from '@firebase/firestore-types'
import * as DatabaseTypes from '@firebase/database-types'
import * as StorageTypes from '@firebase/storage-types'
import * as AuthTypes from '@firebase/auth-types'
import * as AppTypes from '@firebase/app-types'
import { Dispatch } from 'redux'

/**
 * Diff / Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Injects props and removes them from the prop requirements.
 * Will not pass through the injected props if they are passed in during
 * render. Also adds new prop requirements from TNeedsProps.
 */
export interface InferableComponentEnhancerWithProps<
  TInjectedProps,
  TNeedsProps
> {
  <P extends TInjectedProps>(
    component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof TInjectedProps> & TNeedsProps>
}

type mapper<TInner, TOutter> = (input: TInner) => TOutter

export const actionTypes: {
  START: string
  SET: string
  REMOVE: string
  MERGE: string
  SET_PROFILE: string
  LOGIN: string
  LOGOUT: string
  LOGIN_ERROR: string
  NO_VALUE: string
  UNAUTHORIZED_ERROR: string
  ERROR: string
  CLEAR_ERRORS: string
  SET_LISTENER: string
  UNSET_LISTENER: string
  AUTHENTICATION_INIT_FINISHED: string
  AUTHENTICATION_INIT_STARTED: string
  SESSION_START: string
  SESSION_END: string
  FILE_UPLOAD_START: string
  FILE_UPLOAD_ERROR: string
  FILE_UPLOAD_PROGRESS: string
  FILE_UPLOAD_COMPLETE: string
  FILE_DELETE_START: string
  FILE_DELETE_ERROR: string
  FILE_DELETE_COMPLETE: string
  AUTH_UPDATE_START: string
  AUTH_UPDATE_ERROR: string
  AUTH_UPDATE_SUCCESS: string
  AUTH_EMPTY_CHANGE: string
  AUTH_LINK_ERROR: string
  AUTH_LINK_START: string
  AUTH_LINK_SUCCESS: string
  AUTH_RELOAD_ERROR: string
  AUTH_RELOAD_START: string
  AUTH_RELOAD_SUCCESS: string
  EMAIL_UPDATE_ERROR: string
  EMAIL_UPDATE_START: string
  EMAIL_UPDATE_SUCCESS: string
  PROFILE_UPDATE_START: string
  PROFILE_UPDATE_ERROR: string
  PROFILE_UPDATE_SUCCESS: string
}

export const constants: {
  actionTypes: {
    AUTHENTICATION_INIT_FINISHED: string
    AUTHENTICATION_INIT_STARTED: string
    AUTH_EMPTY_CHANGE: string
    AUTH_LINK_ERROR: string
    AUTH_LINK_START: string
    AUTH_LINK_SUCCESS: string
    AUTH_RELOAD_ERROR: string
    AUTH_RELOAD_START: string
    AUTH_RELOAD_SUCCESS: string
    AUTH_UPDATE_ERROR: string
    AUTH_UPDATE_START: string
    AUTH_UPDATE_SUCCESS: string
    CLEAR_ERRORS: string
    EMAIL_UPDATE_ERROR: string
    EMAIL_UPDATE_START: string
    EMAIL_UPDATE_SUCCESS: string
    ERROR: string
    FILE_DELETE_COMPLETE: string
    FILE_DELETE_ERROR: string
    FILE_DELETE_START: string
    FILE_UPLOAD_COMPLETE: string
    FILE_UPLOAD_ERROR: string
    FILE_UPLOAD_PROGRESS: string
    FILE_UPLOAD_START: string
    LOGIN: string
    LOGIN_ERROR: string
    LOGOUT: string
    MERGE: string
    NO_VALUE: string
    PROFILE_UPDATE_ERROR: string
    PROFILE_UPDATE_START: string
    PROFILE_UPDATE_SUCCESS: string
    REMOVE: string
    SESSION_END: string
    SESSION_START: string
    SET: string
    SET_LISTENER: string
    SET_PROFILE: string
    START: string
    UNAUTHORIZED_ERROR: string
    UNSET_LISTENER: string
  }
  defaultConfig: ReactReduxFirebaseConfig
}

/**
 * Promise which resolves when auth state has loaded.
 */
export function authIsReady(store: any, ...args: any[]): any

interface RemoveOptions {
  dispatchAction: boolean
}

/**
 * Firestore instance extended with methods which dispatch
 * redux actions. More info available in
 * [firebaseInstance section of the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/firebaseInstance.html).
 */
interface ExtendedFirebaseInstance extends DatabaseTypes.FirebaseDatabase {
  initializeAuth: VoidFunction

  firestore: () => ExtendedFirestoreInstance

  dispatch: Dispatch

  /**
   * Sets data to Firebase. More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#set).
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   * @return Containing reference snapshot
   */
  set: (
    path: string,
    value: object | string | boolean | number | any,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Sets data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy. *Warning* using this function
   * may have unintented consequences (setting createdAt even if data already
   * exists)
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   */
  setWithMeta: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Pushes data to Firebase. More info available
   * in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#push).
   * @param path - Path to location on Firebase which to push
   * @param value - Value to push to Firebase
   * @param onComplete - Function to run on complete
   */
  push: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Pushes data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy.
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete
   */
  pushWithMeta: (
    path: string,
    value: object | string | boolean | number,
    onComplete: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Similar to the firebaseConnect Higher Order Component but
   * presented as a function (not a React Component). Useful for populating
   * your redux state without React, e.g., for server side rendering. Only
   * `once` type should be used as other query types such as `value` do not
   * return a Promise.
   * @param watchArray - Array of objects or strings for paths to sync
   * from Firebase. Can also be a function that returns the array. The function
   * is passed the props object specified as the next parameter.
   * @param options - The options object that you would like to pass to
   * your watchArray generating function.
   */
  promiseEvents: (
    watchArray: (string | object)[],
    options: object
  ) => Promise<any>

  /**
   * Updates data on Firebase and sends new data. More info available
   * in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#update).
   * @param path - Path to location on Firebase which to update
   * @param value - Value to update to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   */
  update: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Updates data on Firebase along with meta. *Warning*
   * using this function may have unintented consequences (setting
   * createdAt even if data already exists)
   * @param path - Path to location on Firebase which to update
   * @param value - Value to update to Firebase
   * @param onComplete - Function to run on complete
   */
  updateWithMeta: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Removes data from Firebase at a given path. **NOTE** A
   * seperate action is not dispatched unless `dispatchRemoveAction: true` is
   * provided to config on store creation. That means that a listener must
   * be attached in order for state to be updated when calling remove. More info
   * available in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#remove).
   * @param path - Path to location on Firebase which to remove
   * @param onComplete - Function to run on complete
   * @param options - Configuration for removal
   * @param [options.dispatchAction=true] - Whether or not to dispatch REMOVE action
   */
  remove: (
    path: string,
    onComplete?: Function,
    options?: RemoveOptions
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Sets data to Firebase only if the path does not already
   * exist, otherwise it rejects. Internally uses a Firebase transaction to
   * prevent a race condition between seperate clients calling uniqueSet. More
   * info available in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#uniqueset).
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   */
  uniqueSet: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Watch a path in Firebase Real Time Database. More info
   * available in the [docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#watchevent).
   * @param type - Type of event to watch for (defaults to value)
   * @param path - Path to watch with watcher
   * @param storeAs - Location within redux to store value
   * @param options - List of parameters for the query
   */
  watchEvent: (
    type: string,
    path: string,
    storeAs: string,
    options?: object
  ) => Promise<any>

  /**
   * Unset a listener watch event. **Note:** this method is used
   * internally so examples have not yet been created, and it may not work
   * as expected. More info available in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#unwatchevent).
   * @param type - Type of watch event
   * @param path - Path to location on Firebase which to unset listener
   * @param queryId - Id of the listener
   * @param options - Event options object
   */
  unWatchEvent: (
    type: string,
    path: string,
    queryId: string,
    options?: string
  ) => Promise<any>
}

/**
 * Create an extended firebase instance that has methods attached
 * which dispatch redux actions.
 * @param firebase - Firebase instance which to extend
 * @param configs - Configuration object
 * @param dispatch - Action dispatch function
 */
export function createFirebaseInstance(
  firebase: any,
  configs: Partial<ReduxFirestoreConfig>,
  dispatch: Dispatch
): ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance

export type QueryParamOption =
  | 'orderByKey'
  | 'orderByChild'
  | 'orderByPriority'
  | 'limitToFirst'
  | 'limitToLast'
  | 'notParsed'
  | 'parsed'

export type QueryParamOptions = QueryParamOption | string[]

/**
 * Options which can be passed to firebase query through react-redux-firebase
 */
export interface ReactReduxFirebaseQuerySetting {
  path: string
  type?:
    | 'value'
    | 'once'
    | 'child_added'
    | 'child_removed'
    | 'child_changed'
    | 'child_moved'
  queryParams?: QueryParamOptions
  storeAs?: string
}

/**
 * List of query configuration objects for react-redux-firebase
 */
export type ReactReduxFirebaseQueries =
  | (ReactReduxFirebaseQuerySetting | string)[]
  | (ReactReduxFirebaseQuerySetting | string)

/**
 * Function that recieves component props and returns
 * a list of query configuration objects for react-redux-firebase
 */
export type ReactReduxFirebaseQueriesFunction = (
  props?: any
) => ReactReduxFirebaseQueries

// https://github.com/prescottprue/redux-firestore#query-options
type WhereOptions = [string, FirestoreTypes.WhereFilterOp, any]
type OrderByOptions = [string, FirestoreTypes.OrderByDirection]

/**
 * Options which can be passed to firestore query through
 * redux-firestore or react-redux-firebase. More info available
 * [in the docs](https://github.com/prescottprue/redux-firestore#query-options).
 */
export interface ReduxFirestoreQuerySetting {
  // https://github.com/prescottprue/redux-firestore#collection
  collection: string
  // https://github.com/prescottprue/redux-firestore#document
  doc?: string
  // https://github.com/prescottprue/redux-firestore#sub-collections
  subcollections?: ReduxFirestoreQuerySetting[]
  // https://github.com/prescottprue/redux-firestore#where
  where?: WhereOptions | WhereOptions[]
  // https://github.com/prescottprue/redux-firestore#orderby
  orderBy?: OrderByOptions | OrderByOptions[]
  // https://github.com/prescottprue/redux-firestore#limit
  limit?: number
  // https://github.com/prescottprue/redux-firestore#storeas
  storeAs?: string
  // https://github.com/prescottprue/redux-firestore#startat
  startAt?: FirestoreTypes.DocumentSnapshot | any | any[]
  // https://github.com/prescottprue/redux-firestore#startafter
  startAfter?: FirestoreTypes.DocumentSnapshot | any | any[]
  // https://github.com/prescottprue/redux-firestore#endat
  endAt?: FirestoreTypes.DocumentSnapshot | any | any[]
  // https://github.com/prescottprue/redux-firestore#endbefore
  endBefore?: FirestoreTypes.DocumentSnapshot | any | any[]
}

/**
 * List of query configuration objects for redux-firestore
 */
export type ReduxFirestoreQueries =
  | (ReduxFirestoreQuerySetting | string)[]
  | (ReduxFirestoreQuerySetting | string)

/**
 * Function that recieves component props and returns
 * a list of query configuration objects for redux-firestore
 */
export type ReduxFirestoreQueriesFunction = (props?: any) => ReduxFirestoreQueries

/**
 * Firestore instance extended with methods which dispatch redux actions.
 * More info available in the [API section of the redux-firestore docs](https://github.com/prescottprue/redux-firestore#api).
 */
interface ExtendedFirestoreInstance extends FirestoreTypes.FirebaseFirestore {
  /**
   * Get data from firestore. More info available [in the docs](https://github.com/prescottprue/redux-firestore#get).
   */
  get: (docPath: string | ReduxFirestoreQuerySetting) => Promise<void>

  /**
   * Set data to firestore. More info available [in the docs](https://github.com/prescottprue/redux-firestore#set).
   */
  set: (
    docPath: string | ReduxFirestoreQuerySetting,
    data: Object
  ) => Promise<void>

  /**
   * Add document to firestore. More info available [in the docs](https://github.com/prescottprue/redux-firestore#add).
   */
  add: (
    collectionPath: string | ReduxFirestoreQuerySetting,
    data: Object
  ) => Promise<{ id: string }>

  // https://github.com/prescottprue/redux-firestore#update
  update: (
    docPath: string | ReduxFirestoreQuerySetting,
    data: Object
  ) => Promise<void>

  // https://github.com/prescottprue/redux-firestore#delete
  delete: (docPath: string | ReduxFirestoreQuerySetting) => void

  // https://github.com/prescottprue/redux-firestore#runtransaction
  // runTransaction: (transaction: WithFirestoreProps['firestore']) => Promise<any>

  // https://github.com/prescottprue/redux-firestore#onsnapshotsetlistener
  onSnapshot: (options: ReduxFirestoreQuerySetting) => Promise<void>
  setListener: (options: ReduxFirestoreQuerySetting) => Promise<void>

  //https://github.com/prescottprue/redux-firestore#setlisteners
  setListeners: (optionsArray: ReduxFirestoreQuerySetting[]) => Promise<void>

  // https://github.com/prescottprue/redux-firestore#unsetlistener--unsetlisteners
  unsetListener: (options: ReduxFirestoreQuerySetting) => void
  unsetListeners: (options: ReduxFirestoreQuerySetting[]) => void
}

// https://github.com/prescottprue/redux-firestore#other-firebase-statics
interface FirestoreStatics {
  FieldValue: FirestoreTypes.FieldValue
  FieldPath: FirestoreTypes.FieldPath
  setLogLevel: (logLevel: FirestoreTypes.LogLevel) => void
  Blob: FirestoreTypes.Blob
  CollectionReference: FirestoreTypes.CollectionReference
  DocumentReference: FirestoreTypes.DocumentReference
  DocumentSnapshot: FirestoreTypes.DocumentSnapshot
  GeoPoint: FirestoreTypes.GeoPoint
  Query: FirestoreTypes.Query
  QueryDocumentSnapshot: FirestoreTypes.QueryDocumentSnapshot
  QuerySnapshot: FirestoreTypes.QuerySnapshot
  Timestamp: FirestoreTypes.FieldValue
  Transaction: FirestoreTypes.Transaction
  WriteBatch: FirestoreTypes.WriteBatch
}

export interface WithFirestoreProps {
  firestore: FirestoreTypes.FirebaseFirestore &
    ExtendedFirestoreInstance &
    FirestoreStatics
  firebase: ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance
  dispatch: Dispatch
}

interface CreateUserCredentials {
  email: string
  password: string
  signIn?: boolean // default true
}

type Credentials =
  | CreateUserCredentials
  | {
      provider: 'facebook' | 'google' | 'twitter'
      type: 'popup' | 'redirect'
      scopes?: string[]
    }
  | AuthTypes.AuthCredential
  | {
      token: string
      profile: Object
    }
  | {
      phoneNumber: string
      applicationVerifier: AuthTypes.ApplicationVerifier
    }

interface UserProfile {
  email: string
  username: string
  [a: string]: any
}

/**
 * Firebase JS SDK Auth instance extended with methods which dispatch redux actions.
 * More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html).
 */
interface ExtendedAuthInstance {
  auth: () => AuthTypes.FirebaseAuth

  /**
   * Logs user into Firebase. More info available in the
   * [auth section of the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#logincredentials)
   * @param credentials - Credentials for authenticating
   * @param credentials.provider - External provider (google |
   * facebook | twitter)
   * @param credentials.type - Type of external authentication
   * (popup | redirect) (only used with provider)
   * @param credentials.email - Credentials for authenticating
   * @param credentials.password - Credentials for authenticating (only used with email)
   */
  login: (credentials: Credentials) => Promise<AuthTypes.UserCredential>

  /**
   * Creates a new user in Firebase authentication. If
   * `userProfile` config option is set, user profiles will be set to this
   * location. More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#createusercredentials-profile)
   * @param credentials - Credentials for authenticating
   * @param profile - Data to include within new user profile
   */
  createUser: (
    credentials: CreateUserCredentials,
    profile?: UserProfile
  ) => Promise<AuthTypes.UserInfo>

  /**
   * Logs user out of Firebase and empties firebase state from
   * redux store. More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#logout).
   */
  logout: () => Promise<void>

  /**
   * Sends password reset email. More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#resetpasswordcredentials).
   * @param credentials - Credentials for authenticating
   */
  resetPassword: (
    credentials: AuthTypes.UserCredential,
    profile: UserProfile
  ) => Promise<any>

  /**
   * Confirm that a user's password has been reset. More info available
   * [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#confirmpasswordresetcode-newpassword).
   * @param code - Password reset code to verify
   * @param password - New Password to confirm reset to
   */
  confirmPasswordReset: AuthTypes.FirebaseAuth['confirmPasswordReset']

  // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#verifypasswordresetcodecode
  verifyPasswordResetCode: AuthTypes.FirebaseAuth['verifyPasswordResetCode']

  // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#signinwithphonenumbercode
  signInWithPhoneNumber: AuthTypes.FirebaseAuth['signInWithPhoneNumber']
  
  /**
   * Update user's email
   * @param newEmail - Update to be auth object
   * @param updateInProfile - Update in profile
   */
  updateEmail: (newEmail: string, updateInProfile?: boolean) => Promise<void>

  /**
   * Links the user account with the given credentials. Internally
   * calls `firebase.auth().currentUser.reload`.
   * @param credential - The auth credential
   */
  reloadAuth: (credential?: firebase.auth.AuthCredential | any) => Promise<void>

  /**
   * Links the user account with the given credentials. Internally
   * calls `firebase.auth().currentUser.linkWithCredential`.
   * @param credential - Credential with which to link user account
   */
  linkWithCredential: (
    credential: AuthTypes.AuthCredential
  ) => Promise<AuthTypes.User>

  /**
   * Update Auth Object
   * @param authUpdate - Update to be auth object
   * @param updateInProfile - Update in profile
   */
  updateAuth: (
    authUpdate: {
      displayName: string | null
      photoURL: string | null
    },
    updateInProfile?: boolean
  ) => Promise<void>

  /**
   * Update user profile on Firebase Real Time Database or
   * Firestore (if `useFirestoreForProfile: true` config passed to
   * reactReduxFirebase). Real Time Database update uses `update` method
   * internally while updating profile on Firestore uses `set` with merge.
   * More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/recipes/profile.html#update-profile).
   * @param profileUpdate - Profile data to place in new profile
   * @param options - Options object (used to change how profile
   * update occurs)
   * @param [options.useSet=true] - Use set with merge instead of
   * update. Setting to `false` uses update (can cause issue of profile document
   * does not exist). Note: Only used when updating profile on Firestore
   * @param [options.merge=true] - Whether or not to use merge when
   * setting profile. Note: Only used when updating profile on Firestore
   */
  updateProfile: (profile: Partial<ProfileType>, options?: Object) => void
}

/**
 * Instance of Firebase Storage with methods that dispatch redux actions.
 * More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/storage.html)
 */
interface ExtendedStorageInstance {
  storage: () => StorageTypes.FirebaseStorage

  /**
   * Delete a file from Firebase Storage with the option to
   * remove its metadata in Firebase Database. More info available
   * in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/storage.html#deletefile).
   * @param path - Path to location on Firebase which to set
   * @param dbPath - Database path to place uploaded file metadata
   */
  deleteFile: (
    path: string,
    dbPath?: string
  ) => Promise<{ path: string; dbPath: string }>

  /**
   * Upload a file to Firebase Storage with the option to store
   * its metadata in Firebase Database. More info available
   * in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#uploadFile).
   * @param path - Path to location on Firebase which to set
   * @param file - File object to upload (usually first element from
   * array output of select-file or a drag/drop `onDrop`)
   * @param dbPath - Database path to place uploaded file metadata
   * @param options - Options
   * @param options.name - Name of the file
   */
  uploadFile: (
    path: string,
    file: File,
    dbPath?: string,
    options?: {
      name:
        | string
        | ((
            file: File,
            internalFirebase: WithFirebaseProps<ProfileType>['firebase'],
            uploadConfig: object
          ) => string)
    }
  ) => Promise<StorageTypes.UploadTaskSnapshot>

  /**
   * Upload multiple files to Firebase Storage with the option
   * to store their metadata in Firebase Database. More info available
   * in [the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#uploadFiles).
   * @param path - Path to location on Firebase which to set
   * @param files - Array of File objects to upload (usually from
   * a select-file or a drag/drop `onDrop`)
   * @param dbPath - Database path to place uploaded files metadata.
   * @param options - Options
   * @param options.name - Name of the file
   */
  uploadFiles: (
    path: string,
    files: File[],
    dbPath?: string,
    options?: {
      name:
        | string
        | ((
            file: File,
            internalFirebase: WithFirebaseProps<ProfileType>['firebase'],
            uploadConfig: object
          ) => string)
    }
  ) => Promise<{ uploadTaskSnapshot: StorageTypes.UploadTaskSnapshot }[]>
}

export interface WithFirebaseProps<ProfileType> {
  firebase: ExtendedAuthInstance & ExtendedStorageInstance & ExtendedFirebaseInstance
}

/**
 * React HOC that attaches/detaches Firebase Real Time Database listeners on mount/unmount.
 * More info available [in the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/firebaseConnect.html).
 */
export function firebaseConnect<ProfileType, TInner = {}>(
  connect?:
    | mapper<TInner, ReactReduxFirebaseQueries>
    | ReactReduxFirebaseQueries
): InferableComponentEnhancerWithProps<
  TInner & WithFirebaseProps<ProfileType>,
  WithFirebaseProps<ProfileType>
>

/**
 * Reducer for Firebase state
 * @param state - Current Firebase Redux State (state.firebase)
 * @param action - Action which will modify state
 * @param action.type - Type of Action being called
 * @param action.path - Path of action that was dispatched
 * @param action.data - Data associated with action
 */
export function firebaseReducer<UserType>(
  state: any,
  action: any
): FirebaseReducer.Reducer<UserType>

/**
 * Reducer for Firebase state
 * @param state - Current Firebase Redux State (state.firebase)
 * @param action - Action which will modify state
 * @param action.type - Type of Action being called
 * @param  action.path - Path of action that was dispatched
 * @param action.data - Data associated with action
 */
export function firebaseStateReducer(
  state: any,
  action: any
): FirestoreReducer.Reducer

/**
 * React HOC that attaches/detaches Cloud Firestore listeners on mount/unmount
 */
export function firestoreConnect<TInner = {}>(
  connect?: mapper<TInner, ReduxFirestoreQueries> | ReduxFirestoreQueries
): InferableComponentEnhancerWithProps<
  TInner & WithFirestoreProps,
  WithFirestoreProps
>

/**
 * Reducer for Firestore state
 * @param state - Current Firebase Redux State (state.firestore)
 * @param action - Action which will modify state
 * @param action.type - Type of Action being called
 * @param action.path - Path of action that was dispatched
 * @param action.data - Data associated with action
 */
export function firestoreReducer(
  state: any,
  action: any
): FirestoreReducer.Reducer

export function fixPath(path: string): string

export function getVal(firebase: object, path: string, notSetValue?: any): any

/**
 * Detect whether data from redux state is loaded yet or not
 */
export function isEmpty(...args: any[]): boolean

/**
 * Detect whether data from redux state is loaded yet or not
 */
export function isLoaded(...args: any[]): boolean

/**
 * React hook that provides `firebase` object. Extended Firebase
 * instance is gathered from `ReactReduxFirebaseContext`.
 */
export function useFirebase(): ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance

/**
 * React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * @param queriesConfig - An object or string for paths to sync
 * from firestore. Can also be a function that returns the object or string.
 * @param deps - Dependency for memoizing query object. It's recommend
 * to include deps if using object, array or function as a query.
 */
export function useFirebaseConnect(
  querySettings?: ReactReduxFirebaseQueries | ReactReduxFirebaseQueriesFunction
): void

/**
 * React hook that return firestore object.
 * Firestore instance is gathered from `store.firestore`, which is attached
 * to store by the store enhancer (`reduxFirestore`) during setup of
 * [`redux-firestore`](https://github.com/prescottprue/redux-firestore)
 */
export function useFirestore(): ExtendedFirestoreInstance

/**
 * React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * @param queriesConfig - An object or string for paths to sync
 * from firestore. Can also be a function that returns the object or string.
 */
export function useFirestoreConnect<TInner>(
  queriesConfig?:
    | mapper<TInner, (string | ReduxFirestoreQuerySetting)[]>
    | ReduxFirestoreQuerySetting[]
    | string[]
    | mapper<TInner, string | ReduxFirestoreQuerySetting>
    | ReduxFirestoreQuerySetting
    | string
): void


/**
 * Populate with data from redux.
 * @param state - Firebase state object (state.firebase in redux store)
 * @param path - Path of parameter to load
 * @param populates - Array of populate config objects
 * @param notSetValue - Value to return if value is not found
 */
export function populate(
  state: object,
  path: string,
  populates: any[],
  notSetValue?: any
): any

/**
 * React Context provider for Firebase instance (with methods wrapped in dispatch).
 * Needed to use HOCs like firebaseConnect and withFirebase.
 */
export function ReactReduxFirebaseProvider(
  props: ReactReduxFirebaseProviderProps
): any

/**
 * Props passed to ReactReduxFirebaseContext component
 */
export interface ReactReduxFirebaseProviderProps {
  firebase: any
  config: Partial<ReactReduxFirebaseConfig>
  dispatch: Dispatch
  children?: React.ReactNode
  initializeAuth?: boolean
  createFirestoreInstance?: (
    firebase: any,
    configs: Partial<ReduxFirestoreConfig>,
    dispatch: Dispatch
  ) => object
}

/**
 * React Context for Firebase instance.
 */
export namespace ReduxFirestoreContext {
  const prototype: {}
}

interface ReactReduxFirebaseConfig {
  attachAuthIsReady: boolean
  autoPopulateProfile: boolean
  dispatchOnUnsetListener: boolean
  dispatchRemoveAction: boolean
  enableEmptyAuthChanges: boolean
  enableLogging: boolean
  enableRedirectHandling: boolean
  firebaseStateName: string
  logErrors: boolean
  presence: any
  preserveOnEmptyAuthChange: any
  preserveOnLogout: any
  resetBeforeLogin: boolean
  sessions: string
  setProfilePopulateResults: boolean
  updateProfileOnLogin: boolean
  userProfile: string | null
  // Use Firestore for Profile instead of Realtime DB
  useFirestoreForProfile?: boolean
}

export interface ReduxFirestoreConfig {
  enableLogging: boolean

  helpersNamespace: string | null

  // https://github.com/prescottprue/redux-firestore#loglistenererror
  logListenerError: boolean

  // https://github.com/prescottprue/redux-firestore#enhancernamespace
  enhancerNamespace: string

  // https://github.com/prescottprue/redux-firestore#allowmultiplelisteners
  allowMultipleListeners:
    | ((listenerToAttach: any, currentListeners: any) => boolean)
    | boolean

  // https://github.com/prescottprue/redux-firestore#preserveondelete
  preserveOnDelete: null | object

  // https://github.com/prescottprue/redux-firestore#preserveonlistenererror
  preserveOnListenerError: null | object

  // https://github.com/prescottprue/redux-firestore#onattemptcollectiondelete
  onAttemptCollectionDelete: null | ((queryOption, dispatch, firebase) => void)

  // https://github.com/prescottprue/redux-firestore#mergeordered
  mergeOrdered: boolean

  // https://github.com/prescottprue/redux-firestore#mergeordereddocupdate
  mergeOrderedDocUpdate: boolean

  // https://github.com/prescottprue/redux-firestore#mergeorderedcollectionupdates
  mergeOrderedCollectionUpdates: boolean
}

/**
 * Props passed to ReactReduFirebaseContext component
 */
export interface ReduxFirestoreProviderProps {
  firebase: any
  config: Partial<ReactReduxFirebaseConfig>
  dispatch: (action: object) => void
  createFirestoreInstance: (
    firebase: any,
    configs: Partial<ReduxFirestoreConfig>,
    dispatch: Dispatch
  ) => object
  children?: React.ReactNode
  initializeAuth?: boolean
}

/**
 * React Context provider for Firestore instance (with methods wrapped in dispatch). Needed to use HOCs
 * like firestoreConnect and withFirestore.
 */
export function ReduxFirestoreProvider(props: ReduxFirestoreProviderProps): any

/**
 * React Higher Order Component that passes firebase as a prop (comes from context.store.firebase)
 * More info available in the [withFirebase section of the docs](http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/withFirebase.html).
 */
export function withFirebase<P extends object>(
  componentToWrap: React.ComponentType<P>
): React.FC<P & WithFirebaseProps<P>>

/**
 * React Higher Order Component that passes firestore as a prop (comes from context.store.firestore)
 * http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/withFirestore.html
 */
export function withFirestore<P extends object>(
  componentToWrap: React.ComponentType<P>
): React.FC<P & WithFirestoreProps>

export namespace authIsReady {
  const prototype: {}
}

export namespace createFirebaseConnect {
  const prototype: {}
}

// Your Firebase/Firestore user profile object type
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/recipes/profile.html
export type ProfileType = {}

export interface Listeners {
  allIds: string[]
  byId: {
    [path: string]: {
      name: string
    }
  }
}

export type TypeWithId<T> = T & { id: string }

export interface Ordered<T extends FirestoreTypes.DocumentData> {
  [collection: string]: TypeWithId<T>[]
}

export interface Dictionary<T> {
  [documentId: string]: T
}

export interface Data<T extends FirestoreTypes.DocumentData> {
  [collection: string]: T
}

export namespace FirebaseReducer {
  export interface Reducer<ProfileType = {}> {
    auth: AuthState
    profile: Profile<ProfileType>
    authError: any
    data: Data<any | Dictionary<any>>
    ordered: Ordered<any>
    errors: any[]
    isInitializing: boolean
    listeners: Listeners
    requested: Dictionary<boolean>
    requesting: Dictionary<boolean>
    timestamps: Dictionary<number>
  }

  export interface AuthState extends AuthTypes.UserInfo {
    isLoaded: boolean
    isEmpty: boolean
    apiKey: string
    appName: string
    authDomain: string
    createdAt: string
    emailVerified: boolean
    isAnonymous: boolean
    lastLoginAt: string
    providerData: AuthTypes.UserInfo[] | null
    redirectEventId: null
    stsTokenManager: {
      accessToken: string
      apiKey: string
      expirationTime: number
      refreshToken: string
    }
  }

  // can be extended for optional properties from your database
  export type Profile<ProfileType> = {
    isLoaded: boolean
    isEmpty: boolean
  } & ProfileType

  export namespace firebaseStateReducer {
    const prototype: {}
  }
}

export namespace FirestoreReducer {
  export interface Reducer {
    composite?: Data<any | Dictionary<any>>
    data: Data<any | Dictionary<any>>
    errors: {
      allIds: string[]
      byQuery: any[]
    }
    listeners: Listeners
    ordered: Ordered<any>
    queries: Data<ReduxFirestoreQuerySetting & (Dictionary<any> | any)>
    status: {
      requested: Dictionary<boolean>
      requesting: Dictionary<boolean>
      timestamps: Dictionary<number>
    }
  }

  const prototype: {}
}

export namespace fixPath {
  const prototype: {}
}

export namespace getVal {
  const prototype: {}
}

export namespace helpers {
  function fixPath(path: any): any

  /**
   * Get a value from firebase using slash notation.  This enables an easy
   * migration from v1's dataToJS/pathToJS/populatedDataToJS functions to v2 syntax
   * **NOTE:** Setting a default value will cause `isLoaded` to always return true
   * @param firebase - Firebase instance (state.firebase)
   * @param path - Path of parameter to load
   * @param notSetValue - Value to return if value is not
   * found in redux. This will cause `isLoaded` to always return true (since
   * value is set from the start).
   */
  function getVal(firebase: any, path: string, notSetValue?: any): any

  /**
   * Detect whether items are empty or not
   * @param item - Item to check loaded status of. A comma seperated list
   * is also acceptable.
   * @return Whether or not item is empty
   */
  function isEmpty(...args: any[]): boolean

  /**
   * Detect whether data from redux state is loaded yet or not
   * @param item - Item to check loaded status of. A comma separated
   * list is also acceptable.
   * @return Whether or not item is loaded
   */
  function isLoaded(...args: any[]): boolean

  /**
   * Populate with data from redux.
   * @param state - Firebase state object (state.firebase in redux store)
   * @param path - Path of parameter to load
   * @param populates - Array of populate config objects
   * @param notSetValue - Value to return if value is not found
   */
  function populate(
    state: any,
    path: string,
    populates: any[],
    notSetValue?: any
  ): any

  namespace fixPath {
    const prototype: {}
  }

  namespace getVal {
    const prototype: {}
  }

  namespace isEmpty {
    const prototype: {}
  }

  namespace isLoaded {
    const prototype: {}
  }

  namespace populate {
    const prototype: {}
  }
}

export namespace isEmpty {
  const prototype: {}
}

export namespace isLoaded {
  const prototype: {}
}

export namespace populate {
  const prototype: {}
}

export namespace reactReduxFirebase {
  const prototype: {}
}

export namespace reduxFirebase {
  const prototype: {}
}

export namespace reduxReactFirebase {
  const prototype: {}
}
