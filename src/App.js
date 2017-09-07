import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as localStore from './localStore'

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          newTodo: '',
          todoList: localStore.load('todoList') || []
      }
  }

  render() {
    let todos = this.state.todoList
    .filter((item)=>!item.deleted)  //过滤未点击删除按钮的元素,deleted为false即被过滤
    .map((item,index)=>{
      //动手题3：为什么return后加括号
      return (
        <li key={index}>
          <TodoItem todo={item} 
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className = "imput-w">
          <TodoInput content={this.state.newTodo} 
            onSubmit={this.addTodo.bind(this)} 
            onChange={this.changeTitle.bind(this)} />
        </div>
        <ol className="todo-list">
          {todos}
        </ol>
      </div>
    )
  }

  /*组件更新之后存储数据*/
  componentDidUpdate(){
    localStore.save('todoList', this.state.todoList)
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    console.log(this.state)
    this.setState(this.state)
  }

  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }

  addTodo(event){
    console.log('添加Todo')

    this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false
    })

    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })
  }

  changeTitle(event){
    this.setState({
      newTodo:event.target.value,
      todoList:this.state.todoList
    })
  }
}



export default App;


let id = 0

function idMaker(){
  id++
  return id
}