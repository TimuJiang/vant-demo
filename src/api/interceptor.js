import axios from 'axios'
import router from '../router'

function getTicket() {
	return localStorage.getItem('bomt-ticket')
}

axios.interceptors.request.use(config => {
	let ticket = getTicket()
	console.log(ticket)
	if (ticket) {
		config.headers.ticket = ticket
	} else {
		if (config.url !== '/sso/user/login') {
			router.push('/login')
		}
	}
	return config
}, error => {
	return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(response => {
	if (response.data.data && response.data.data.ticket) {
		localStorage.setItem('bomt-ticket', response.data.data.ticket)
	}
	let status = response.data.status
	if (status === 401) {
		router.push('/login')
	} else {

	}
	return response
}, error => {
	return Promise.reject(error)
})

export default axios
