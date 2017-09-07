import React from 'react'

class Welcome extends React.Component { 
	constructor(props){
		super(props)
		this.state = {
			date: new Date()
		}
		setInterval(()=>{
			this.setState({
				date: new Date()
			})	
		},1000)
		console.log('初始化states和props')
	}

	componentWillMount(){
		console.log('即将进行render')
	}

	render(){
		console.log('正在render')
		return (
			<div>
				<h1>Hello, {this.props.name}</h1>
				<h2>{this.state.date.toLocaleTimeString()}</h2>
			</div>
		)
	}

	componentDidMount(){
		console.log('已经挂载到页面里了')
	}
}

export default Welcome