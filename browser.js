import Page from './page.js';

// Singleton
export default class Browser {
	// Public
	launch = async (puppeteer) => {
		this._browserRef = await puppeteer.launch({ headless: this._headless }); 
		this._onBrowserCreated();
		// this._browserRef.on('targetcreated', this._onPageCreated);
		// this._browserRef.on('targetdestroyed', this._onPageDestroyed);
		for(let i = 0; i < this._MAX_PAGES; i++) {
			const page = new Page(this);
			this._pages.push(page);

			// Event handlers
			page.pageEmitter.on('readytoprocess', this._onPageCreated);
			page.pageEmitter.on('close', () => {
				this._TOTAL_PAGES--;
				if(this._TOTAL_PAGES === 0) {
					this.close();
				}
			});
			// this._pages[i].setCacheEnabled(false);
		}
		return this;
	}

	close = async () => {
		await this._browserRef.close();
	}

	showWindow = (flag) => {
		flag ? this._headless = false : this._headless = 'new';
		return this;
	}

	tabs = (num) => {
		this._MAX_PAGES = num;
		return this;
	}

	static newBrowser = () => {
		if(this._instance === null) { 
			this._instance = new Browser();
			return this._instance;
		} 
		return this._instance;
	} 

	newPage = () => {
		return this._browserRef.newPage();
	}

	get totalPages() {
		return this._TOTAL_PAGES;
	}

	get pages () {
		return this._pages;
	}

	get brzref() {
		return this._browserRef;
	}

	// Private
	constructor() {}
	static _instance = null;
	_headless = false;
	_pages = [];
	_MAX_PAGES = 5;
	_TOTAL_PAGES = 0;
	_browserRef = null;
	_browserEvents = {};
	_onBrowserCreated = async () => {
		const version = await this._browserRef.version();
		const userAgent = await this._browserRef.userAgent();
		console.log(`Chrome version: ${version}\nUser Agent: ${userAgent}\nTabs: ${this._MAX_PAGES}\n`);
	}
	_onBrowserDestroyed = () => {
		console.log('Goodbye!');
	}
	_onPageCreated = () => {
		this._TOTAL_PAGES++;
	}
	_onPageDestroyed = () => {
		this._TOTAL_PAGES ? this._TOTAL_PAGES -= 1 : 0 ;
		if(this._TOTAL_PAGES === 0) {
			this.close();
		}
	}
};
