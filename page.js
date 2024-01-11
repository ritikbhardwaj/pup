import { EventEmitter } from 'node:events';

export let State = {
	PENDING: 'pending',
	READY: 'ready',
	CLOSE: 'close'
};

export default class Page extends EventEmitter {
	// Public
	constructor(browser, options = {}) {
		super();
		this._browser = browser;
		this._pageEmitter = new EventEmitter();
	}

	init = async () => {
		if(this._state === State.PENDING) {
			this._pageEmitter.emit('ready');
			this._state = State.READY;
			this._ref = await this._browser.newPage();


			// TODO: Add page options by iterating
			// on and object.
			this._ref.setCacheEnabled(false);
		}
		// this._pageEmitter.emit('ready');
	}

	get state() {
		this._state;
	}

	get ref() {
		return this._ref;
	}

	get pageEmitter() {
		return this._pageEmitter;
	}

	close = () => {
		if(this._state === State.READY) {
			this._ref.close();
			this._pageEmitter.emit('close');
		}
	}

	getValue = async (selector, link) => {
		const element = await this._ref.waitForSelector(selector.selector);
		const value = await this._ref.evaluate(el => el.textContent, element);
		return ({ 
			key: selector.key,
			value: selector.filter(value)
		});
	}

	// Fetch all selectors
	fetch = async (scrapeTask, urlPrefix = '') => {

		if ( this._state !== State.READY ) throw new Error('Page state pending');

		if ( scrapeTask === undefined || scrapeTask === null ) throw new Error('ScrapeTask cannot be ' + typeof scrapeTask);

		const link = urlPrefix + scrapeTask.url;
		const data = [];
		const valuePms = [];

		await this._ref.goto(link);
		for(const selector of scrapeTask.selectors) {
			const pms = this.getValue(selector, link);
			valuePms.push(pms);	
		}

		return Promise.all(valuePms).then((values) => {
			this._pageEmitter.emit('fetchcomplete');
			return Promise.resolve(values);
		});
	}

	//Private
	_browser = null;
	_id = 'page_id';
	_ref = null;
	_state = State.PENDING;
	_pageEmitter = null;
};
