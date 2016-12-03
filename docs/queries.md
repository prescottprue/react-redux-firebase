# Queries

When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query). Below are examples using Firebase query methods as well as other methods that are included (such as 'populate').

## `orderByChild`
To order the query by a child within each object, user orderByChild.

#### Example
Ordering a list of todos by the text parameter of the todo item (placing them in alphabetical order).

```javascript
@firebase(['/todos#orderByChild=text'])
```

## `orderByKey`
Order a list by the key of each item. Since push keys contain time, this is also a way of ordering by when items were created.

#### Example
Ordering a list of todos based on their key (puts them in order of when they were created)

```javascript
@firebase(['/todos#orderByKey'])
```

## `orderByValue`
Runs [Firebase's orderByValue](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByValue)

Order a list by the value of each object

#### Example
Ordering a list of score's based on score's value

```javascript
@firebase([`scores#orderByValue`])
```
## `orderByPriority`
Runs [Firebase's orderByPriority](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

#### Example
Ordering a list based on priorities

```javascript
@firebase([`scores#orderByPriority`])
```

## `limitToFirst`
Limit query results to the first n number of results

#### Examples
1. Displaying only the first todo item

  ```javascript
  @firebase(['/todos#limitToFirst'])
  ```
2. Displaying only the first 10 todo items

  ```javascript
  @firebase(['/todos#limitToFirst=10'])
  ```

## `limitToLast`
Limit query results to the last n number of results

#### Examples
1. Only the **last** todo item

  ```javascript
  @firebase(['/todos#limitToFirst'])
  ```
2. Only the **last 10** todo items

  ```javascript
  @firebase(['/todos#limitToFirst=10'])
  ```
## `startAt`

Limit query results to include a range starting at a specific number

#### Example

1. Starting at the fifth item
  ```js
  @firebase([
    'todos#startAt=5&limitToFirst=2'
  ])
  ```
2. Paginate results
  ```js
  @firebase([
    'todos#startAt=5&limitToFirst=10'
  ])
  ```
## `endAt`
```js
@firebase([
  'todos#orderByChild=added&startAt=1&endAt=5'
])
```

## `equalTo`
```js
@firebase([
  'todos#orderByChild=added&startAt=5&limitToFirst=2'
])
```
## Once
To load a firebase location once instead of binding, the once option can be used:

```javascript
@firebase([
  { type: 'once', path: '/todos' }
])

```

## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/populate.md) for full documentation.