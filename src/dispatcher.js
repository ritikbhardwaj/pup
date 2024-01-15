import ScrapeTask, {} from './scrape-task.js';
import { PageState } from './page.js';
import { getDate, getTime } from './utils.js';

export default class Dispatcher {
	// Public
	constructor(browser, transport, scrapeTasks = []) {

		this._browser     = browser;
		this._pages       = browser.pages;
		this._transport   = transport;
		this._scrapeTasks = scrapeTasks;

		console.log('Total Links: ', scrapeTasks.length)
		
		this._pages.forEach((page, index) => {
			page.pageEmitter.on('fetchcomplete', () => {
				if(this._scrapeTasks.length) {
					page.fetch(this._scrapeTasks.pop()).then((data) => {
						this._transport.store(data);
					});
				} else {
					page.close();
				}
			});

		});
	};

	// Loop cycle start point
	start = async () => {
		try {
			await this._transport.establish();
			this._pages.forEach(async (page, index) => {
				try {
					await page.init();
				} catch(error) {
					console.log(`Page: ${page.id} initialized with error.\nError: ${error}`);
					return;
				}
				if(this._scrapeTasks.length) {
					page.fetch(this._scrapeTasks.pop()).then((data) => {
						// const s = this._getStoreObject(data);
						// console.log(s);
						this._transport.store(data);
					})
				} else {
					page.close();
				}
			});

			if(this._pages.filter(p => p.state === PageState.ReadyToProcess).length === 0 && this._scrapeTasks.length === 0) {
				this._browser.close();
			}
		} catch(error) {
			console.log(error);
			this._browser.close();
		}
	}

	// Private
	_pages;
	_browser;
	_scrapeTasks;
	_transport;
};
