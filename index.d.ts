import * as React from 'react'
import * as FirestoreTypes from '@firebase/firestore-types'
import * as DatabaseTypes from '@firebase/database-types'
import * as StorageTypes from '@firebase/storage-types'
import * as AuthTypes from '@firebase/auth-types'
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

/**
 * Redux action types for react-redux-firebase
 * @see https://react-redux-firebase.com/docs/api/constants.html#actiontypes
 */
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

/**
 * Constants used within react-redux-firbease
 * @see https://react-redux-firebase.com/docs/api/constants.html
 */
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
  /**
   * @see https://react-redux-firebase.com/docs/api/constants.html#defaultconfig
   */
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
 * redux actions.
 * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html
 */
interface ExtendedFirebaseInstance extends DatabaseTypes.FirebaseDatabase {
  initializeAuth: VoidFunction

  firestore: () => ExtendedFirestoreInstance

  dispatch: Dispatch

  /**
   * Sets data to Firebase.
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   * @returns Containing reference snapshot
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#set
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
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#setWithMeta
   */
  setWithMeta: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Pushes data to Firebase.
   * @param path - Path to location on Firebase which to push
   * @param value - Value to push to Firebase
   * @param onComplete - Function to run on complete
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#push
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
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#pushWithMeta
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
   * Updates data on Firebase and sends new data.
   * @param path - Path to location on Firebase which to update
   * @param value - Value to update to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#update
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
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#updateWithMeta
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
   * be attached in order for state to be updated when calling remove.
   * @param path - Path to location on Firebase which to remove
   * @param onComplete - Function to run on complete
   * @param options - Configuration for removal
   * @param [options.dispatchAction=true] - Whether or not to dispatch REMOVE action
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#remove
   */
  remove: (
    path: string,
    onComplete?: Function,
    options?: RemoveOptions
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Sets data to Firebase only if the path does not already
   * exist, otherwise it rejects. Internally uses a Firebase transaction to
   * prevent a race condition between seperate clients calling uniqueSet.
   * @param path - Path to location on Firebase which to set
   * @param value - Value to write to Firebase
   * @param onComplete - Function to run on complete (`not required`)
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#uniqueset
   */
  uniqueSet: (
    path: string,
    value: object | string | boolean | number,
    onComplete?: Function
  ) => Promise<DatabaseTypes.DataSnapshot>

  /**
   * Watch a path in Firebase Real Time Database.
   * @param type - Type of event to watch for (defaults to value)
   * @param path - Path to watch with watcher
   * @param storeAs - Location within redux to store value
   * @param options - List of parameters for the query
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#watchevent
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
   * as expected.
   * @param type - Type of watch event
   * @param path - Path to location on Firebase which to unset listener
   * @param queryId - Id of the listener
   * @param options - Event options object
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#watchevent
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
 * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html
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
 * @see https://react-redux-firebase.com/docs/queries.html
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

/**
 * @see https://github.com/prescottprue/redux-firestore#query-options
 */
type WhereOptions = [string, FirestoreTypes.WhereFilterOp, any]
type OrderByOptions = [string, FirestoreTypes.OrderByDirection]

/**
 * Options which can be passed to firestore query through
 * redux-firestore or react-redux-firebase.
 * @see https://github.com/prescottprue/redux-firestore#query-options
 */
export interface ReduxFirestoreQuerySetting {
  /**
   * Collection name
   * @see https://github.com/prescottprue/redux-firestore#collection
   */
  collection?: string
  /**
   * Collection Group name
   * @see https://github.com/prescottprue/redux-firestore#collection-group
   */
  collectionGroup?: string
  /**
   * Document id
   * @see https://github.com/prescottprue/redux-firestore#document
   */
  doc?: string
  /**
   * Subcollection path settings
   * @see https://github.com/prescottprue/redux-firestore#sub-collections
   */
  subcollections?: ReduxFirestoreQuerySetting[]
  /**
   * Where settings
   * @see https://github.com/prescottprue/redux-firestore#where
   */
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
export type ReduxFirestoreQueriesFunction = (
  props?: any
) => ReduxFirestoreQueries

/**
 * Firestore instance extended with methods which dispatch redux actions.
 * @see https://github.com/prescottprue/redux-firestore#api
 */
interface ExtendedFirestoreInstance extends FirestoreTypes.FirebaseFirestore {
  /**
   * Get data from firestore.
   * @see https://github.com/prescottprue/redux-firestore#get
   */
  get: <T>(
    docPath: string | ReduxFirestoreQuerySetting
  ) => Promise<FirestoreTypes.DocumentSnapshot<Partial<T>>>

  /**
   * Set data to firestore.
   * @see https://github.com/prescottprue/redux-firestore#set
   */
  set: <T>(
    docPath: string | ReduxFirestoreQuerySetting,
    data: Partial<T>,
    options?: FirestoreTypes.SetOptions
  ) => Promise<FirestoreTypes.DocumentSnapshot<Partial<T>>>

  /**
   * Add document to firestore.
   * @see https://github.com/prescottprue/redux-firestore#add
   */
  add: <T>(
    collectionPath: string | ReduxFirestoreQuerySetting,
    data: Partial<T>
  ) => Promise<{ id: string }>

  /**
   * Update document within firestore.
   * @see https://github.com/prescottprue/redux-firestore#update
   */
  update: <T>(
    docPath: string | ReduxFirestoreQuerySetting,
    data: Partial<T>
  ) => Promise<FirestoreTypes.DocumentSnapshot<Partial<T>>>

  /**
   * Delete a document within firestore.
   * @see https://github.com/prescottprue/redux-firestore#delete
   */
  delete: <T>(docPath: string | ReduxFirestoreQuerySetting) => Promise<T>

  /**
   * Executes the given updateFunction and then attempts to commit the changes applied within the
   * transaction.
   * @see https://github.com/prescottprue/redux-firestore#runtransaction
   */
  runTransaction: typeof FirestoreTypes.FirebaseFirestore.prototype.runTransaction

  /**
   * Sets a listener within redux-firestore
   * @see https://github.com/prescottprue/redux-firestore#onsnapshotsetlistener
   */
  onSnapshot: (options: ReduxFirestoreQuerySetting) => Promise<void>

  /**
   * Sets a listener within redux-firestore
   * @see https://github.com/prescottprue/redux-firestore#onsnapshotsetlistener
   */
  setListener: (options: ReduxFirestoreQuerySetting) => Promise<void>

  /**
   * Sets multiple firestore listeners created within redux-firestore
   * @see https://github.com/prescottprue/redux-firestore#onsnapshotsetlisteners
   */
  setListeners: (optionsArray: ReduxFirestoreQuerySetting[]) => Promise<void>

  /**
   * Unset firestore listener created within redux-firestore
   * @see https://github.com/prescottprue/redux-firestore#unsetlistener--unsetlistener
   */
  unsetListener: (options: ReduxFirestoreQuerySetting) => void

  /**
   * Unset multiple firestore listeners created within redux-firestore
   * @see https://github.com/prescottprue/redux-firestore#unsetlistener--unsetlisteners
   */
  unsetListeners: (options: ReduxFirestoreQuerySetting[]) => void
}

/**
 * @see https://github.com/prescottprue/redux-firestore#other-firebase-statics
 */
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
  firebase: ExtendedFirebaseInstance &
    ExtendedAuthInstance &
    ExtendedStorageInstance
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

type UserProfile<P extends object = {}> = P

/**
 * Firebase JS SDK Auth instance extended with methods which dispatch redux actions.
 * @see https://react-redux-firebase.com/docs/auth.html
 */
interface ExtendedAuthInstance {
  auth: () => AuthTypes.FirebaseAuth

  /**
   * Logs user into Firebase.
   * @param credentials - Credentials for authenticating
   * @param credentials.provider - External provider (google |
   * facebook | twitter)
   * @param credentials.type - Type of external authentication
   * (popup | redirect) (only used with provider)
   * @param credentials.email - Credentials for authenticating
   * @param credentials.password - Credentials for authenticating (only used with email)
   * @see https://react-redux-firebase.com/docs/auth.html#logincredentials
   */
  login: (credentials: Credentials) => Promise<AuthTypes.UserCredential>

  /**
   * Creates a new user in Firebase authentication. If
   * `userProfile` config option is set, user profiles will be set to this
   * location.
   * @param credentials - Credentials for authenticating
   * @param profile - Data to include within new user profile
   * @see https://react-redux-firebase.com/docs/auth.html#createusercredentials-profile
   */
  createUser: (
    credentials: CreateUserCredentials,
    profile?: UserProfile
  ) => Promise<AuthTypes.UserInfo>

  /**
   * Logs user out of Firebase and empties firebase state from
   * redux store.
   * @see https://react-redux-firebase.com/docs/auth.html#logout
   */
  logout: () => Promise<void>

  /**
   * Sends password reset email.
   * @param email - Email to send recovery email to
   * @see https://react-redux-firebase.com/docs/auth.html#resetpasswordcredentials
   */
  resetPassword: (email: string) => Promise<any>

  /**
   * Confirm that a user's password has been reset.
   * @param code - Password reset code to verify
   * @param password - New Password to confirm reset to
   * @see https://react-redux-firebase.com/docs/auth.html#confirmpasswordresetcode-newpassword
   */
  confirmPasswordReset: AuthTypes.FirebaseAuth['confirmPasswordReset']

  // https://react-redux-firebase.com/docs/auth.html#verifypasswordresetcodecode
  verifyPasswordResetCode: AuthTypes.FirebaseAuth['verifyPasswordResetCode']

  /**
   * Signs in using a phone number in an async pattern (i.e. requires calling a second method).
   * @param phoneNumber - Update to be auth object
   * @param appVerifier - Update in profile
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#signinwithphonenumber
   */
  signInWithPhoneNumber: AuthTypes.FirebaseAuth['signInWithPhoneNumber']

  /**
   * Update user's email
   * @param newEmail - Update to be auth object
   * @param updateInProfile - Update in profile
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#updateemail
   */
  updateEmail: (newEmail: string, updateInProfile?: boolean) => Promise<void>

  /**
   * Links the user account with the given credentials. Internally
   * calls `firebase.auth().currentUser.reload`.
   * @param credential - The auth credential
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#reloadauth
   */
  reloadAuth: (credential?: firebase.auth.AuthCredential | any) => Promise<void>

  /**
   * Links the user account with the given credentials. Internally
   * calls `firebase.auth().currentUser.linkWithCredential`.
   * @param credential - Credential with which to link user account
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#linkwithcredential
   */
  linkWithCredential: (
    credential: AuthTypes.AuthCredential
  ) => Promise<AuthTypes.User>

  /**
   * Update Auth Object
   * @param authUpdate - Update to be auth object
   * @param updateInProfile - Update in profile
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#updateauth
   */
  updateAuth: (
    authUpdate: {
      displayName?: string | null
      photoURL?: string | null
    },
    updateInProfile?: boolean
  ) => Promise<void>

  /**
   * Update user profile on Firebase Real Time Database or
   * Firestore (if `useFirestoreForProfile: true` config passed to
   * reactReduxFirebase). Real Time Database update uses `update` method
   * internally while updating profile on Firestore uses `set` with merge.
   * @param profileUpdate - Profile data to place in new profile
   * @param options - Options object (used to change how profile
   * update occurs)
   * @param [options.useSet=true] - Use set with merge instead of
   * update. Setting to `false` uses update (can cause issue of profile document
   * does not exist). Note: Only used when updating profile on Firestore
   * @param [options.merge=true] - Whether or not to use merge when
   * setting profile. Note: Only used when updating profile on Firestore
   * @see https://react-redux-firebase.com/docs/api/firebaseInstance.html#updateprofile
   * @see https://react-redux-firebase.com/docs/recipes/profile.html#update-profile
   */
  updateProfile: (profile: Partial<ProfileType>, options?: Object) => void
}

/**
 * Instance of Firebase Storage with methods that dispatch redux actions.
 * @see https://react-redux-firebase.com/docs/storage.html
 */
interface ExtendedStorageInstance {
  storage: () => StorageTypes.FirebaseStorage

  /**
   * Delete a file from Firebase Storage with the option to
   * remove its metadata in Firebase Database.
   * @param path - Path to location on Firebase which to set
   * @param dbPath - Database path to place uploaded file metadata
   * @see https://react-redux-firebase.com/docs/api/storage.html#deletefile
   */
  deleteFile: (
    path: string,
    dbPath?: string
  ) => Promise<{ path: string; dbPath: string }>

  /**
   * Upload a file to Firebase Storage with the option to store
   * its metadata in Firebase Database.
   * @param path - Path to location on Firebase which to set
   * @param file - File object to upload (usually first element from
   * array output of select-file or a drag/drop `onDrop`)
   * @param dbPath - Database path to place uploaded file metadata
   * @param options - Options
   * @param options.name - Name of the file
   * @see https://react-redux-firebase.com/docs/api/storage.html#uploadFile
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
  ) => Promise<{ uploadTaskSnapshot: StorageTypes.UploadTaskSnapshot }>

  /**
   * Upload multiple files to Firebase Storage with the option
   * to store their metadata in Firebase Database.
   * @param path - Path to location on Firebase which to set
   * @param files - Array of File objects to upload (usually from
   * a select-file or a drag/drop `onDrop`)
   * @param dbPath - Database path to place uploaded files metadata.
   * @param options - Options
   * @param options.name - Name of the file
   * @see https://react-redux-firebase.com/docs/api/storage.html#uploadFiles
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
  firebase: ExtendedAuthInstance &
    ExtendedStorageInstance &
    ExtendedFirebaseInstance
}

/**
 * React Higher Order Component that automatically listens/unListens to
 * Firebase Real Time Database on mount/unmount of the component. This uses
 * React's Component Lifecycle hooks.
 * @see https://react-redux-firebase.com/docs/api/firebaseConnect.html
 */
export function firebaseConnect<ProfileType, TInner = {}>(
  queriesConfig?:
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
 * @see https://react-redux-firebase.com/docs/getting_started.html#add-reducer
 */
export function firebaseReducer<
  ProfileType extends Record<string, any> = {},
  Schema extends Record<string, any> = {}
>(state: any, action: any): FirebaseReducer.Reducer<ProfileType, Schema>

export function makeFirebaseReducer<
  ProfileType extends Record<string, any> = {},
  Schema extends Record<string, any> = {}
>(): (state: any, action: any) => FirebaseReducer.Reducer<ProfileType, Schema>

/**
 * React HOC that attaches/detaches Cloud Firestore listeners on mount/unmount
 * @see https://react-redux-firebase.com/docs/api/firestoreConnect.html
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
 * @see https://react-redux-firebase.com/docs/api/reducer.html
 */
export function firestoreReducer(
  state: any,
  action: any
): FirestoreReducer.Reducer

/**
 * Fix path by adding "/" to path if needed
 * @param path - Path string to fix
 */
export function fixPath(path: string): string

/**
 * Get internal Firebase instance with methods which are wrapped with action dispatches. Useful for
 * integrations into external libraries such as redux-thunk and redux-observable.
 * @see https://react-redux-firebase.com/docs/api/getFirebase.html
 */
export function getFirebase(): ExtendedFirebaseInstance &
  ExtendedAuthInstance &
  ExtendedStorageInstance

/**
 * Get a value from firebase using slash notation.  This enables an easy
 * migration from v1's dataToJS/pathToJS/populatedDataToJS functions to v2 syntax
 * **NOTE:** Setting a default value will cause `isLoaded` to always return true
 * @param firebase - Firebase instance (state.firebase)
 * @param path - Path of parameter to load
 * @param notSetValue - Value to return if value is not
 * found in redux. This will cause `isLoaded` to always return true (since
 * value is set from the start).
 * @returns Data located at path within firebase.
 * @see https://react-redux-firebase.com/docs/api/helpers.html#getval
 */
export function getVal(firebase: any, path: string, notSetValue?: any): any

/**
 * Detect whether items are empty or not
 * @param item - Item to check loaded status of. A comma seperated list
 * is also acceptable.
 * @returns Whether or not item is empty
 * @see https://react-redux-firebase.com/docs/api/helpers.html#isempty
 */
export function isEmpty(...args: any[]): boolean

/**
 * Detect whether data from redux state is loaded yet or not
 * @param item - Item to check loaded status of. A comma separated
 * list is also acceptable.
 * @returns Whether or not item is loaded
 * @see https://react-redux-firebase.com/docs/api/helpers.html#isloaded
 */
export function isLoaded(...args: any[]): boolean

/**
 * React hook that provides `firebase` object. Extended Firebase
 * instance is gathered from `ReactReduxFirebaseContext`.
 * @see https://react-redux-firebase.com/docs/api/useFirebase.html
 */
export function useFirebase(): ExtendedFirebaseInstance &
  ExtendedAuthInstance &
  ExtendedStorageInstance

/**
 * React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * @param queriesConfig - An object or string for paths to sync
 * from firestore. Can also be a function that returns the object or string.
 * @param deps - Dependency for memoizing query object. It's recommend
 * to include deps if using object, array or function as a query.
 * @see https://react-redux-firebase.com/docs/api/useFirestoreConnect.html
 */
export function useFirebaseConnect(
  querySettings?: ReactReduxFirebaseQueries | ReactReduxFirebaseQueriesFunction
): void

/**
 * React hook that return firestore object.
 * Firestore instance is gathered from `store.firestore`, which is attached
 * to store by the store enhancer (`reduxFirestore`) during setup of
 * [`redux-firestore`](https://github.com/prescottprue/redux-firestore).
 * @see https://react-redux-firebase.com/docs/api/useFirestore.html
 */
export function useFirestore(): ExtendedFirestoreInstance

/**
 * React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * @param queriesConfig - An object or string for paths to sync
 * from firestore. Can also be a function that returns the object or string.
 * @see https://react-redux-firebase.com/docs/api/useFirestoreConnect.html
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
 * Populate with data from multiple paths within redux.
 * @param state - Firebase state object (state.firebase in redux store)
 * @param path - Path of parameter to load
 * @param populates - Array of populate config objects
 * @param notSetValue - Value to return if value is not found
 * @see https://react-redux-firebase.com/docs/populate.html
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
 * @see https://react-redux-firebase.com/docs/api/ReactReduxFirebaseProvider.html
 */
export function ReactReduxFirebaseProvider(
  props: ReactReduxFirebaseProviderProps
): any

/**
 * Props passed to ReactReduxFirebaseContext component
 * @see https://react-redux-firebase.com/docs/api/ReactReduxFirebaseProvider.html
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
  onAuthStateChanged: (user: AuthTypes.User | null) => void
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
  enableClaims?: boolean
  /**
   * Function for changing how profile is written to database (both RTDB and Firestore).
   */
  profileFactory?: (userData?: AuthTypes.User, profileData?: any, firebase?: any) => Promise<any> | any
}

/**
 * Configuration for redux-firestore
 * @see https://github.com/prescottprue/redux-firestore#config-options
 */
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
  onAttemptCollectionDelete:
    | null
    | ((queryOption: any, dispatch: any, firebase: any) => void)

  // https://github.com/prescottprue/redux-firestore#mergeordered
  mergeOrdered: boolean

  // https://github.com/prescottprue/redux-firestore#mergeordereddocupdate
  mergeOrderedDocUpdate: boolean

  // https://github.com/prescottprue/redux-firestore#mergeorderedcollectionupdates
  mergeOrderedCollectionUpdates: boolean
}

/**
 * Props passed to ReactReduxFirebaseProvider
 * @see https://react-redux-firebase.com/docs/api/ReactReduxFirebaseProvider.html
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
 * @see https://react-redux-firebase.com/docs/api/ReactReduxFirebaseProvider.html
 */
export function ReduxFirestoreProvider(props: ReduxFirestoreProviderProps): any

/**
 * React Higher Order Component that passes firebase as a prop (comes from context.store.firebase).
 * @see https://react-redux-firebase.com/docs/api/withFirebase.html
 */
export function withFirebase<P extends object>(
  componentToWrap: React.ComponentType<P>
): React.FC<P & WithFirebaseProps<P>>

/**
 * React Higher Order Component that passes firestore as a prop (comes from context.store.firestore)
 * @see https://react-redux-firebase.com/docs/api/withFirestore.html
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

/**
 * Firebase/Firestore user profile object type
 * @see https://react-redux-firebase.com/recipes/profile.html
 */
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
  export interface Reducer<
    ProfileType extends Record<string, any> = {},
    Schema extends Record<string, any> = {}
  > {
    auth: AuthState
    profile: Profile<ProfileType>
    authError: any
    data: { [T in keyof Schema]: Record<string, Schema[T]> }
    ordered: {
      [T in keyof Schema]: Array<{ key: string; value: Schema[T] }>
    }
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
