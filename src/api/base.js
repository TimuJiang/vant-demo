import axios from 'axios'
import Qs from 'qs'
export function post(url, data, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url,data instanceof FormData ? data : Qs.stringify(data))
			.then(res => {
				if (res.data.status === 200) {
					resolve(res.data.data || res.data)
				} else if (res.data.code === 405) {
					window.location.href = '/'
				} else {
					reject(res.data)
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: {
					...params
				}
			})
			.then(res => {
				if (res.data.status === 200) {
					resolve(res.data.data || {})
				} else if (res.data.code === 405) {
					window.location.href = '/'
				} else {
					reject(res.data)
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}
