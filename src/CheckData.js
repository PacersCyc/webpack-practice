

export const CheckData = {
	isValidEmail(email){
		const regEmail = /^([^_]+[a-z0-9_\.]+[^_]+)@([^\-]*[a-z0-9\-]+[^\-]*)\.([a-z]{2,4})$/ 
		let isMatchedEmail = regEmail.test(email)  //该方法检测是否匹配正则并返回布尔值
		if(isMatchedEmail){
			return true
		}else{
			alert('邮箱名不合法！')
		}
	},


	isValidUsername(username){
		const regUsename = /^[a-zA-Z0-9_-]{4,16}$/
		let isMatchedUsername = regUsename.test(username)
		if(isMatchedUsername){
			return true
		}else{
			alert('用户名不合法！必须为4-16位字母、数字或下划线')
		}
	},


	isValidPassword(password){
		const regPassword = /^(\w){6,20}$/
		let isMatchedPassword = regPassword.test(password)
		if(isMatchedPassword){
			return true
		}else{
			alert('密码必须为6-20个字母、数字或下划线')
		}
	}
}