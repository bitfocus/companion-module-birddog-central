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
		label: 'Connect Source to Destination',
		bank: {
			style: 'text',
			text: 'Connect Src\\nto Dest',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'connectSourceToDest',
				options: {
					source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					destination: this.central.destinations[0] ? this.central.destinations[0].id : 'select destination',
				},
			},
		],
	}

	presets[`addGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Add Generator',
		bank: {
			style: 'text',
			text: 'Add\\nGenerator',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'addGenerator',
			},
		],
	}

	presets[`deleteGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Delete Generator',
		bank: {
			style: 'text',
			text: 'Delete\\nGenerator',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'addGenerator',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
				},
			},
		],
	}

	presets[`playlistToGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Add Playlist Source to Generator',
		bank: {
			style: 'text',
			text: 'Add\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'addPlaylistToGenerator',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					playlist: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'select playlist',
				},
			},
		],
	}

	presets[`deletePlaylisteToGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Delete Playlist Source from Generator',
		bank: {
			style: 'text',
			text: 'Add\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'delPlaylistFromGenerator',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					playlist: this.central.gen_sources[0] ? this.central.gen_sources[0].id : 'select playlist',
				},
			},
		],
	}

	presets[`playPlatListGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Play Playlist',
		bank: {
			style: 'text',
			text: 'Play\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'generatorMediaControl',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					control: 'play',
				},
			},
		],
		feedbacks: [
			{
				type: 'generatorMediaStatus',
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
		label: 'Stop Playlist',
		bank: {
			style: 'text',
			text: 'Stop\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'generatorMediaControl',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					control: 'stop',
				},
			},
		],
		feedbacks: [
			{
				type: 'generatorMediaStatus',
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
		label: 'Pause Playlist',
		bank: {
			style: 'text',
			text: 'Pause\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'generatorMediaControl',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					control: 'pause',
				},
			},
		],
		feedbacks: [
			{
				type: 'generatorMediaStatus',
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
		label: 'Next in Playlist',
		bank: {
			style: 'text',
			text: 'Next\\nin Playlist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'generatorMediaControl',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					control: 'skip',
				},
			},
		],
	}

	presets[`looptPlaylistGenerator`] = {
		type: 'button',
		category: 'Generator',
		label: 'Loop Playlist',
		bank: {
			style: 'text',
			text: 'Loop\\nPlaylist',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		actions: [
			{
				action: 'generatorMediaControl',
				options: {
					generator: this.central.generators[0] ? this.central.generators[0].id : 'select generator',
					control: 'loop',
					loop: 'TOGGLE',
				},
			},
		],
		feedbacks: [
			{
				type: 'generatorMediaStatus',
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
			label: 'Add Source Group',
			bank: {
				style: 'text',
				text: 'Add\\nSource Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'addSourceGroup',
				},
			],
		}

		presets[`deleteSourceGroup`] = {
			type: 'button',
			category: 'Source',
			label: 'Delete Source Group',
			bank: {
				style: 'text',
				text: 'Add\\nSource Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'delSourceGroup',
					options: {
						group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
					},
				},
			],
		}

		presets[`addSourceToGroup`] = {
			type: 'button',
			category: 'Source',
			label: 'Add Source to Source Group',
			bank: {
				style: 'text',
				text: 'Add Source\\nto Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'addSourceToSourceGroup',
					options: {
						group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					},
				},
			],
		}

		presets[`deleteSourceFromGroup`] = {
			type: 'button',
			category: 'Source',
			label: 'Delete Source from Source Group',
			bank: {
				style: 'text',
				text: 'Delete Source\\nfrom Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'delSourceFromSourceGroup',
					options: {
						group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					},
				},
			],
		}

		presets[`connectSourcetoDestGroup`] = {
			type: 'button',
			category: 'Connect',
			label: 'Connect Source to Destination Group',
			bank: {
				style: 'text',
				text: 'Connect Source\\nto Dest Group',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'connectSourceToDestGroup',
					options: {
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
						group: this.central.destgroups[0] ? this.central.destgroups[0].id : 'select destination groups',
					},
				},
			],
		}

		presets[`addRouter`] = {
			type: 'button',
			category: 'Router',
			label: 'Add Router',
			bank: {
				style: 'text',
				text: 'Add\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'addRouter',
					options: {
						router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
					},
				},
			],
		}

		presets[`deleteRouter`] = {
			type: 'button',
			category: 'Router',
			label: 'Delete Router',
			bank: {
				style: 'text',
				text: 'Delete\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'delRouter',
					options: {
						router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
					},
				},
			],
		}

		presets[`linkSourceGroupToRouter`] = {
			type: 'button',
			category: 'Router',
			label: 'Link Source Group to Router',
			bank: {
				style: 'text',
				text: 'Link to\\nRouter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'linkRouter',
					options: {
						router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
						group: this.central.sourcegroups[0] ? this.central.sourcegroups[0].id : 'select source group',
					},
				},
			],
		}

		presets[`connectSourceToRouter`] = {
			type: 'button',
			category: 'Router',
			label: 'Connect Source to Router',
			bank: {
				style: 'text',
				text: 'Connect Source\\nto Router',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'sconnectRouter',
					options: {
						router: this.central.routers[0] ? this.central.routers[0].id : 'select router',
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					},
				},
			],
		}

		presets[`addRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Add Retransmitter',
			bank: {
				style: 'text',
				text: 'Add\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'addRetransmitter',
				},
			],
		}

		presets[`deleteRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Delete Retransmitter',
			bank: {
				style: 'text',
				text: 'Delete\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'delRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
					},
				},
			],
		}

		presets[`connectAudioRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Connect Audio Source to Retransmitter',
			bank: {
				style: 'text',
				text: 'Connect\\nAudio\\nto Retransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'aconnectRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					},
				},
			],
		}

		presets[`connectVideoRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Connect Video Source to Retransmitter',
			bank: {
				style: 'text',
				text: 'Connect\\nVideo\\nto Retransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'vconnectRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						source: this.central.sources[0] ? this.central.sources[0].id : 'select source',
					},
				},
			],
		}

		presets[`playRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Play Retransmitter',
			bank: {
				style: 'text',
				text: 'Play\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'mediaControlRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						control: 'play',
					},
				},
			],
		}

		presets[`stopRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Stop Retransmitter',
			bank: {
				style: 'text',
				text: 'Stop\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'mediaControlRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						control: 'stop',
					},
				},
			],
		}

		presets[`stopAudioRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Stop Audio Retransmitter',
			bank: {
				style: 'text',
				text: 'Stop Audio\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'mediaControlRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						control: 'astop',
					},
				},
			],
		}

		presets[`stopVideoRetransmitter`] = {
			type: 'button',
			category: 'Retransmitter',
			label: 'Stop Video Retransmitter',
			bank: {
				style: 'text',
				text: 'Stop Video\\nRetransmitter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'mediaControlRetransmitter',
					options: {
						retransmitter: this.central.retransmitters[0] ? this.central.retransmitters[0].id : 'select retransmitter',
						control: 'vstop',
					},
				},
			],
		}
	}

	return presets
}
