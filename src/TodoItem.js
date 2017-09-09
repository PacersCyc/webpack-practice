//待办列表组件

import React, {Component} from 'react'
import './TodoItem.css'

class TodoItem extends Component{
	render(){
		return (
			<div className="TodoItem">
				{this.props.todo.status === 'completed' ? <a className="iconfont icon-yitianjia"></a> : null}
				<input type="checkbox" 
			      checked={this.props.todo.status === 'completed'}  //满足status为'completed'即checked为true，选项被选中
			      onChange={this.toggle.bind(this)}/>
			    <span className="title">{this.props.todo.title}</span>
			    {/*<button onClick={this.delete.bind(this)}>删除</button>*/}
			    <span className="buttons">
				    <a className="iconfont icon-tianjia" onClick={this.toggle.bind(this)} title="切换待办项是否完成"></a>
				    <a className="iconfont icon-shanchu" onClick={this.delete.bind(this)} title="删除待办项"></a>
			    </span>
			</div>
	)}

	//切换待办项是否完成
	toggle(e){
		this.props.onToggle(e, this.props.todo)
	}

	//点击删除待办项
	delete(e){
		this.props.onDelete(e, this.props.todo)
	}	
}

export default TodoItem