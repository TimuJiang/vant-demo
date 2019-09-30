import {post, get} from './base'

export function getUser() {
	return post('/bomt-admin/sso/user')
}

export function login(loginName, password) {
	return get('/sso/user/login', {loginName, password})
}
