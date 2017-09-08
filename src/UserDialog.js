//登录注册模态框组件

import React, {Component} from 'react'
import './UserDialog.css'
import {signUp,signIn} from './leanCloud'

class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state ={
			selected:'signUp',  //默认显示注册
			formData:{
				username:'',
				password:''
			}
		}
	}

	//切换登录和注册，根据radio按钮的value属性切换checked选中状态
	switch(e){
		this.setState({
			selected:e.target.value,
		})
	}

	signUp(e){
		//先阻止表单提交
		e.preventDefault()
		//将用户提交的表单数据(用户名、密码)保存到新对象中
		let {username, password} = this.state.formData
		//验证成功函数
		let success = (user)=>{
			console.log(user)
			this.props.onSignUp.call(null,user)
		}
		//验证失败函数
		let error = (error)=>{
			//alert(error)
			switch(error.code){
				case 202:
					alert('用户名已被占用')
					break
				default:
					alert(error)
					break
			}
		}
		//调用leanCloud模块中的signUp方法实现注册
		signUp(username, password, success, error)
	}

	signIn(e){
		e.preventDefault()
		let {username, password} = this.state.formData
		let success = (user)=>{
			this.props.onSignIn.call(null, user)
		}
		let error = (error)=>{
		 	//alert(error)
		 	switch(error.code){
		 		case 210:
		 			alert('用户名与密码不匹配')
		 			break
		 		default:
		 			alert(error)
		 			break
		 	}
		}
		signIn(username, password, success, error)
	}

	changeFormData(key,e){
		//this.state.formData.username = e.target.value
		//这样写浏览器会warning，不能直接修改state
		let stateCopy = JSON.parse(JSON.stringify(this.state))  //利用JSON深拷贝保存在变量中
		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}

	render(){
		let signUpForm = (
			//监听表单提交(submit)事件,并调用绑定到组件的signUp或signIn函数
			<form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
				<div className="row">
					<label>用户名</label>

					{/*将input的value值绑定到组件的state.formData上,监听input的change事件调用changeFormData函数并传入formData的key*/}

					<input type="text" value={this.state.formData.username} 
					  onChange={this.changeFormData.bind(this,'username')}/>
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.state.formData.password} 
					  onChange={this.changeFormData.bind(this,'password')}/>
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>
		)

		let signInForm = (
			<form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" value={this.state.formData.username} 
					  onChange={this.changeFormData.bind(this,'username')}/>
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.state.formData.password} 
					  onChange={this.changeFormData.bind(this,'password')}/>
				</div>
				<div className="row actions">
					<button type="submit">登录</button>
				</div>
			</form>
		)

		return (
			<div className="UserDialog-w">
				<div className="UserDialog">
					<nav onChange={this.switch.bind(this)}>
						<label>
							{/*这里用onChange事件绑定到switch函数来消除浏览器的关于value的warning*/}

							<input type="radio" value="signUp" 
							  checked={this.state.selected === 'signUp'}
							  onChange={this.switch.bind(this)}/>
							注册
						</label>
						<label>
							<input type="radio" value="signIn" 
							  checked={this.state.selected === 'signIn'} 
							  onChange={this.switch.bind(this)}/>
							登录
						</label>
					</nav>
					<div className="panels">  
						{/*注册与登录表单切换*/}
						{this.state.selected === 'signUp' ? signUpForm : null}
						{this.state.selected === 'signIn' ? signInForm : null}
					</div>
				</div>
			</div>
		)
	}
}

export default UserDialog