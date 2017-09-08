//注册表单组件

import React from 'react'

export default function(props){
	return(
		<form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
			<div className="row">
				<label>邮箱</label>
				<input type="text" value={props.formData.email}
					 onChange={props.onChange.bind(null,'email')}/>
			</div>
			<div className="row">
				<label>用户名</label>

				{/*将input的value值绑定到组件的state.formData上,监听input的change事件调用changeFormData函数并传入formData的key*/}
					
				<input type="text" value={props.formData.username} 
					 onChange={props.onChange.bind(null,'username')}/>
			</div>
			<div className="row">
				<label>密码</label>
				<input type="password" value={props.formData.password} 
					 onChange={props.onChange.bind(null,'password')}/>
			</div>
			<div className="row actions">
				<button type="submit">注册</button>
			</div>
		</form>		

	)
}

/*
import React, {Component} from 'react'

class SignUpForm extends Component{
	render(){
		return (
			<form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/
				/*
				<div className="row">
					<label>邮箱</label>
					<input type="text" value={this.props.formData.email}
					  onChange={this.props.onChange.bind(this,'email')}/>
				</div>
				<div className="row">
					<label>用户名</label>

					{/*将input的value值绑定到组件的state.formData上,监听input的change事件调用changeFormData函数并传入formData的key*/
/*
					<input type="text" value={this.props.formData.username} 
					  onChange={this.props.onChange.bind(this,'username')}/>
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.props.formData.password} 
					  onChange={this.props.onChange.bind(this,'password')}/>
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>
		)
	}
}

export default SignUpForm
*/