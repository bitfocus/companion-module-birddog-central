const categories = [
	{ id: 0, category: 'Connect', actions: ['connectSourceToDest', 'connectSourceToDestGroup'] },
	{
		id: 1,
		category: 'Source',
		actions: ['addSourceGroup', 'delSourceGroup', 'addSourceToSourceGroup', 'delSourceFromSourceGroup'],
	},
	{ id: 2, category: 'Router', actions: ['addRouter', 'delRouter', 'linkRouter', 'sconnectRouter', 'dconnectRouter'] },
	{
		id: 3,
		category: 'Destination',
		actions: ['addDestGroup', 'delDestGroup', 'addDestToDestGroup', 'delDestFromDestGroup'],
	},
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

export function getActions() {
	let actions = {}

	// Common actions

	actions['connectSourceToDest'] = {
		name: 'Connect Source to Destination',
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
				multiple: true,
				choices: this.central.destinations,
				default: this.central.destinations[0] ? this.central.destinations[0].id : 'No Destinations Found',
			},
		],
		callback: ({ options }) => {
			let destArray = []
			let source = this.central.sources.find((element) => element.id == options.source)
			options.destination.forEach((dest) => {
				destArray.push(this.central.destinations.find((element) => element.id == dest).ip)
			})
			this.sendCommand('source', 'connect', {
				hname: source.hname,
				format: source.format,
				dest: JSON.stringify({ destinations: destArray }),
			})
		},
	}

	actions['addGenerator'] = {
		name: 'Add Generator',
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
		name: 'Delete Generator',
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
		name: 'Add Playlist Source to Generator',
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
		name: 'Delete Playlist Source from Generator',
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
		name: 'Generator Media Control',
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
					let currentState = this.central.generators.find((element) => element.id == options.generator).loop
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
			name: 'Add Source Group',
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
			name: 'Delete Source Group',
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
			name: 'Add Source to Source Group',
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
				let source = this.central.sources.find((element) => element.id == options.source)
				this.sendCommand('source', 'add_srs', {
					gname: options.group,
					hname: source.hname,
					format: source.format,
				})
			},
		}

		actions['delSourceFromSourceGroup'] = {
			name: 'Delete Source from Source Group',
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
				let source = this.central.sources.find((element) => element.id == options.source)
				this.sendCommand('source', 'del_srs', {
					gname: options.group,
					hname: source.hname,
					format: source.format,
				})
			},
		}

		actions['connectSourceToDestGroup'] = {
			name: 'Connect Source to Destination Group',
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
				let source = this.central.sources.find((element) => element.id == options.source)
				this.sendCommand('source', 'connect', {
					gname: options.group,
					hname: source.hname,
					format: source.format,
				})
			},
		}

		actions['addDestGroup'] = {
			name: 'Add Destination Group',
			options: [
				{
					type: 'textinput',
					label: 'New Destination Group',
					id: 'group',
				},
			],
			callback: ({ options }) => {
				this.sendCommand('dest', 'add_fav_grp', { gname: options.group })
			},
		}

		actions['delDestGroup'] = {
			name: 'Delete Destination Group',
			options: [
				{
					type: 'dropdown',
					label: 'Delete Destination Group',
					id: 'group',
					choices: this.central.destgroups,
					default: this.central.destgroups[0] ? this.central.destgroups[0].id : 'No Destination Groups Found',
				},
			],
			callback: ({ options }) => {
				this.sendCommand('dest', 'del_fav_grp', { gname: options.group })
			},
		}

		actions['addDestToDestGroup'] = {
			name: 'Add Destination to Destination Group',
			options: [
				{
					type: 'dropdown',
					label: 'Select Group',
					id: 'group',
					choices: this.central.destgroups,
					default: this.central.destgroups[0] ? this.central.destgroups[0].id : 'No Destination Groups Found',
				},
				{
					type: 'dropdown',
					label: 'Select Destination',
					id: 'dest',
					choices: this.central.destinations,
					default: this.central.destinations[0] ? this.central.destinations[0].id : 'No Destinations Found',
				},
			],
			callback: ({ options }) => {
				let dest = this.central.destinations.find((element) => element.id == options.dest)
				this.sendCommand('dest', 'add_srs', {
					gname: options.group,
					hname: dest.hname,
					format: dest.format,
				})
			},
		}

		actions['delDestFromDestGroup'] = {
			name: 'Delete Destination from Destination Group',
			options: [
				{
					type: 'dropdown',
					label: 'Select Group',
					id: 'group',
					choices: this.central.destgroups,
					default: this.central.destgroups[0] ? this.central.destgroups[0].id : 'No Destination Groups Found',
				},
				{
					type: 'dropdown',
					label: 'Select Destination',
					id: 'dest',
					choices: this.central.destinations,
					default: this.central.destinations[0] ? this.central.destinations[0].id : 'No Destinations Found',
				},
			],
			callback: ({ options }) => {
				let dest = this.central.destinations.find((element) => element.id == options.dest)
				this.sendCommand('dest', 'del_srs', {
					gname: options.group,
					hname: dest.hname,
					format: dest.format,
				})
			},
		}

		actions['addRouter'] = {
			name: 'Add Router',
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
			name: 'Delete Router',
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
			name: 'Link Source Group to Router',
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
			name: 'Connect Source to Router',
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

		actions['dconnectRouter'] = {
			label: 'Connect Router to Destination',
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
					label: 'Select Destination',
					id: 'destination',
					multiple: true,
					choices: this.central.destinations,
					default: this.central.destinations[0] ? this.central.destinations[0].id : 'No Destinations Found',
				},
			],
			callback: ({ options }) => {
				let destArray = []
				options.destination.forEach((dest) => {
					destArray.push(this.central.destinations.find((element) => element.id == dest).ip)
				})
				this.sendCommand('router', 'dconnect', {
					name: options.router,
					dest: JSON.stringify({ destinations: destArray }),
				})
			},
		}

		actions['addRetransmitter'] = {
			name: 'Add Retransmitter',
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
			name: 'Delete Retransmitter',
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
			name: 'Connect Video Source to Retransmitter',
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
			name: 'Connect Audio Source to Retransmitter',
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
			name: 'Retransmitter Media Control',
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
	return actions
	//return Object.fromEntries(Object.entries(actions).sort(sortByCategory))
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
