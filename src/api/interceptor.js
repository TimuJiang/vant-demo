import axios from 'axios'
import router from '../router'
import { android } from "../config/android";

function getTicket() {
	return sessionStorage.getItem('bomt-ticket')
}

axios.interceptors.request.use(config => {
	let ticket = getTicket()
	// console.log(ticket)
	// console.log('config.url', config.url)
	if (ticket) {
		config.headers.ticket = ticket
	} else {
		if (android) {
			android.goToLogin()
		} else {
			if (config.url !== '/sso/user/login') {
				router.push('/login')
			}
		}

	}
	return config
}, error => {
	return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(response => {
	if (response.data.data && response.data.data.ticket) {
		sessionStorage.setItem('bomt-ticket', response.data.data.ticket)
	}
	let status = response.data.status
	if (status === 401) {
		if (android) {
			android.goToLogin()
		} else {
			router.push('/login')
		}

	} else {

	}
	return response
}, error => {
	return Promise.reject(error)
})

export default axios
