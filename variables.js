// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	variables.push({ label: 'Software version', name: 'version' })
	variables.push({ label: 'Central 2.0 version', name: 'access' })

	if (this.central.generators.length > 0) {
		console.log('-- in update new variables')
		console.log('--- generators contains: ', this.central.generators)
		this.central.generators.forEach((element, index) => {
			console.log('---- in generator array. Element is: ', element)
			console.log('---- index is ', index)
			console.log('---- existing variables are ', variables)
			variables.push({ label: 'Generator ' + element.label, name: 'generator_' + element.label })
			variables.push({ label: 'Generator ' + element.label + ' loop', name: 'generator_' + element.label + '_loop' })
			variables.push({
				label: 'Generator ' + element.label + ' status',
				name: 'generator_' + element.label + '_status',
			})
		})
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
}
