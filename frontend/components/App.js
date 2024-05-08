import React from 'react'
import axios from 'axios'

//import '../styles/styles.css'

import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

let id = 0
let getId = () => ++id

export default class App extends React.Component {
    state = {
      todos: [],
      error: ''
    }
    toggleComplete = id => {
      this.setState({
        ...this.state,
        todos: this.state.todos.map(td => {
          if(id === td.id) return {...td, completed: !td.completed}
          return td
        })
      })
    }
    addTodo = (name) => {
      this.setState({
        ...this.state, 
        todos: this.state.todos.concat({id: getId(), completed: false, name })
      })
    }
  
    fetchTodos = () => {
      return axios.get(URL)
      .then(res => {
        //console.log(res.data.data)
        this.setState({...this.state, todos: res.data.data})
      })
      .catch(err => {
       this.setState({...this.state, error: err.response.data.message})
      })
    }
    componentDidMount() {
      this.fetchTodos()
}

  render() {
    return (
      <div id = "App">
      <div id = "Error"> {this.state.error}</div>
        <h2>Todo List:</h2>
        <TodoList todos={this.state.todos} toggleComplete={this.toggleComplete}/>
        <Form addTodo ={this.addTodo}/>
      </div>
    )
  }
}

