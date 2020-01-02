import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

function NewTodo() {
  const [inputVal, changeInput] = useState('')
  const firestore = useFirestore()

  function resetInput() {
    changeInput('')
  }
  function onInputChange(e) {
    return changeInput(e && e.target && e.target.value)
  }

  function addTodo() {
    return firestore
      .collection('todos')
      .add({ text: inputVal || 'sample', done: false })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h4>New Todo</h4>
      <input value={inputVal} onChange={onInputChange} />
      <button onClick={addTodo}>Add</button>
      <button onClick={resetInput}>Cancel</button>
    </div>
  )
}

export default NewTodo
