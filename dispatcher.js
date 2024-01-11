import ScrapeTask from './scrape-task.js';

export default class Dispatcher {
	// Public
	constructor(browser, scrapeTasks = []) {

		this._pages = browser.pages;
		this._scrapeTasks = scrapeTasks;
		// this._scrapeTasks.pop();

		console.log('Total Links: ', scrapeTasks.length)
		
		this._pages.forEach((page, index) => {
			page.pageEmitter.on('fetchcomplete', () => {
				if(this._scrapeTasks.length) {
					page.fetch(this._scrapeTasks.pop()).then((data) => {
						console.log('Data: ', data);
					});
				} else {
					page.close();
				}
			});

		});
	}

	// Loop cycle start point
	start = () => {
		this._pages.forEach(async (page, index) => {
			await page.init();
			page.fetch(this._scrapeTasks.pop()).then((data) => {
				console.log('Data: ', data);
			})
		});
	}

	// Private
	_pages;

	// Simple Scrape Task Queue
	_scrapeTasks;
};
