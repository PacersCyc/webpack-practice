//输入框组件

import React from 'react'
import './TodoInput.css'

function submit(props, e){
	if(e.key === 'Enter'){
		console.log('用户按回车了！')
		if(e.target.value.trim() !== ''){
			props.onSubmit(e)
		}
	}
}

function changeTitle(props, e){
	props.onChange(e)
}

export default function (props){
	return <input className="TodoInput" type="text" value={props.content} 
		onKeyPress={submit.bind(null,props)} 
		onChange={changeTitle.bind(null,props)}/> 
}

/*
//import
//class TodoInput extends Component {
	//render(){
		//this.submit等事件处理函数需要手动绑定this对象，否则call()方法会传入null
		//return <input className="TodoInput" type="text" value={this.props.content} 
			//onKeyPress={this.submit.bind(this)} 
			//onChange={this.changeTitle.bind(this)}/>}  
	
/*
	submit(e){
		if(e.key === 'Enter'){
			console.log('用户按回车了！')
			this.props.onSubmit(e)
		}
	}

	changeTitle(e){
		console.log('输入框变了')
		this.props.onChange(e)
	}
}


export default TodoInput*/