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
		// this._ref = browser.newPage(); 
		// console.log('Page ref in constructor: ', this._ref);
		this._browser = browser;
		this._pageEmitter = new EventEmitter();
		// this._pageEmitter.on('fetch-complete', (url, appendText) => {
		// 	// this.fetch(url, appendText);
		// 	console.log('fetch complete');
		// });

		// this.on('page-close', () => {
		// 	this.close();
		// });
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

	fetch = async (url, appendText = '') => {
		if(this._state !== State.READY) throw new Error('Page state pending');
		const link = appendText+url;
		const pageGotoPromise = this._ref.goto(link);
		const elementPromise = this._ref.waitForSelector('span.text-26');
		// const titlePromise = this._ref.waitForSelector('span#productTitle');
		const valuePromise = elementPromise.then((element) => element.evaluate(el => el.textContent));
		// const titleTextPromise = titlePromise.then((element) => element.evaluate(el => el.textContent));
		return Promise.all([pageGotoPromise, elementPromise, valuePromise]).then((data) => {
			this._pageEmitter.emit('fetchcomplete');
			return Promise.resolve(data[2]);
		});
		
	}

	//Private
	_browser = null;
	_id = 'page_id';
	_ref = null;
	_state = State.PENDING;
	_pageEmitter = null;
};
