import {post} from './base'

/*
* 提醒列表
* */
export function countReminderMessage() {
	return post('/bomt-admin/reminderMessage/countReminderMessage')
}

/*
* 统计商机超时未跟进列表
* */
export function countTimeOut() {
	return post('/bomt-admin/reminderMessage/countTimeOut')
}

/*
* 提醒总计
* */
export function reminderTotal() {
	return post('/bomt-admin/reminderMessage/reminderTotal')
}

/*
* 获取用户提醒设置的详情
* */
export function getSetting() {
	return post('/bomt-admin/reminderSettings/get')
}

/*
* 提醒设置保存接口
* */
export function saveSetting() {
	return post('/bomt-admin/reminderSettings/save')
}
