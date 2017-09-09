//登录注册模态框组件

import React, {Component} from 'react'
import './UserDialog.css'
import JSONDeepCopy from './JSONDeepCopy'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
import {CheckData} from './CheckData'

class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state ={
			selectedTab:'signInOrSignUp',
			formData:{
				username:'',
				password:'',
				email:''
			}
		}
	}

	//提交注册表单
	signUp(e){
		//先阻止表单提交
		e.preventDefault()
		//将用户提交的表单数据(用户名、密码)保存到新对象中
		let {username, password, email} = this.state.formData
		//判断输入是否合法
		if(!(CheckData.isValidEmail(email) && CheckData.isValidUsername(username) && CheckData.isValidPassword(password))){
			return
		}
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

	//提交登录表单
	signIn(e){
		e.preventDefault()
		let {username, password} = this.state.formData
		//判断输入是否合法
		if(!(CheckData.isValidUsername(username) && CheckData.isValidPassword(password))){
			return
		}
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

	//展示重置密码界面
	showForgotPassword(){
		let stateCopy = JSONDeepCopy(this.state)
		stateCopy.selectedTab = 'forgotPassword'
		this.setState(stateCopy)
	}

	//返回登录界面
	returnToSignIn(){
		let stateCopy = JSONDeepCopy(this.state)
		stateCopy.selectedTab = 'signInOrSignUp'
		this.setState(stateCopy)
	}

	//重置密码
	resetPassword(e){
		e.preventDefault()
		sendPasswordResetEmail(this.state.formData.email)
	}

	render(){
		return (
			<div className="UserDialog-w">
				<div className="UserDialog">
					{/*登录注册界面与重置密码界面切换*/}

					{this.state.selectedTab === 'signInOrSignUp' ? 
					<SignInOrSignUp 
					  formData={this.state.formData}
					  onSignIn={this.signIn.bind(this)}
					  onSignUp={this.signUp.bind(this)}
					  onChange={this.changeFormData.bind(this)}
					  onForgotPassword={this.showForgotPassword.bind(this)}/>: 
					<ForgotPasswordForm 
					  formData={this.state.formData}
					  onSubmit={this.resetPassword.bind(this)}
					  onChange={this.changeFormData.bind(this)}
					  onSignIn={this.returnToSignIn.bind(this)}/>
					}
				</div>
			</div>
		)
	}
}

export default UserDialog