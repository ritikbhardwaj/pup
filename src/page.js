import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import ScrapeTask, { SelectorState, TaskState } from './scrape-task.js';
import HasState from './state.js';

export const PageResponseStatus = {
	Resolved : 'pageresolved',
	Error    : 'pageerror'
};

export const PageState = {
	Initial        : 'initial',	
	ReadyToProcess : 'readytoprocess',
	Error          : 'error',
};

export default class Page extends HasState {
	// Public
	constructor(browser, options = {}) {
		super();
		this._id          = randomUUID().replaceAll('-', '');
		this._ref         = null;
		this._browser     = browser;
		this._pageEmitter = new EventEmitter();

		this.setState(PageState.Initial).reason('');
		this._pageEmitter.emit('initial');
	}

	init = async () => {
		if (this.state === PageState.Initial) {
			this._pageEmitter.emit('readytoprocess');
			this.setState(PageState.ReadyToProcess);
			try {
				this._ref = await this._browser.newPage();
			} catch(error) {
				const { message } = error;
				this.setState(PageState.Error).reason(message);
				return Promise.reject(message);
			}

			// TODO: Add page options by iterating
			// on and object.
			this._ref.setCacheEnabled(false);
		}
	};

	get id() {
		return this._id;
	}

	get ref() {
		return this._ref;
	}

	get pageEmitter() {
		return this._pageEmitter;
	}

	close = () => {
		if (this.state === PageState.ReadyToProcess) {
			this._ref.close();
			this._pageEmitter.emit('close');
		}
	};

	getValue = async (sltr, link) => {
		const { selector, timeout } = sltr;
		let value;
		try {
			const element = await this._ref.waitForSelector(selector, { timeout });
			value = await this._ref.evaluate((el) => el.textContent, element);
		} catch(error) {
			const { message } = error;
			sltr.setState(SelectorState.Failed).reason(message);
			return Promise.reject(message);
		} 
		return {
			key: sltr.key,
			data: sltr.filter(value),
		};
	};

	// Fetch all selectors
	fetch = async (scrapeTask, urlPrefix = '') => {

		const link = urlPrefix + scrapeTask.url;
		const data = [];
		const valuePromises = [];

		if (this.state !== PageState.ReadyToProcess) {
			return Promise.resolve({
				status: PageResponseStatus.Error,
				url: link,
				message
			});
		}

		if (!(scrapeTask instanceof ScrapeTask)) throw new Error('Invalid scrape task');


		try {
			await this._ref.goto(link, { timeout: scrapeTask.pgNavigationTimeout, waitUntil: 'domcontentloaded' });
		} catch(error) {
			const { message } = error;
			// this.setState(PageState.Error).reason(message);
			for(const selector of scrapeTask.selectors) {
				selector.setState(SelectorState.Failed).reason(message);
			}
			this._pageEmitter.emit('fetchcomplete');
			return Promise.resolve({
				status: PageResponseStatus.Error,
				url: link,
				task_id: scrapeTask.id,
				message
			});
		}

		for (const selector of scrapeTask.selectors) {
			valuePromises.push(this.getValue(selector, link));
		}

		return Promise.allSettled(valuePromises).then((values) => {
			this._pageEmitter.emit('fetchcomplete');
			return Promise.resolve({
				status: PageResponseStatus.Resolved,
				url: link,
				task_id: scrapeTask.id, 
				selectors: values
			});
		});
	};

	//Private
	_id;
	_ref;
	_browser;
	_pageEmitter;
};
