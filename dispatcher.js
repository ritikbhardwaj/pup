export default class Dispatcher {
	// Public
	constructor(browser, scrapeTasks) {
		this._pages = browser.pages;
		console.log('Total Links: ', scrapeTasks.length)
		this._pages.forEach((page, index) => {
			page.pageEmitter.on('fetchcomplete', () => {
				if(this._scrapeTasks.length) {
					page.fetch(this._scrapeTasks.pop()).then((data) => {
						// push to array
						this._total++;
						console.log(this._total,`Tab[${index+1}]`,' Price: ', data);
					});
				} else {
					page.close();
				}
			});
		});
		this._scrapeTasks = scrapeTasks;
	}

	start = () => {
		this._pages.forEach(async (page, index) => {
			const url = this._scrapeTasks.pop();
			await page.init();
			page.fetch(url).then((data) => {
				// push to array
				this._total++;
				console.log(this._total,`Tab[${index+1}] `,' Price: ', data);
			})
		});
	}

	fetchDataFromUrl = async (page, url) => {
		const link = url;
		const pageGotoPromise = page.goto(link);
		const elementPromise = page.waitForSelector('span.text-26');
		// const titlePromise = page.waitForSelector('span#productTitle');
		const valuePromise = elementPromise.then((element) => element.evaluate(el => el.textContent));
		// const titleTextPromise = titlePromise.then((element) => element.evaluate(el => el.textContent));
		return Promise.all([pageGotoPromise, elementPromise, valuePromise]);
	}

	// Private
	_pages = null;
	_scrapeTasks = null;
	_total = 0;
};
