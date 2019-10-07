import Index from './message/index.route'
import MessageSetting from './message/message-setting.route'

export default {
	path: '/message',
	component: { template: '<router-view></router-view>' },
	children: [
		Index,
		MessageSetting
	]
}
