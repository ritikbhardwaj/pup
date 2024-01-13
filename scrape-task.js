import { randomUUID } from 'node:crypto';
import HasState from './state.js';

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
export const SelectorState = State;
export const TaskState     = State;

export class Selector extends HasState {
	// Public
	constructor(
		key,
		selector,
		filterFn = (value) => value,
		timeout = 5000,
		type = SelectorType.CssSelector
		) {
			super();
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

	get timeout() {
		return this._timeout;
	}

	get selector() {
		return this._selector;
	}

	get key () {
		return this._key;
	}

	// Private
	_key; 
	_selector;
	_type; 
	_filterFn;
	// Selector timeout. page.waitForSelector()
	_timeout;
};

export default class ScrapeTask extends HasState {
	// Public	
	constructor(name, url, selectors = [], pgNavigationTimeout = 5000) {
		super();
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

	get pgNavigationTimeout() {
		return this._pgNavigationTimeout;
	}

	setState = (s) => {
		this._state.s = s;
		return this;
	}

	reason = (str) => {
		if(typeof str !== 'string') throw new TypeError('Reason must be a string');
		this._state.reason = str;
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
	_url;
	// Navigation timeout. page.goto()
	_pgNavigationTimeout;
};
