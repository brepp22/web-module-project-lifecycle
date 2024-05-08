import React from 'react'
import Todo from './Todo'
export default class TodoList extends React.Component {
  state ={
    showAll : true
  }

  toggleShowAll = evt => {
    this.setState({
      ...this.state,
      showAll: !this.state.showAll 
    })
  }


  render() {
    const {todos, toggleComplete } = this.props
    const filtered = todos.filter(td => !td.completed || this.state.showAll)
    return (
      
        <div>
          {
            filtered.map((todo) => (<Todo key ={todo.id} todo={todo} toggleComplete={toggleComplete} />))
          }
          <button style={{ margin: '10px 0', padding: '0 10px' }} onClick = {this.toggleShowAll}> {this.state.showAll ? 'Hide Completed' : 'Show All'} </button>
        </div>
        
    )
  }
}
