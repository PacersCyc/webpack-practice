import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'
//import * as localStore from './localStore'



class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          //调用leanCloud的getCurrentUser方法获取当前的用户信息(读取上次登录的user)，并保存到state.user中
          user:getCurrentUser() || {},
          newTodo: '',
          todoList: []
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
        <h1>{this.state.user.username||'我'}的待办 {/*根据用户名显示*/}
        {/*登录成功则添加登出按钮*/}
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className = "imput-w">
          <TodoInput content={this.state.newTodo} 
            onSubmit={this.addTodo.bind(this)} 
            onChange={this.changeTitle.bind(this)} />
        </div>
        <ol className="todo-list">
          {todos}
        </ol>
        {/*如果注册或登录成功则关闭UserDialog*/}
        {this.state.user.id ? 
          null : 
          <UserDialog 
          onSignUp={this.onSignUpOrSignIn.bind(this)} 
          onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }

  /*组件更新之后存储数据*/
  componentDidUpdate(){
    //localStore.save('todoList', this.state.todoList)
  }

  /*退出登录*/
  signOut(){
    signOut() /*调用leanCloud的signOut方法退出登录*/
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {} /*清空用户信息*/
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
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