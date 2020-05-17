import common from './common'
import development from './development'
import production from './production'

const configs: any = {
	common,
	development,
	production
}

export default {
	...common,
	...configs[process.env.NODE_ENV || 'development']
}
