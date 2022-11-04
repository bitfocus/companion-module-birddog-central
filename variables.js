// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	variables.push({ label: 'Software version', name: 'version' })
	variables.push({ label: 'Central 2.0 version', name: 'access' })

	this.setVariableDefinitions(variables)
}

// remove this comment

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
