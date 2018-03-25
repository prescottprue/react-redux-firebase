/**
 * Basic Redux action type.
 *
 * This type is purposefully unopinionated and minimal for describing the broad
 * Reducer and Dispatch APIs. In practice, consumers of Redoodle will be creating
 * TypedActionDefs that yield the far more expressive TypedAction.
 *
 * @see Dispatch
 * @see Reducer
 * @see TypedAction
 */
export interface Action {
  type: any;
  [name: string]: any;
}
