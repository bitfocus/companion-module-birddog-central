const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')
const upgradeScripts = require('./upgrades')

const udp = require('../../udp')
const fetch = require('node-fetch')

let debug
let log

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...actions,
			...presets,
		})

		this.updateVariableDefinitions = updateVariableDefinitions
		this.updateVariables = updateVariables

		// Keep track of setInterval
		this.timers = {
			pollCentralConfig: null, // ID of setInterval for Central polling
			pollCentralStatus: null, // ID of setInterval for Camera Status polling
		}
	}

	// Make sure to NOT commit this line uncommented
	//static DEVELOPER_forceStartupUpgradeScript = 2

	static GetUpgradeScripts() {
		return []
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls BirdDog Central 2.0 software.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Device IP',
				width: 6,
				regex: this.REGEX_IP,
			},
		]
	}

	updateConfig(config) {
		this.config = config

		this.status(this.STATUS_WARNING, 'Connecting')

		if (this.config.host !== undefined) {
			this.debug('----Host details:- ' + this.config.host)
			this.init()
		} else {
			this.status(
				this.STATUS_ERROR,
				'Unable to connect, please enter an IP address for Central 2.0 in the module settings'
			)
		}
	}

	destroy() {
		// Clear open connections
		if (this.udp !== undefined) {
			this.udp.destroy()
		}
		// Clear polling timers
		if (this.timers.pollCentralConfig !== undefined) {
			clearInterval(this.timers.pollCentralConfig)
			this.timers.pollCentralConfig = null
		}
		if (this.timers.pollCentralStatus) {
			clearInterval(this.timers.pollCentralStatus)
			this.timers.pollCentralStatus = null
		}

		debug('destroy', this.id)
	}

	init() {
		debug = this.debug
		log = this.log
		this.central = {}
		this.central.sources = []
		this.central.destinations = []
		this.central.sourcegroups = []
		this.central.destgroups = []
		this.central.routers = []
		this.central.generators = []
		this.central.gen_sources = []
		this.central.retransmitters = []

		this.status(this.STATUS_WARNING, 'Connecting')

		// Initialise Module
		this.getInitialConfig()
	}

	initVariables() {
		this.updateVariableDefinitions()
	}

	initFeedbacks() {
		const feedbacks = initFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets(updates) {
		this.setPresetDefinitions(this.getPresets())
	}

	actions(system) {
		this.setActions(this.getActions())
	}

	sendCommand(cmd, subcmd, parameters) {
		let str = `?cmd=` + cmd + `&subcmd=` + subcmd
		if (parameters) {
			for (const [key, value] of Object.entries(parameters)) {
				str = str + `&${key}=${value}`
			}
		}
		if (cmd == 'version') {
			str = cmd
		}

		//this.debug('---- Command String is', str)

		let url = `http://${this.config.host}:8080/` + str
		let options = {
			method: 'POST',
		}

		fetch(url, options)
			.then((res) => {
				if (res.status == 200) {
					return res.json()
				}
			})
			.then((json) => {
				this.status(this.STATUS_OK)
				this.processData(cmd, subcmd, json)
			})
			.catch((err) => {
				this.debug(err)
				let errorText = String(err)
				if (
					errorText.match('ECONNREFUSED') ||
					errorText.match('ENOTFOUND') ||
					errorText.match('EHOSTDOWN') ||
					errorText.match('ETIMEDOUT')
				) {
					if (this.currentStatus != 2) {
						this.status(this.STATUS_ERROR)
						this.log(
							'error',
							`Connection lost to ${this.central?.HostName ? this.central.HostName : 'BirdDog Central 2.0'}`
						)
					}
				}
			})
	}

	processData(cmd, subcmd, data) {
		// this.debug(data);
		let changed = []
		switch (cmd) {
			case 'source':
				switch (subcmd) {
					case 'list':
						changed.sources = this.listAllSources(data)
						break
					case 'fav_gnames':
					case 'add_fav_grp':
					case 'del_fav_grp':
						changed.sourceGroups = this.listSourceGroups(data)
						break
					case 'fav_glist':
					case 'add_srs':
					case 'del_srs':
						changed.sourceInfo = this.sourceInfo(data)
						break
					case 'connect':
						break
				}
				break
			case 'dest':
				switch (subcmd) {
					case 'list':
						changed.destinations = this.listAllDestinations(data)
						break
					case 'info':
						break
					case 'fav_gnames':
					case 'add_fav_grp':
					case 'del_fav_grp':
						changed.destGroups = this.listDestGroups(data)
						break
					case 'fav_glist':
					case 'add_srs':
					case 'del_srs':
						changed.destInfo = this.destInfo(data)
						break
				}
				break
			case 'router':
				switch (subcmd) {
					case 'list':
					case 'add':
					case 'del':
					case 'link':
						changed.routers = this.listRouters(data)
						break
					case 'info':
						changed.routerInfo = this.routerInfo(data)
						break
					case 'sconnect':
					case 'dconnect':
						this.sendCommand('router', 'list')
						//changed.routerInfo = this.routerInfo(data)
						changed.routerConnect = true
						break
				}
				break
			case 'gen':
				switch (subcmd) {
					case 'list':
						changed.generator = this.listGenerators(data)
						break
					case 'glist':
						break
					case 'add_fav_grp':
					case 'del_fav_grp':
						break
					case 'srs_list':
						changed.genSources = this.listGenSources(data)
						break
					case 'info':
					case 'add_srs':
					case 'del_srs':
					case 'play':
					case 'stop':
					case 'pause':
					case 'skip':
					case 'stop':
					case 'loop':
						changed.generatorInfo = this.generatorInfo(data)
						break
				}
				break
			case 'retransmtr':
				switch (subcmd) {
					case 'list':
					case 'add':
					case 'delete':
						changed.retransmitters = this.listRetransmitters(data)
						break
					case 'info':
					case 'vconnect':
					case 'aconnect':
					case 'vstop':
					case 'astop':
					case 'stop':
					case 'play':
						changed.retransmittersInfo = this.retransmitterInfo(data)
						break
				}
				break
			case 'server':
				switch (subcmd) {
					case 'info':
						this.central.version = data.version
						this.central.access = data.access
						changed.info = true
						break
				}
				break
			case 'version':
				this.central.version = data
				changed.version = true
				break
		}
		if (
			changed.sources ||
			changed.sourceGroups ||
			changed.sourceInfo ||
			changed.destinations ||
			changed.destGroups ||
			changed.destInfo ||
			changed.routers ||
			changed.routerInfo ||
			changed.generator ||
			changed.genSources ||
			changed.retransmitters
		) {
			// Something has changed, so need to re-initialise actions/feedbacks/presets
			this.actions()
			this.initFeedbacks()
			this.initPresets()
			// If generators have changed, then recreate variables
			console.log('changed generators: ', changed.generator)
			if (changed.generator) this.initVariables()
		}
		if (changed.generatorInfo || changed.routerConnect || changed.retransmittersInfo) {
			// The status of something has changed, so need to check feedbacks
			this.checkFeedbacks()
		}
		if (changed.info || changed.version) {
			// Only update variables
			this.updateVariables()
		}
	}

	getInitialConfig() {
		this.sendCommand('server', 'info')
		this.initVariables()
		this.startPolling()
	}

	// Poll for BirdDog Central configuration/status
	startPolling() {
		//Immediately do the poll
		this.pollCentralConfig()
		//this.pollCentralStatus()

		// Repeat the poll at set intervals
		this.timers.pollCentralConfig = setInterval(this.pollCentralConfig.bind(this), 10000) // No need to poll frequently
		this.timers.pollCentralStatus = setInterval(this.pollCentralStatus.bind(this), 3000) // This will be used to get status of the camera
	}

	stopPolling() {
		if (this.timers.pollCentralConfig) {
			clearInterval(this.timers.pollCentralConfig)
			this.timers.pollCentralConfig = null
		}

		if (this.timers.pollCentralStatus) {
			clearInterval(this.timers.pollCentralStatus)
			this.timers.pollCentralStatus = null
		}
	}

	// Get Central configuration
	pollCentralConfig() {
		this.sendCommand('server', 'info')
	}

	// Get Central Status
	pollCentralStatus() {
		this.sendCommand('source', 'list')
		this.sendCommand('dest', 'list')
		this.sendCommand('gen', 'srs_list')

		if (this.central.access >= 0) {
			this.sendCommand('source', 'fav_gnames')
			this.sendCommand('source', 'fav_glist')
			this.sendCommand('dest', 'fav_gnames')
			this.sendCommand('dest', 'fav_glist')
			this.sendCommand('router', 'list')
			this.sendCommand('gen', 'list')
			this.sendCommand('gen', 'srs_list')
			this.sendCommand('retransmtr', 'list')
		}
		this.debug('---- Central details: ', this.central)
	}
	// Functions

	listAllSources(data) {
		// data should contain all sources from API
		// Compare against what is stored
		// Return true if changed
		let sources = data.ndi_find_results[0]?.sources ? this.sourceList(data.ndi_find_results[0].sources) : []
		let different = this.isDifferent(this.central.sources, sources)
		if (different) {
			this.central.sources = sources
		}
		return different
	}

	listAllDestinations(data) {
		// data should contain all destinations from API
		// Compare against what is stored
		// Return true if changed
		let destinations = this.destList(data.mdns_find_results)
		let different = this.isDifferent(this.central.destinations, destinations)
		if (different) {
			this.central.destinations = destinations
		}
	}

	listSourceGroups(data) {
		// data should contain all sourcegroups from API
		// Compare against what is stored
		// Return true if changed
		// For each source group, query group
		let names = []
		data.group_names.forEach((element) => {
			names.push(element)
		})
		let different = this.isDifferent(this.central.sourcegroups, this.groupList(names))
		if (different) {
			this.central.sourcegroups = this.groupList(names)
		}
		names.forEach((element) => {
			this.sendCommand('source', 'fav_glist', { gname: element })
		})
		return different
	}

	sourceInfo(data) {
		// data should contain details of a source group from API
		// create array of sources based on source name from source group
		// Compare against what is stored
		// Return true if changed
		let group = data.favourite_source_groups[0]
		let idx = this.central.sourcegroups.findIndex((element) => element.id == group.group_name)
		if (idx < 0) return
		let sources = []
		group.sources.forEach((element) => {
			let result = this.central.sources.filter((result) => {
				return result.id == element.host_name + ' (' + element.format + ')'
			})
			sources.push(result)
		})
		if (!this.central.sourcegroups[idx].sources) {
			this.central.sourcegroups[idx].sources = []
		}
		let different = this.isDifferent(this.central.sourcegroups[idx].sources, sources)
		if (different) {
			this.central.sourcegroups[idx].sources = sources
		}
		return different
	}

	listDestGroups(data) {
		// data should contain all destgroups from API
		// Compare against what is stored
		// Return true if changed
		// For each dest group, query group
		let names = []
		data.group_names.forEach((element) => {
			names.push(element)
		})
		let different = this.isDifferent(this.central.destgroups, this.groupList(names))
		if (different) {
			this.central.destgroups = this.groupList(names)
		}
		names.forEach((element) => {
			this.sendCommand('dest', 'fav_glist', { gname: element })
		})
		return different
	}

	destInfo(data) {
		// data should contain details of a dest group from API
		// create array of destinations based on destination name from dest group
		// Compare against what is stored
		// Return true if changed
		let group = data.favourite_destination_groups[0]
		let idx = this.central.destgroups.findIndex((element) => element.id == group.group_name)
		if (idx < 0) return
		let dest = []
		group.destinations.forEach((element) => {
			let result = this.central.destinations.filter((result) => {
				return result.id == element.host_name
			})
			dest.push(result)
		})
		if (!this.central.destgroups[idx].destinations) {
			this.central.destgroups[idx].destinations = []
		}
		let different = this.isDifferent(this.central.destgroups[idx].destinations, dest)
		if (different) {
			this.central.destgroups[idx].destinations = dest
		}
		return different
	}

	listRouters(data) {
		// data should contain all routers from API
		// Compare against what is stored
		// Return true if changed
		// For each router, query router
		let names = []
		data.routers.forEach((element) => {
			names.push(element.name)
		})
		let different = this.isDifferent(this.central.routers, this.groupList(names))
		if (different) {
			this.central.routers = this.groupList(names)
		}
		names.forEach((element) => {
			this.sendCommand('router', 'info', { name: element })
		})
		return different
	}

	routerInfo(data) {
		// data should contain details of a router from API
		// Compare against what is stored
		// Return true if changed
		let idx = this.central.routers.findIndex((element) => element.id == data.router)
		if (idx < 0) return
		let different =
			this.central.routers[idx].name != data.name ||
			this.central.routers[idx].src_group != data.src_group ||
			this.central.routers[idx].url != data.url
		if (different) {
			this.central.routers[idx].name = data.name
			this.central.routers[idx].src_group = data.src_group
			this.central.routers[idx].url = data.url
		}
		return different
	}

	listGenerators(data) {
		// data should contain all generators from API
		// Compare against what is stored
		// Return true if changed
		// For each generator, query generator
		let names = []
		data.generators.forEach((element) => {
			names.push(element.group_name)
		})
		let different = this.isDifferent(this.central.generators, this.groupList(names))
		if (different) {
			this.central.generators = this.groupList(names)
		}
		names.forEach((element) => {
			this.sendCommand('gen', 'info', { gname: element })
		})
		return different
	}

	generatorInfo(data) {
		// data should contain details of a generator from API
		// Compare against what is stored
		// Return true if changed
		let generator = data.generators[0]
		let idx = this.central.generators.findIndex((element) => element.id == generator.group_name)
		if (idx < 0) return
		if (!this.central.generators[idx].playlist) this.central.generators[idx].playlist = []
		let different =
			this.central.generators[idx].loop != generator.loop ||
			this.isDifferent(this.central.generators[idx].playlist, generator.playlist) ||
			this.central.generators[idx].status != generator.status
		if (different) {
			this.central.generators[idx].loop = generator.loop
			this.central.generators[idx].playlist = generator.playlist
			this.central.generators[idx].status = generator.status
		}
		return different
	}

	listGenSources(data) {
		// data should contain all generator sources from API
		// Compare against what is stored
		// Return true if changed
		let names = []
		data.gen_sources.forEach((element) => {
			names.push(element)
		})
		let different = this.isDifferent(this.central.gen_sources, this.groupList(names))
		if (different) {
			this.central.gen_sources = this.groupList(names)
		}
		return different
	}

	listRetransmitters(data) {
		// data should contain all retransmitters from API
		// Compare against what is stored
		// Return true if changed
		// For each retransmitter, query retransmitter
		let names = []
		data.retransmitters.forEach((element) => {
			names.push(element)
		})
		this.central.retransmitters = this.groupList(names)
		names.forEach((element) => {
			this.sendCommand('retransmtr', 'info', { name: element })
		})
	}

	retransmitterInfo(data) {
		// data should contain details of a retransmitter from API
		// Compare against what is stored
		// Return true if changed
		let retransmitter = data.retransmitters[0]

		let idx = this.central.retransmitters.findIndex((element) => element.id == retransmitter.Name)
		if (idx < 0) return
		let different =
			this.central.retransmitters[idx].AudioNDIname != retransmitter.AudioNDIname ||
			this.central.retransmitters[idx].AudioPlayStatus != retransmitter.AudioPlayStatus ||
			this.central.retransmitters[idx].AudioURL != retransmitter.AudioURL ||
			this.central.retransmitters[idx].VideoNDIname != retransmitter.VideoNDIname ||
			this.central.retransmitters[idx].VideoPlayStatus != retransmitter.VideoPlayStatus ||
			this.central.retransmitters[idx].VideoURL != retransmitter.VideoURL
		if (different) {
			this.central.retransmitters[idx].AudioNDIname = retransmitter.AudioNDIname
			this.central.retransmitters[idx].AudioPlayStatus = retransmitter.AudioPlayStatus
			this.central.retransmitters[idx].AudioURL = retransmitter.AudioURL
			this.central.retransmitters[idx].VideoNDIname = retransmitter.VideoNDIname
			this.central.retransmitters[idx].VideoPlayStatus = retransmitter.VideoPlayStatus
			this.central.retransmitters[idx].VideoURL = retransmitter.VideoURL
		}
		return different
	}

	/// Utility Functions

	sourceList(data) {
		// Create list of sources, with added ID and Label. Also include returned detail
		let list = []
		data.forEach((element) => {
			let str = element.host_name + '(' + element.format + ')'
			list.push({ id: str, label: str, ...element })
		})
		return list
	}

	destList(data) {
		// Create list of destinations, with added ID and Label. Also include returned detail
		let list = []
		data.forEach((element) => {
			list.push({ id: element.host_name, label: element.host_name, ...element })
		})
		return list
	}

	groupList(data) {
		// Create list of groups, with added ID and Label
		let list = []
		data.forEach((element) => {
			list.push({ id: element, label: element })
		})
		return list
	}

	isDifferent(stored, data) {
		// Compare 2 different arrays
		// Return true if different
		return !(stored.join() == data.join())
	}
}
exports = module.exports = instance
