// ##########################
// #### Define Variables ####
// ##########################
export function updateVariableDefinitions() {
	const variables = []

	variables.push({ name: 'Software version', variableId: 'version' })
	variables.push({ name: 'Central 2.0 version', variableId: 'access' })

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				let name = element.label
				name = name.replace(/[\W]/gi, '_')
				variables.push({ name: 'Router ' + name, variableId: 'router_' + name })
				variables.push({
					name: 'Router ' + name + ' current output',
					variableId: 'router_' + name + '_output',
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				variables.push({ name: 'Generator ' + element.label, variableId: 'generator_' + element.label })
				variables.push({
					name: 'Generator ' + element.label + ' loop',
					variableId: 'generator_' + element.label + '_loop',
				})
				variables.push({
					name: 'Generator ' + element.label + ' status',
					variableId: 'generator_' + element.label + '_status',
				})
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				variables.push({ name: 'Retransmitter ' + element.label, variableId: 'retransmitter_' + element.label })
				variables.push({
					name: 'Retransmitter ' + element.label + ' audio name',
					variableId: 'retransmitter_' + element.label + '_audioname',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' audio status',
					variableId: 'retransmitter_' + element.label + '_audiostatus',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' video name',
					variableId: 'retransmitter_' + element.label + '_videoname',
				})
				variables.push({
					name: 'Retransmitter ' + element.label + ' video status',
					variableId: 'retransmitter_' + element.label + '_videostatus',
				})
			})
		}
	}

	return variables
}

// #########################
// #### Update Variables ####
// #########################
export function updateVariables() {
	let accessLevel = 'Lite'
	if (this.central.access < 0) {
		accessLevel = 'Lite'
	} else if (this.central.access > 0) {
		accessLevel = 'Enterprise'
	} else {
		accessLevel = 'Pro'
	}

	this.setVariableValues({ version: this.central.version, access: accessLevel })

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				let name = element.label
				name = name.replace(/[\W]/gi, '_')
				this.setVariableValues({
					[`router_${name}`]: element.label,
					[`router_${name}_output`]: element.name,
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				this.setVariableValues({
					[`generator_${element.label}`]: element.label,
					[`generator_${element.label}_loop`]: element.loop,
				})
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				this.setVariableValues({
					[`retransmitter_${element.label}`]: element.label,
					[`retransmitter_${element.label}_audioname`]: element.AudioNDIname,
					[`retransmitter_${element.label}_audiostatus`]: element.AudioPlayStatus,
					[`retransmitter_${element.label}_videoname`]: element.VideoNDIname,
					[`retransmitter_${element.label}_videostatus`]: element.VideoPlayStatus,
				})
			})
		}
	}
}
