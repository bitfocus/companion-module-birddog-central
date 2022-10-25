module.exports = {
	getActions() {
		let actions = {}

		// Common actions

		actions['connectSourceToDest'] = {
			label: 'Connect Source to Destination',
			options: [
				{
					type: 'dropdown',
					label: 'Select Source',
					id: 'source',
					choices: this.central.sources,
					default: '',
				},
				{
					type: 'dropdown',
					label: 'Select Destination',
					id: 'destinations',
					choices: this.central.destinations,
					default: '',
				},
			],
			callback: ({ options }) => {
				this.debug('---- in connectSourceToDest action')
				this.debug('---- destination is ', options.destinations)
				this.debug('---- source is ', options.source)
				let source = this.sourceDetails(options.source)
				this.debug('---- hname is ', source.hname)
				this.debug('---- format is ', source.format)
				//this.sendCommand('source', 'connect', {
				//	dest: options.destinations,
				//	hname: source.hname,
				//	format: source.format,
				//})
			},
		}

		actions['addGenerator'] = {
			label: 'Add Generator',
			options: [
				{
					type: 'textinput',
					label: 'New Generator',
					id: 'generator',
				},
			],
			callback: ({ options }) => {
				this.debug('---- in addGenerator action')
				this.debug('---- generator is ', options.generator)
				this.sendCommand('gen', 'add_fav_grp', { gname: options.generator })
			},
		}

		actions['delGenerator'] = {
			label: 'Delete Generator',
			options: [
				{
					type: 'dropdown',
					label: 'Choose Generator to delete',
					id: 'generator',
					choices: this.central.generators,
					default: 'Choose group...',
					//...this.convertChoices(this.central.sourcegroups),
				},
			],
			callback: ({ options }) => {
				this.debug('---- in delGenerator action')
				this.debug('---- generator is ', options.generator)
				this.sendCommand('gen', 'del_fav_grp', { gname: options.generator })
			},
		}

		actions['addPlaylistToGenerator'] = {
			label: 'Add Playlist Source to Generator',
			options: [
				{
					type: 'dropdown',
					label: 'Select Generator',
					id: 'generator',
					choices: this.central.generators,
				},
				{
					type: 'dropdown',
					label: 'Select Playlist Source',
					id: 'playlist',
					choices: this.central.gen_sources,
				},
			],
			callback: ({ options }) => {
				this.debug('---- in addPlaylistToGenerator action')
				this.debug('---- generator is ', options.generator)
				this.debug('---- playlist is ', options.playlist)
				this.sendCommand('gen', 'add_srs', {
					gname: options.generator,
					name: options.playlist,
				})
			},
		}

		actions['delPlaylistFromGenerator'] = {
			label: 'Delete Playlist Source from Generator',
			options: [
				{
					type: 'dropdown',
					label: 'Select Generator',
					id: 'generator',
					choices: this.central.generators,
				},
				{
					type: 'dropdown',
					label: 'Select Playlist Source',
					id: 'playlist',
					choices: this.central.gen_sources,
				},
			],
			callback: ({ options }) => {
				this.debug('---- in addPlaylistToGenerator action')
				this.debug('---- generator is ', options.generator)
				this.debug('---- playlist is ', options.playlist)
				this.sendCommand('gen', 'del_srs', {
					gname: options.generator,
					name: options.playlist,
				})
			},
		}

		actions['generatorMediaControl'] = {
			label: 'Generator Media Control',
			options: [
				{
					type: 'dropdown',
					label: 'Select Generator',
					id: 'generator',
					choices: this.central.generators,
				},
				{
					type: 'dropdown',
					label: 'Select Control',
					id: 'control',
					choices: [
						{ id: 'play', label: 'Play' },
						{ id: 'stop', label: 'Stop' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'skip', label: 'Skip' },
						{ id: 'loop', label: 'Loop' },
					],
				},
				{
					type: 'dropdown',
					label: 'Loop Toggle/On/Off',
					id: 'loop',
					choices: [
						{ id: 'TOGGLE', label: 'Toggle' },
						{ id: 'TRUE', label: 'On' },
						{ id: 'FALSE', label: 'Off' },
					],
					default: 'TRUE',
					isVisible: (action) => action.options.control === 'loop',
				},
			],
			callback: ({ options }) => {
				this.debug('---- in generatorMediaControl action')
				this.debug('---- generator is ', options.generator)
				this.debug('---- control is ', options.control)
				if (options.control == 'loop') {
					let loop = options.loop
					if (options.loop == 'TOGGLE') {
						let currentState = this.central.generators.find((element) => (element.id = options.generator)).loop
						this.debug('---- current loop is ', currentState)
						switch (currentState) {
							case 'TRUE':
								loop = 'FALSE'
								break
							case 'FALSE':
								loop = 'TRUE'
								break
						}
						this.debug('---- new loop is ', currentState)
					}
					this.sendCommand('gen', options.control, {
						gname: options.generator,
						loop: loop,
					})
				} else {
					this.sendCommand('gen', options.control, {
						gname: options.generator,
					})
				}
			},
		}

		// Actions for Pro / Enterprise

		if (this.central.access >= 0) {
			actions['addSourceGroup'] = {
				label: 'Add Source Group',
				options: [
					{
						type: 'textinput',
						label: 'New Source Group',
						id: 'group',
					},
				],
				callback: ({ options }) => {
					this.debug('---- in addSourceGroup action')
					this.debug('---- group is ', options.group)
					this.sendCommand('source', 'add_fav_grp', { gname: options.group })
				},
			}

			actions['delSourceGroup'] = {
				label: 'Delete Source Group',
				options: [
					{
						type: 'dropdown',
						label: 'Delete Source Group',
						id: 'group',
						choices: this.central.sourcegroups,
						default: 'Choose group...',
						//...this.convertChoices(this.central.sourcegroups),
					},
				],
				callback: ({ options }) => {
					this.debug('---- in delSourceGroup action')
					this.debug('---- group is ', options.group)
					this.sendCommand('source', 'del_fav_grp', { gname: options.group })
				},
			}

			actions['addSourceToSourceGroup'] = {
				label: 'Add Source to Source Group',
				options: [
					{
						type: 'dropdown',
						label: 'Select Group',
						id: 'group',
						choices: this.central.sourcegroups,
						//...this.convertChoices(this.central.sourcegroups),
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						//...this.convertChoices(this.central.sources),
					},
				],
				callback: ({ options }) => {
					this.debug('---- in addSourceToSourceGroup action')
					this.debug('---- group is ', options.group)
					this.debug('---- source is ', options.source)
					let source = this.sourceDetails(options.source)
					this.debug('---- hame is ', source.hname)
					this.debug('---- format is ', source.format)
					this.sendCommand('source', 'add_srs', {
						gname: options.group,
						hname: source.hname,
						format: source.format,
					})
				},
			}

			actions['delSourceFromSourceGroup'] = {
				label: 'Delete Source from Source Group',
				options: [
					{
						type: 'dropdown',
						label: 'Select Group',
						id: 'group',
						choices: this.central.sourcegroups,
						//...this.convertChoices(this.central.sourcegroups),
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						//...this.convertChoices(this.central.sources),
					},
				],
				callback: ({ options }) => {
					this.debug('---- in delSourceFromSourceGroup action')
					this.debug('---- group is ', options.group)
					this.debug('---- source is ', options.source)
					let source = this.sourceDetails(options.source)
					this.debug('---- hame is ', source.hname)
					this.debug('---- format is ', source.format)
					this.sendCommand('source', 'del_srs', {
						gname: options.group,
						hname: source.hname,
						format: source.format,
					})
				},
			}

			actions['connectSourceToDestGroup'] = {
				label: 'Connect Source to Destination Group',
				options: [
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						default: '',
					},
					{
						type: 'dropdown',
						label: 'Select Destination Group',
						id: 'group',
						choices: this.central.destgroups,
						default: '',
					},
				],
				callback: ({ options }) => {
					this.debug('---- in connectSourceToDestGroup action')
					this.debug('---- group is ', options.group)
					this.debug('---- source is ', options.source)
					let source = this.sourceDetails(options.source)
					this.debug('---- hame is ', source.hname)
					this.debug('---- format is ', source.format)
					this.sendCommand('source', 'connect', {
						gname: options.group,
						hname: source.hname,
						format: source.format,
					})
				},
			}

			actions['addRouter'] = {
				label: 'Add Router',
				options: [
					{
						type: 'textinput',
						label: 'New Router',
						id: 'router',
					},
				],
				callback: ({ options }) => {
					this.debug('---- in addRouter action')
					this.debug('---- router is ', options.router)
					this.sendCommand('router', 'add', { name: options.router })
				},
			}

			actions['delRouter'] = {
				label: 'Delete Router',
				options: [
					{
						type: 'dropdown',
						label: 'Choose Router to delete',
						id: 'router',
						choices: this.central.routers,
					},
				],
				callback: ({ options }) => {
					this.debug('---- in delRouter action')
					this.debug('---- router is ', options.router)
					this.sendCommand('router', 'del', { name: options.router })
				},
			}

			actions['linkRouter'] = {
				label: 'Link Source Group to Router',
				options: [
					{
						type: 'dropdown',
						label: 'Select Router',
						id: 'router',
						choices: this.central.routers,
					},
					{
						type: 'dropdown',
						label: 'Select Source Group',
						id: 'group',
						choices: this.central.sourcegroups,
					},
				],
				callback: ({ options }) => {
					this.debug('---- in linkRouter action')
					this.debug('---- router is ', options.router)
					this.debug('---- source group is ', options.group)
					this.sendCommand('router', 'link', { gname: options.group, name: options.router })
				},
			}

			actions['sconnectRouter'] = {
				label: 'Connect Source to Router',
				options: [
					{
						type: 'dropdown',
						label: 'Select Router',
						id: 'router',
						choices: this.central.routers,
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
					},
				],
				callback: ({ options }) => {
					let source = this.central.sources.find((element) => element.id == options.source)
					this.sendCommand('router', 'sconnect', {
						hname: source.host_name,
						format: source.format,
						name: options.router,
					})
				},
			}

			actions['addRetransmitter'] = {
				label: 'Add Retransmitter',
				options: [
					{
						type: 'textinput',
						label: 'New Retransmitter',
						id: 'retransmitter',
					},
				],
				callback: ({ options }) => {
					this.debug('---- in addRetransmitter action')
					this.debug('---- retransmitter is ', options.retransmitter)
					this.sendCommand('retransmtr', 'add', { name: options.retransmitter })
				},
			}

			actions['delRetransmitter'] = {
				label: 'Delete Retransmitter',
				options: [
					{
						type: 'dropdown',
						label: 'Choose Retransmitter to delete',
						id: 'retransmitter',
						choices: this.central.retransmitters,
						default: 'Choose retransmitter...',
					},
				],
				callback: ({ options }) => {
					this.debug('---- in delRetransmitter action')
					this.debug('---- retransmitter is ', options.retransmitter)
					this.sendCommand('retransmtr', 'delete', { name: options.retransmitter })
				},
			}

			actions['vconnectRetransmitter'] = {
				label: 'Connect Video Source to Retransmitter',
				options: [
					{
						type: 'dropdown',
						label: 'Select Retransmitter',
						id: 'retransmitter',
						choices: this.central.retransmitters,
					},
					{
						type: 'dropdown',
						label: 'Select Source for Video',
						id: 'source',
						choices: this.central.sources,
					},
				],
				callback: ({ options }) => {
					let source = this.central.sources.find((element) => element.id == options.source)
					this.sendCommand('retransmtr', 'vconnect', {
						hname: source.host_name,
						format: source.format,
						name: options.retransmitter,
					})
				},
			}

			actions['aconnectRetransmitter'] = {
				label: 'Connect Audio Source to Retransmitter',
				options: [
					{
						type: 'dropdown',
						label: 'Select Retransmitter',
						id: 'retransmitter',
						choices: this.central.retransmitters,
					},
					{
						type: 'dropdown',
						label: 'Select Source for Audio',
						id: 'source',
						choices: this.central.sources,
					},
				],
				callback: ({ options }) => {
					let source = this.central.sources.find((element) => element.id == options.source)
					this.sendCommand('retransmtr', 'aconnect', {
						hname: source.host_name,
						format: source.format,
						name: options.retransmitter,
					})
				},
			}

			actions['mediaControlRetransmitter'] = {
				label: 'Retranmitter Media Control',
				options: [
					{
						type: 'dropdown',
						label: 'Select Retransmitter',
						id: 'retransmitter',
						choices: this.central.retransmitters,
					},
					{
						type: 'dropdown',
						label: 'Select Control',
						id: 'control',
						choices: [
							{ id: 'astop', label: 'Stop Audio' },
							{ id: 'vstop', label: 'Stop Video' },
							{ id: 'stop', label: 'Stop' },
							{ id: 'play', label: 'Play' },
						],
					},
				],
				callback: ({ options }) => {
					this.debug('---- in mediaControlRetransmitter action')
					this.debug('---- retransmitter is ', options.retransmitter)
					this.debug('---- control is ', options.control)
					this.sendCommand('retransmtr', options.control, { name: options.retransmitter })
				},
			}
		}

		return actions
	},

	sourceDetails(string) {
		let result = {}
		let source = string.split('(')
		result.hname = source[0].trim()
		result.format = source[1].split(')')[0].trim()
		return result
	},

	convertChoices(choices) {
		if (choices.length != 0) {
			return { choices: choices, default: choices[0].id }
		} else return
	},

	userDefinedGroups(str, array) {
		let idx = array.findIndex((element) => (element.id = str))
		array.splice(idx, 1)
		return array
	},
}
