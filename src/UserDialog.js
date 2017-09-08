//登录注册模态框组件

import React, {Component} from 'react'
import './UserDialog.css'
import JSONDeepCopy from './JSONDeepCopy'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'

class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state ={
			selected:'signUp',  //默认显示注册
			selectedTab:'signInOrSignUp',
			formData:{
				username:'',
				password:'',
				email:''
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
		let {username, password, email} = this.state.formData
		//验证成功函数
		let success = (user)=>{
			console.log(user)
			this.props.onSignUp.call(null,user)
		}
		//验证失败函数
		let error = (error)=>{
			//alert(error)
			switch(error.code){
				case 201:
					alert('密码不能为空')
					break
				case 202:
					alert('用户名已被占用')
					break
				case 218:
					alert('无效密码，密码不能为空')
				default:
					alert(error)
					break
			}
		}
		//调用leanCloud模块中的signUp方法实现注册
		signUp(username, password, email, success, error)
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
		 		case 211:
		 			alert('找不到用户')
		 			break
		 		case 213:
		 			alert('手机号码对应的用户不存在')
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
		let stateCopy = JSONDeepCopy(this.state)  //利用JSON深拷贝保存在变量中
		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}

	showForgotPassword(){
		let stateCopy = JSONDeepCopy(this.state)
		stateCopy.selectedTab = 'forgotPassword'
		this.setState(stateCopy)
	}

	returnToSignIn(){
		let stateCopy = JSONDeepCopy(this.state)
		stateCopy.selectedTab = 'signInOrSignUp'
		this.setState(stateCopy)
	}

	resetPassword(e){
		e.preventDefault()
		sendPasswordResetEmail(this.state.formData.email)
	}

	render(){
		let signUpForm = (
			//监听表单提交(submit)事件,并调用绑定到组件的signUp或signIn函数
			<form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
				<div className="row">
					<label>邮箱</label>
					<input type="text" value={this.state.formData.email}
					  onChange={this.changeFormData.bind(this,'email')}/>
				</div>
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
					<a href="#" onClick={this.showForgotPassword.bind(this)}>找回密码</a>
				</div>
			</form>
		)

		let signInOrSignUp = (
			<div className="signInOrSignUp">
				<nav>
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
		)

		let forgotPassword = (
			<div className="forgotPassword">
				<h3>重置密码</h3>
				<form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}>
					<div className="row">
						<label>邮箱</label>
						<input type="text" value={this.state.formData.email} 
						  onChange={this.changeFormData.bind(this, 'email')}/>
					</div>
					<div className="row actions">
						<button type="submit">发送重置邮件</button>
						<a href="#" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
					</div>
				</form>
			</div>
		)

		return (
			<div className="UserDialog-w">
				<div className="UserDialog">
					{this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
				</div>
			</div>
		)
	}
}

export default UserDialog