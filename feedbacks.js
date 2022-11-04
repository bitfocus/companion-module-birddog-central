exports.initFeedbacks = function () {
	const ColorWhite = this.rgb(255, 255, 255) // White
	const ColorBlack = this.rgb(0, 0, 0) // Black
	const ColorRed = this.rgb(255, 0, 0) // Red
	const ColorGreen = this.rgb(0, 255, 0) // Green
	const ColorOrange = this.rgb(255, 102, 0) // Orange

	const feedbacks = {}

	feedbacks.generatorMediaStatus = {
		type: 'boolean',
		label: 'Generator Media Status',
		description: 'If the selected generator has the selected status, change the style of the button',
		style: {
			color: ColorBlack,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Select Generator',
				id: 'generator',
				choices: this.central.generators,
				default: this.central.generators[0] ? this.central.generators[0].id : '',
			},
			{
				type: 'dropdown',
				label: 'Select Control',
				id: 'control',
				choices: [
					{ id: 'play', label: 'Play' },
					{ id: 'stop', label: 'Stop' },
					{ id: 'pause', label: 'Pause' },
					{ id: 'loop', label: 'Loop' },
				],
				default: 'play',
			},
			{
				type: 'dropdown',
				label: 'Loop On/Off',
				id: 'loop',
				choices: [
					{ id: 'TRUE', label: 'On' },
					{ id: 'FALSE', label: 'Off' },
				],
				default: 'TRUE',
				isVisible: (action) => action.options.control === 'loop',
			},
		],
		callback: ({ options }) => {
			switch (options.control) {
				case 'loop':
					return this.central.generators.find((element) => element.id == options.generator).loop == options.loop
				case 'play':
					return this.central.generators.find((element) => element.id == options.generator).status == 'Playing'
				case 'stop':
					return this.central.generators.find((element) => element.id == options.generator).status == 'Not Playing'
				case 'pause':
					return this.central.generators.find((element) => element.id == options.generator).status == 'Pause'
			}
		},
	}

	if (this.central.access >= 0) {
		feedbacks.sourceConnectedToRouter = {
			type: 'boolean',
			label: 'Source Connected to Router',
			description: 'If the selected source is connected to the selected router, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Source',
					id: 'source',
					choices: this.central.sources,
					default: this.central.sources[0] ? this.central.sources[0].id : '',
				},
				{
					type: 'dropdown',
					label: 'Select Router',
					id: 'router',
					choices: this.central.routers,
					default: this.central.routers[0] ? this.central.routers[0].id : '',
				},
			],
			callback: ({ options }) => {
				return (this.central.routers.find((router) => router.id == options.router).name = options.source)
			},
		}

		feedbacks.retransmitterAudioSource = {
			type: 'boolean',
			label: 'Retransmitter Audio Source',
			description: 'If the selected retransmitter has the selected Audio source, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Retransmitter',
					id: 'retransmitter',
					choices: this.central.retransmitters,
					default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : '',
				},
				{
					type: 'dropdown',
					label: 'Select Audio Source',
					id: 'source',
					choices: this.central.sources,
					default: this.central.sources[0] ? this.central.sources[0].id : '',
				},
			],
			callback: ({ options }) => {
				// temporary due to API in v2.0.5.0 not returning the sources in a different format from the rest of the API
				tempSource = options.source
					.substring(0, options.source.indexOf('('))
					.concat(' ', options.source.substring(options.source.indexOf('(')))
				return (
					this.central.retransmitters.find((retransmitters) => retransmitters.id == options.retransmitter)
						.AudioNDIname == tempSource
				)
			},
		}
		feedbacks.retransmitterAudioStatus = {
			type: 'boolean',
			label: 'Retransmitter Audio Status',
			description: 'If the selected retransmitter has the selected Audio status, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Retransmitter',
					id: 'retransmitter',
					choices: this.central.retransmitters,
					default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : '',
				},
				{
					type: 'dropdown',
					label: 'Select Audio Status',
					id: 'status',
					choices: [
						{ id: 'True', label: 'Playing' },
						{ id: 'False', label: 'Stopped' },
					],
					default: 'True',
				},
			],
			callback: ({ options }) => {
				return (
					this.central.retransmitters.find((retransmitters) => retransmitters.id == options.retransmitter)
						.AudioPlayStatus == options.status
				)
			},
		}

		feedbacks.retransmitterVideoSource = {
			type: 'boolean',
			label: 'Retransmitter Video Source',
			description: 'If the selected retransmitter has the selected Video source, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Retransmitter',
					id: 'retransmitter',
					choices: this.central.retransmitters,
					default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : '',
				},
				{
					type: 'dropdown',
					label: 'Select Video Source',
					id: 'source',
					choices: this.central.sources,
					default: this.central.sources[0] ? this.central.sources[0].id : '',
				},
			],
			callback: ({ options }) => {
				// temporary due to API in v2.0.5.0 not returning the sources in a different format from the rest of the API
				tempSource = options.source
					.substring(0, options.source.indexOf('('))
					.concat(' ', options.source.substring(options.source.indexOf('(')))
				return (
					this.central.retransmitters.find((retransmitters) => retransmitters.id == options.retransmitter)
						.VideoNDIname == tempSource
				)
			},
		}
		feedbacks.retransmitterVideoStatus = {
			type: 'boolean',
			label: 'Retransmitter Video status',
			description: 'If the selected retransmitter has the selected Video status, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Retransmitter',
					id: 'retransmitter',
					choices: this.central.retransmitters,
					default: this.central.retransmitters[0] ? this.central.retransmitters[0].id : '',
				},
				{
					type: 'dropdown',
					label: 'Select Video Status',
					id: 'status',
					choices: [
						{ id: 'True', label: 'Playing' },
						{ id: 'False', label: 'Stopped' },
					],
					default: 'True',
				},
			],
			callback: ({ options }) => {
				return (
					this.central.retransmitters.find((retransmitters) => retransmitters.id == options.retransmitter)
						.VideoPlayStatus == options.status
				)
			},
		}
	}

	this.setFeedbackDefinitions(feedbacks)

	return feedbacks
}
