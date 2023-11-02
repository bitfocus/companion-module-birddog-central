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
				variables.push({ name: 'Router ' + element.label, variableId: 'router_' + element.label })
				variables.push({
					name: 'Router ' + element.label + ' current output',
					variableId: 'router_' + element.label + '_output',
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				variables.push({ name: 'Generator ' + element.label, variableId: 'generator_' + element.label })
				variables.push({ name: 'Generator ' + element.label + ' loop', variableId: 'generator_' + element.label + '_loop' })
				variables.push({
					name: 'Generator ' + element.label + ' status',
					variableId: 'generator_' + element.label + '_status',
				})
			})
		}

		if (this.central.retransmitters.length > 0) {
			console.log('-- in create new variables')
			console.log('--- retransmitters contains: ', this.central.retransmitters)
			this.central.retransmitters.forEach((element, index) => {
				console.log('---- in retransmitters array. Element is: ', element)
				console.log('---- index is ', index)
				console.log('---- existing variables are ', variables)
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
				console.log('---- new variables are ', variables)
			})
		}
	}

	this.setVariableDefinitions(variables)
}

// #########################
// #### Update Variables ####
// #########################
export function updateVariables() {
	this. setVariableValues('version', this.central.version)

	if (this.central.access < 0) {
		this. setVariableValues({access: 'Lite'})
	} else if (this.central.access > 0) {
		this. setVariableValues({access: 'Enterprise'})
	} else {
		this. setVariableValues({access: 'Pro'})
	}

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				this. setVariableValues('router_' + element.label, element.label)
				this. setVariableValues('router_' + element.label + '_output', element.name)
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				this. setVariableValues('generator_' + element.label, element.label)
				this. setVariableValues('generator_' + element.label + '_loop', element.loop)
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				this. setVariableValues('retransmitter_' + element.label, element.label)
				this. setVariableValues('retransmitter_' + element.label + '_audioname', element.AudioNDIname)
				this. setVariableValues('retransmitter_' + element.label + '_audiostatus', element.AudioPlayStatus)
				this. setVariableValues('retransmitter_' + element.label + '_videoname', element.VideoNDIname)
				this. setVariableValues('retransmitter_' + element.label + '_videostatus', element.VideoPlayStatus)
			})
		}
	}
}
