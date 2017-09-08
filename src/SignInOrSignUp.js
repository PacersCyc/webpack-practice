//表单切换组件

import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

class SignInOrSignUp extends Component{
	constructor(props){
		super(props)
		this.state ={
			selected:'signUp'  //默认显示注册
		}
	}

	//切换登录和注册，根据radio按钮的value属性切换checked选中状态
	switch(e){
		this.setState({
			selected:e.target.value,
		})
	}

	render(){
		return (
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
					{this.state.selected === 'signUp' ? 
						<SignUpForm formData={this.props.formData}
						onSubmit={this.props.onSignUp}
						onChange={this.props.onChange}/>
						: null}
					{this.state.selected === 'signIn' ? 
						<SignInForm formData={this.props.formData}
						onSubmit={this.props.onSignIn}
						onChange={this.props.onChange}
						onForgotPassword={this.props.onForgotPassword}/>
						: null}
				</div>
			</div>
		)
	}
}

export default SignInOrSignUp