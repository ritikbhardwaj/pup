## Puppeteer based web scraper

A generic web scraper based on Node.js and Puppeteer.
Features:

- Scrape websites simultaneously on multiple tabs 
- Store Locally or in a database

Future Goals:

- Use Node clusters or Web workers to spin up multiple instances to
  speed up the scraping process.
- Add custom errors
- Add logging and store logs in file locally for debugging
- Write tests in jest

#### Usage

```js
import { Schema, DataTypes } from './src/transport.js';
import { FileWriteMode } from './src/fileops.js';

export const PupConfig = {
	worker_threads: 4, // Pending
	showWindow: false,
	tabs: 3,
	outFile: 'scrape-result.out.pup',
	outPath: './',
	fileWriteMode: FileWriteMode.AppendToExisting, 
	schema: new Schema({
		task_id      : DataTypes.STRING,
		status       : DataTypes.STRING,
		date         : DataTypes.STRING,
		time         : DataTypes.STRING,
		url          : DataTypes.STRING,
		product_name : DataTypes.STRING,
		price        : DataTypes.STRING,
		message      : DataTypes.STRING
	}), 
	// TODO: Implement function chaining
	filterFnTemplate: {
		trim: (data) => data.trim(),
		delNonNum: (data) => data.trim().replace(/[^0-9]/, '') 
	},
	slTemplate: {
		sl_amazon: [
			{ k: 'product_name', sl: 'span#productTitle', fltFn: (data) => data.trim(), tmt: 20 },
			{ k: 'price', sl: 'span.a-price-whole', fltFn: (data) => data.trim().replace(/[^0-9]/, ''), tmt: 20 }				
		],
		sl_decathlon: [
			{ k: 'product_name', sl: 'h1.text-14.text-black', fltFn: (data) => data.trim(), tmt: 20 },
			{ k: 'price', sl: 'span.text-26.text-black', fltFn: (data) => data.trim().replace(/[^[0-9]]/, ''), tmt: 20 }				
		],
		sl_souledstore: [
			{ k: 'product_name', sl: 'h1.fbold.title-size', fltFn: (data) => data.trim(), tmt: 20 },
			{ k: 'price', sl: 'span.fbold', fltFn: (data) => data.trim().replace(/[^0-9]/, ''), tmt: 20 }				
		]
	},
	tasks: [
		{
			name: 'Decathlon-Gallon_Water_Bottle',
			url: 'https://www.decathlon.in/p/8518851/shakers/gallon-bottle-2200-ml-black?id=8518851&type=p',
			sls: 'sl_decathlon',
			pgtmt: 20 
		},
		{
			name: 'Amazon-Hazamat_DE_Razor',
			url: 'https://www.amazon.in/gp/product/B08ZKF8KTX/ref=ewc_pr_img_3?smid=A2BGSACZKMSDC9&psc=1',
			sls: 'sl_amazon',
			pgtmt: 20
		},
		{
			name: 'SouledStore-Cargo_Pants_Olive',
			url: 'https://www.thesouledstore.com/product/solids-olive-men-cargo-pants?gte=1',
			sls: 'sl_souledstore',
			pgtmt: 20
		}
	]
};

```
