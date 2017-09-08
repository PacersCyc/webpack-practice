
import AV from 'leancloud-storage'

var APP_ID = 'RzVW6hOCdSEuGpe83S6EBbCF-gzGzoHsz'
var APP_KEY = 'Ea6jsOFmp5N3RgjWOqKu4e1E'
AV.init({
  appId:APP_ID,
  appKey:APP_KEY
})

export default AV

export function signUp(username, password, email, successFn, errorFn){
	// 新建 AVUser 对象实例
	var user = new AV.User()
	// 设置用户名
	user.setUsername(username)
	// 设置密码
	user.setPassword(password)
	// 设置邮箱
	user.setEmail(email)

	user.signUp().then(function (loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	},function (error) {
		errorFn.call(null, error)
	})

	return undefined
}

export function getCurrentUser(){
	let user = AV.User.current()
	if(user){
		return getUserFromAVUser(user)
	}else{
		return null
	}
}

export function signIn(username, password, successFn, errorFn){
	AV.User.logIn(username, password).then(function (loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	},function (error){
		errorFn.call(null, error)
	})
}	

export function signOut(){
	AV.user.logOut()
	return undefined
}

export function sendPasswordResetEmail(email, successFn, errorFn){
	AV.User.requestPasswordReset(email).then(function (success){
		successFn.call()
	},function (error){
		//console.dir(error)
		errorFn.call(null, error)
	})
}

function getUserFromAVUser(AVUser){
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}