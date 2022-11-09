// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	variables.push({ label: 'Software version', name: 'version' })
	variables.push({ label: 'Central 2.0 version', name: 'access' })

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				variables.push({ label: 'Router ' + element.label, name: 'router_' + element.label })
				variables.push({
					label: 'Router ' + element.label + ' current output',
					name: 'router_' + element.label + '_output',
				})
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				variables.push({ label: 'Generator ' + element.label, name: 'generator_' + element.label })
				variables.push({ label: 'Generator ' + element.label + ' loop', name: 'generator_' + element.label + '_loop' })
				variables.push({
					label: 'Generator ' + element.label + ' status',
					name: 'generator_' + element.label + '_status',
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
				variables.push({ label: 'Retransmitter ' + element.label, name: 'retransmitter_' + element.label })
				variables.push({
					label: 'Retransmitter ' + element.label + ' audio name',
					name: 'retransmitter_' + element.label + '_audioname',
				})
				variables.push({
					label: 'Retransmitter ' + element.label + ' audio status',
					name: 'retransmitter_' + element.label + '_audiostatus',
				})
				variables.push({
					label: 'Retransmitter ' + element.label + ' video name',
					name: 'retransmitter_' + element.label + '_videoname',
				})
				variables.push({
					label: 'Retransmitter ' + element.label + ' video status',
					name: 'retransmitter_' + element.label + '_videostatus',
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
exports.updateVariables = function () {
	this.setVariable('version', this.central.version)

	if (this.central.access < 0) {
		this.setVariable('access', 'Lite')
	} else if (this.central.access > 0) {
		this.setVariable('access', 'Enterprise')
	} else {
		this.setVariable('access', 'Pro')
	}

	if (this.central.access >= 0) {
		if (this.central.routers.length > 0) {
			this.central.routers.forEach((element, index) => {
				this.setVariable('router_' + element.label, element.label)
				this.setVariable('router_' + element.label + '_output', element.name)
			})
		}

		if (this.central.generators.length > 0) {
			this.central.generators.forEach((element, index) => {
				this.setVariable('generator_' + element.label, element.label)
				this.setVariable('generator_' + element.label + '_loop', element.loop)
			})
		}

		if (this.central.retransmitters.length > 0) {
			this.central.retransmitters.forEach((element, index) => {
				this.setVariable('retransmitter_' + element.label, element.label)
				this.setVariable('retransmitter_' + element.label + '_audioname', element.AudioNDIname)
				this.setVariable('retransmitter_' + element.label + '_audiostatus', element.AudioPlayStatus)
				this.setVariable('retransmitter_' + element.label + '_videoname', element.VideoNDIname)
				this.setVariable('retransmitter_' + element.label + '_videostatus', element.VideoPlayStatus)
			})
		}
	}
}
