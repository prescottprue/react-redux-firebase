import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import Todos from './Todos'

jest.mock('react-redux')

describe('Should test the Todos Component', () => {
  let container = null

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('show empty text when the todo list is empty', () => {
    const todos = []
    useSelector.mockReturnValue(todos)

    act(() => {
      render(<Todos />, container)
    })

    container.querySelectorAll('li')
    expect(container.textContent).toBe('Todo list is empty')
  })

  it('should have one TodoItem in the list', () => {
    const todos = [
      {
        id: 'todoId',
        name: 'Sample todo',
        text: 'This is for testing todos'
      }
    ]

    useSelector.mockReturnValue(todos)
    act(() => {
      render(<Todos />, container)
    })

    const listItems = container.querySelectorAll('li')

    // this is not a real id, so only text which can be visible is Delete
    expect(listItems[0].textContent).toBe('Delete')
  })
})
