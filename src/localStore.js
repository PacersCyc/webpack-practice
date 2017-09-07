//存储数据
export function save(key,value){
	return window.localStorage.setItem(key,JSON.stringify(value))
}

//读取数据
export function load(key){
	return JSON.parse(window.localStorage.getItem(key))
}