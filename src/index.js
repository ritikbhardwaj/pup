import puppeteer from 'puppeteer';
import Browser from './browser.js';
import { open } from 'node:fs/promises';
import Dispatcher from './dispatcher.js';
import ScrapeTask, { Selector, FetchDataType } from './scrape-task.js';
import { Schema, DataTypes, LocalFileTransport  } from './transport.js';
import FileOps, { FileWriteMode } from './fileops.js';
import { PupConfig } from '../pup.config.js';

const run = async () => {
	const {
		worker_threads,
		showWindow,
		tabs,
		outFile,
		outPath,
		fileWriteMode,
		schema,
		filterFnTemplate,
		slTemplate,
		tasks
	} = PupConfig;

	const browser = await Browser.newBrowser()
		.showWindow(showWindow)
		.tabs(tabs)
		.launch(puppeteer);

	const tks = [];
	for(const taskDefn of tasks) {
		const { name, url, sls, pgtmt } = taskDefn;
		let selectorsDefn; 
		const selectors = [];
		if(typeof sls === 'string') {
			selectorsDefn = slTemplate[sls];
		} else if(typeof sls === 'object' && Array.isArray(sls)) {
			selectorsDefn = sls;
		} else {
			selectorsDefn = [];
		}
		for(const selector of selectorsDefn) {
			const { k, sl, fltFn, tmt } = selector;
			selectors.push(new Selector(k, sl, fltFn, tmt*1000));
		}
		const task = new ScrapeTask(
			name,
			url,
			selectors,
			pgtmt*1000
		);
		tks.push(task);
	}

	const localTransport = new LocalFileTransport(
		outFile,
		outPath,
		fileWriteMode,
		schema
	);
	const dispatcher = new Dispatcher(browser, localTransport, tks);
	dispatcher.start();
}

run();
