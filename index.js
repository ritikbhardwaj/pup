import puppeteer from 'puppeteer';
import Queue from './queue.js';
import Browser from './browser.js';
import { stdout } from 'node:process';
import { Worker } from 'node:worker_threads';
import { EventEmitter } from 'node:events';
import { open } from 'node:fs/promises';

const fetchUrlsFromFile = () => {
	return new Promise(async (resolve, reject) => {
		const _newUrls = [];
		const urlsFileHandle = await open('./links.txt', 'r');
		const fileReadStream = urlsFileHandle.createReadStream({
			encoding: 'utf-8',
		});

		fileReadStream.on('data', (chunk) => {
			chunk.split('\n').forEach((link) => {
				_newUrls.push(link);
			});
		});

		fileReadStream.on('end', () => {
			resolve(_newUrls);
		});
	});
		
}

let pms = [];
const values = [];
const TAB_NUMS = 5;
const TOTAL_TASKS = 160;

// const urls = _newUrls.slice(0,TOTAL_TASKS);

const em = new EventEmitter();

em.on('batch-done', (pages, __urls) => {
	if(__urls.length === 0) {
		browser.close();
		return;
	}
	runBatchCycle(pages, __urls);
});

const fetchDataFromUrl = async (page, url) => {
	const pageGotoPromise = page.goto('https://www.'+url);
	const elementPromise = page.waitForSelector('span.a-price-whole');
	const titlePromise = page.waitForSelector('span#productTitle');
	const valuePromise = elementPromise.then((element) => element.evaluate(el => el.textContent));
	const titleTextPromise = titlePromise.then((element) => element.evaluate(el => el.textContent));
	return Promise.all([pageGotoPromise, elementPromise, valuePromise, titleTextPromise]);
}

const runBatchCycle = (pages, urls) => {
	console.log('Remaining Links: ', urls.length);
	pms = [];
	for(let page of pages) {
		pms.push(fetchDataFromUrl(page, urls.pop()));
	}
	Promise.all(pms).then(pms => {
		console.log('Fetched: ', pms.map(pm => ({ title: pm[3].trim(), price: pm[2] })));
		values.push(pms.map(pm => pm[2]));
		if(urls.length >= 0) {
			em.emit('batch-done', pages, urls);
		}
	}).catch((err) => {
		console.log(err);
		console.log('oops!');
		if(urls.length >= 0) {
			em.emit('batch-done', pages, urls);
		}
	});
}

let browser;
const run = async () => {
	const __urls = await fetchUrlsFromFile();
	console.log('TOTAL URLS: ', __urls.length);
	console.log('WORKING URLS: ', TOTAL_TASKS);
	browser = await Browser.newBrowser()
		.showWindow(false)
		.tabs(TAB_NUMS)
		.launch(puppeteer);

	const pages = browser.pgRefs;
	runBatchCycle(pages, __urls.splice(0, TOTAL_TASKS));
}

run();


