const categories = [
	{ id: 0, category: 'Connect', actions: ['connectSourceToDest', 'connectSourceToDestGroup'] },
	{
		id: 1,
		category: 'Source',
		actions: ['addSourceGroup', 'delSourceGroup', 'addSourceToSourceGroup', 'delSourceFromSourceGroup'],
	},
	{ id: 2, category: 'Router', actions: ['addRouter', 'delRouter', 'linkRouter', 'sconnectRouter'] },
	{ id: 3, category: 'Destination', actions: [] },
	{
		id: 4,
		category: 'Generator',
		actions: [
			'addGenerator',
			'delGenerator',
			'addPlaylistToGenerator',
			'delPlaylistFromGenerator',
			'generatorMediaControl',
		],
	},
	{
		id: 5,
		category: 'Retransmitter',
		actions: [
			'addRetransmitter',
			'delRetransmitter',
			'vconnectRetransmitter',
			'aconnectRetransmitter',
			'mediaControlRetransmitter',
		],
	},
]

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
					default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources found',
				},
				{
					type: 'dropdown',
					label: 'Select Destination',
					id: 'destination',
					choices: this.central.destinations,
					default: this.central.destinations[0] ? this.central.destinations[0].id : 'No Destinations Found',
				},
			],
			callback: ({ options }) => {
				let source = sourceDetails(options.source)
				//this.sendCommand('source', 'connect', {
				//	dest: options.destination,
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
					default: this.central.generators[0] ? this.central.generators[0].id : 'No Generators Found',
				},
			],
			callback: ({ options }) => {
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
					default: this.central.generators[0] ? this.central.generators[0].id : 'No Generators Found',
				},
				{
					type: 'dropdown',
					label: 'Select Playlist Source',
					id: 'playlist',
					choices: this.central.gen_sources,
					default: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'No Playlist Sources Found',
				},
			],
			callback: ({ options }) => {
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
					default: this.central.generators[0] ? this.central.generators[0].id : 'No Generators Found',
				},
				{
					type: 'dropdown',
					label: 'Select Playlist Source',
					id: 'playlist',
					choices: this.central.gen_sources,
					default: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'No Playlist Sources Found',
				},
			],
			callback: ({ options }) => {
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
					default: this.central.generators[0] ? this.central.generators[0].id : 'No Generators Found',
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
					default: 'play',
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
				if (options.control == 'loop') {
					let loop = options.loop
					if (options.loop == 'TOGGLE') {
						let currentState = this.central.generators.find((element) => (element.id = options.generator)).loop
						switch (currentState) {
							case 'TRUE':
								loop = 'FALSE'
								break
							case 'FALSE':
								loop = 'TRUE'
								break
						}
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
						default: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'No Source Groups Found',
					},
				],
				callback: ({ options }) => {
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
						default: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'No Source Groups Found',
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
					},
				],
				callback: ({ options }) => {
					let source = sourceDetails(options.source)
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
						default: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'No Source Groups Found',
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
					},
				],
				callback: ({ options }) => {
					let source = sourceDetails(options.source)
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
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
					},
					{
						type: 'dropdown',
						label: 'Select Destination Group',
						id: 'group',
						choices: this.central.destgroups,
						default: this.central.destgroups[0] ? this.central.destgroups[0].id : 'No Destinsation Groups Found',
					},
				],
				callback: ({ options }) => {
					let source = sourceDetails(options.source)
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
						default: this.central.routers[0] ? this.central.routers[0].id : 'No Routers Found',
					},
				],
				callback: ({ options }) => {
					this.sendCommand('router', 'del', { name: options.router })
				},
			}

			actions['linkRouter'] = {
				label: 'Link Source Group to Router',
				options: [
					{
						type: 'dropdown',
						label: 'Select Source Group',
						id: 'group',
						choices: this.central.sourcegroups,
						default: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'No Source Groups Found',
					},
					{
						type: 'dropdown',
						label: 'Select Router',
						id: 'router',
						choices: this.central.routers,
						default: this.central.routers[0] ? this.central.routers[0].id : 'No Routers Found',
					},
				],
				callback: ({ options }) => {
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
						default: this.central.routers[0] ? this.central.routers[0].id : 'No Routers Found',
					},
					{
						type: 'dropdown',
						label: 'Select Source',
						id: 'source',
						choices: this.central.sources,
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
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
						default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'No Retransmitters Found',
					},
				],
				callback: ({ options }) => {
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
						default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'No Retransmitters Found',
					},
					{
						type: 'dropdown',
						label: 'Select Source for Video',
						id: 'source',
						choices: this.central.sources,
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
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
						default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'No Retransmitters Found',
					},
					{
						type: 'dropdown',
						label: 'Select Source for Audio',
						id: 'source',
						choices: this.central.sources,
						default: this.central.sources[0] ? this.central.sources[0].id : 'No Sources Found',
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
				label: 'Retransmitter Media Control',
				options: [
					{
						type: 'dropdown',
						label: 'Select Retransmitter',
						id: 'retransmitter',
						choices: this.central.retransmitters,
						default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'No Retransmitters Found',
					},
					{
						type: 'dropdown',
						label: 'Select Control',
						id: 'control',
						choices: [
							{ id: 'play', label: 'Play' },
							{ id: 'stop', label: 'Stop' },
							{ id: 'astop', label: 'Stop Audio' },
							{ id: 'vstop', label: 'Stop Video' },
						],
						default: 'play',
					},
				],
				callback: ({ options }) => {
					this.sendCommand('retransmtr', options.control, { name: options.retransmitter })
				},
			}
		}

		return Object.fromEntries(Object.entries(actions).sort(sortByCategory))
	},
}
function sourceDetails(string) {
	let result = {}
	let source = string.split('(')
	result.hname = source[0].trim()
	result.format = source[1].split(')')[0].trim()
	return result
}

function sortByCategory(a, b) {
	categoryA = categories.find((element) => element.actions.includes(a[0])).id
	categoryB = categories.find((element) => element.actions.includes(b[0])).id
	if (categoryA < categoryB) {
		return -1
	}
	if (categoryA > categoryB) {
		return 1
	}
	return 0
}
