import { randomUUID } from 'node:crypto';

export const SelectorType = {
	XPath       : 'xpath',
	CssSelector : 'cssselector',
};

export const FetchDataType = {
	TextProperty    : 'text-property',
	Attribute       : 'attribute',
	GenericProperty : 'generic-property'
}

const State = {
	Resolved : 'resolved',
	Failed   : 'failed',
	Pending  : 'pending'
};
const SelectorState = State;
const TaskState     = State;

export class Selector {
	// Public
	constructor(
		key,
		selector,
		filterFn = (value) => value,
		type = SelectorType.CssSelector,
		timeout = 5000
		) {
			this._key      = key;
			this._selector = selector;
			this._filterFn = filterFn;
			this._type     = type;
			// Default: 5s
			this._timeout  = timeout;
			this.setState(SelectorState.Pending).reason('');
	}

	get filter() {
		return this._filterFn;
	}

	get selector() {
		return this._selector;
	}

	get key () {
		return this._key;
	}

	setState = (state) => {
		this._state = state;
		return this;
	}

	reason = (reason) => {
		if(typeof reason !== 'string') throw new TypeError('Reason must be string');
		this._state.reason = reason;
	}

	// Private
	_key; 
	_selector;
	_type; 
	_state; 
	_filterFn;
	// Selector timeout. page.waitForSelector()
	_timeout;
};

export default class ScrapeTask {
	// Public	
	constructor(name, url, selectors = [], pgNavigationTimeout = 5000) {
		this._id = randomUUID().replaceAll('-','');
		this._name      = name;
		this._url       = url;
		this._selectors = selectors;
		this.setState(TaskState.Pending).reason('');
		// Default: 5s
		this._pgNavigationTimeout = pgNavigationTimeout;
	}

	printDebugInfo = () => {
		let selectors = '';
		for(const selector of this._selectors) {
			selectors += selector.key+',';
		}
		let str = `Scrape Task:${this._id}\nName: ${this._name}\nUrl: ${this._url}\nSelectors: ${selectors}`;
		console.log(str,'\n');
	}

	get url () {
		return this._url;
	}

	setState = (s) => {
		this._state.s = s;
		return this;
	}

	reason = (reason) => {
		if(typeof reason !== 'string') throw new TypeError('Reason must be a string');
		this._state.reason = reason;
	}

	get id() {
		return this._id;
	}

	get state() {
		return this._state.s;
	}

	get selectors () {
		return this._selectors;
	}

	// Private
	_id;
	_name;
	_selectors;
	_state; 
	_url;
	// Navigation timeout. page.goto()
	_pgNavigationTimeout;
};
