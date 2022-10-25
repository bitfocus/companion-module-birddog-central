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
					return this.central.generators.find((element) => (element.id = options.generator)).loop == options.loop
				case 'play':
					return this.central.generators.find((element) => (element.id = options.generator)).status == 'Playing'
				case 'stop':
					return this.central.generators.find((element) => (element.id = options.generator)).status == 'Not Playing'
				case 'pause':
					return this.central.generators.find((element) => (element.id = options.generator)).status == 'Pause'
			}
		},
	}

	this.setFeedbackDefinitions(feedbacks)

	return feedbacks
}
