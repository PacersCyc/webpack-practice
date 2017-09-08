import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import JSONDeepCopy from './JSONDeepCopy'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
//import AV from './leanCloud'
//import * as localStore from './localStore'


/*
// 声明类型
var TodoFolder = AV.Object.extend('TodoFolder')
// 新建对象
var todoFolder = new TodoFolder()
// 设置名称
todoFolder.set('name','工作')
// 设置优先级
todoFolder.set('priority',1)
todoFolder.save().then(function (todo) {
  console.log('objectId is ' + todo.id)
},function (error) {
  console.error(error)
})
*/


class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          //调用leanCloud的getCurrentUser方法获取当前的用户信息(读取上次登录的user)，并保存到state.user中
          user:getCurrentUser() || {},
          newTodo: '',
          todoList: []
      }

      let user = getCurrentUser()
      if (user) {
        TodoModel.getByUser(user, (todos)=>{
          let stateCopy = JSONDeepCopy(this.state)
          stateCopy.todoList = todos
          this.setState(stateCopy)
        })
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
    let stateCopy = JSONDeepCopy(this.state)
    stateCopy.user = {} /*清空用户信息*/
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSONDeepCopy(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
  }

  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    console.log(this.state)
    
    TodoModel.update(todo,()=>{
      this.setState(this.state)
    },(error) =>{
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  delete(e,todo){
    TodoModel.destroy(todo.id, ()=>{
      todo.deleted = true
      this.setState(this.state)
    })
  }

  addTodo(event){
    console.log('添加Todo')

    let newTodo = {
      title:event.target.value,
      status:'null',
      deleted:false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    },(error)=>{
      console.log(error)
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

