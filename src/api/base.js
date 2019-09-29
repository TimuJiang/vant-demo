import axios from 'axios'

export function post(url, data, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, data)
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
