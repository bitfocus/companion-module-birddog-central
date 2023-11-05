import { combineRgb } from '@companion-module/base'

export function getPresets() {
	let presets = {}
	const ColorWhite = combineRgb(255, 255, 255) // White
	const ColorBlack = combineRgb(0, 0, 0) // Black
	const ColorRed = combineRgb(255, 0, 0) // Red
	const ColorGreen = combineRgb(0, 255, 0) // Green
	const ColorOrange = combineRgb(255, 102, 0) // Orange

	// Common Presets

	presets[`srcToDest`] = {
		type: 'button',
		category: 'Connect',
		name: 'Connect Source to Destination',
		options: {},
		style: {
			text: 'Connect Src\\nto Dest',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'connectSourceToDest',
						options: {
							source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							destination: this.central.destinations[0] ? this.central.destinations[0].id : 'select destination',
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`addGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Add Generator',
		options: {},
		style: {
			text: 'Add\\nGenerator',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'addGenerator',
					},
				],
				up: [],
			},
		],
	}

	presets[`deleteGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Delete Generator',
		options: {},
		style: {
			text: 'Delete\\nGenerator',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'addGenerator',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`playlistToGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Add Playlist Source to Generator',
		options: {},
		style: {
			text: 'Add\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'addPlaylistToGenerator',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							playlist: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'select playlist',
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`deletePlaylisteToGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Delete Playlist Source from Generator',
		options: {},
		style: {
			text: 'Add\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'delPlaylistFromGenerator',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							playlist: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'select playlist',
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`playPlatListGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Play Playlist',
		options: {},
		style: {
			text: 'Play\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'generatorMediaControl',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							control: 'play',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'generatorMediaStatus',
				options: { control: 'play' },
				style: {
					color: ColorBlack,
					bgcolor: ColorGreen,
				},
			},
		],
	}

	presets[`stopPlaylistGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Stop Playlist',
		options: {},
		style: {
			text: 'Stop\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'generatorMediaControl',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							control: 'stop',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'generatorMediaStatus',
				options: { control: 'stop' },
				style: {
					color: ColorBlack,
					bgcolor: ColorGreen,
				},
			},
		],
	}

	presets[`pausePlaylistGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Pause Playlist',
		options: {},
		style: {
			text: 'Pause\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'generatorMediaControl',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							control: 'pause',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'generatorMediaStatus',
				options: { control: 'pause' },
				style: {
					color: ColorBlack,
					bgcolor: ColorGreen,
				},
			},
		],
	}

	presets[`nextPlaylistGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Next in Playlist',
		options: {},
		style: {
			text: 'Next\\nin Playlist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'generatorMediaControl',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							control: 'skip',
						},
					},
				],
				up: [],
			},
		],
	}

	presets[`looptPlaylistGenerator`] = {
		type: 'button',
		category: 'Generator',
		name: 'Loop Playlist',
		options: {},
		style: {
			text: 'Loop\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'generatorMediaControl',
						options: {
							generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
							control: 'loop',
							loop: 'TOGGLE',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'generatorMediaStatus',
				options: { control: 'loop', loop: 'TRUE' },
				style: {
					color: ColorBlack,
					bgcolor: ColorGreen,
				},
			},
		],
	}

	if (this.central.access >= 0) {
		presets[`addSourceGroup`] = {
			type: 'button',
			category: 'Source',
			name: 'Add Source Group',
			options: {},
			style: {
				text: 'Add\\nSource Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'addSourceGroup',
						},
					],
					up: [],
				},
			],
		}

		presets[`deleteSourceGroup`] = {
			type: 'button',
			category: 'Source',
			name: 'Delete Source Group',
			options: {},
			style: {
				text: 'Add\\nSource Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'delSourceGroup',
							options: {
								group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`addSourceToGroup`] = {
			type: 'button',
			category: 'Source',
			name: 'Add Source to Source Group',
			options: {},
			style: {
				text: 'Add Source\\nto Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'addSourceToSourceGroup',
							options: {
								group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`deleteSourceFromGroup`] = {
			type: 'button',
			category: 'Source',
			name: 'Delete Source from Source Group',
			options: {},
			style: {
				text: 'Delete Source\\nfrom Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'delSourceFromSourceGroup',
							options: {
								group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`connectSourcetoDestGroup`] = {
			type: 'button',
			category: 'Connect',
			name: 'Connect Source to Destination Group',
			options: {},
			style: {
				text: 'Connect Source\\nto Dest Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'connectSourceToDestGroup',
							options: {
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
								group: this.central.destgroups[0] ? this.central.destgroups[0].id : 'select destination groups',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`addRouter`] = {
			type: 'button',
			category: 'Router',
			name: 'Add Router',
			options: {},
			style: {
				text: 'Add\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'addRouter',
							options: {
								router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`deleteRouter`] = {
			type: 'button',
			category: 'Router',
			name: 'Delete Router',
			options: {},
			style: {
				text: 'Delete\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'delRouter',
							options: {
								router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`linkSourceGroupToRouter`] = {
			type: 'button',
			category: 'Router',
			name: 'Link Source Group to Router',
			options: {},
			style: {
				text: 'Link to\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'linkRouter',
							options: {
								router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
								group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`connectSourceToRouter`] = {
			type: 'button',
			category: 'Router',
			name: 'Connect Source to Router',
			options: {},
			style: {
				text: 'Connect Source\\nto Router',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sconnectRouter',
							options: {
								router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`addRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Add Retransmitter',
			options: {},
			style: {
				text: 'Add\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'addRetransmitter',
						},
					],
					up: [],
				},
			],
		}

		presets[`deleteRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Delete Retransmitter',
			options: {},
			style: {
				text: 'Delete\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'delRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`connectAudioRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Connect Audio Source to Retransmitter',
			options: {},
			style: {
				text: 'Connect\\nAudio\\nto Retransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'aconnectRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`connectVideoRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Connect Video Source to Retransmitter',
			options: {},
			style: {
				text: 'Connect\\nVideo\\nto Retransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'vconnectRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`playRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Play Retransmitter',
			options: {},
			style: {
				text: 'Play\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'mediaControlRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								control: 'play',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`stopRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Stop Retransmitter',
			options: {},
			style: {
				text: 'Stop\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'mediaControlRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								control: 'stop',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`stopAudioRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Stop Audio Retransmitter',
			options: {},
			style: {
				text: 'Stop Audio\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'mediaControlRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								control: 'astop',
							},
						},
					],
					up: [],
				},
			],
		}

		presets[`stopVideoRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			name: 'Stop Video Retransmitter',
			options: {},
			style: {
				text: 'Stop Video\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'mediaControlRetransmitter',
							options: {
								retransmitter: this.central.retransmitters[0]
									? this.central.retransmitters[0].id
									: 'select retransmitter',
								control: 'vstop',
							},
						},
					],
					up: [],
				},
			],
		}
	}

	return presets
}
