import puppeteer from 'puppeteer';
import Browser from './browser.js';
import { open } from 'node:fs/promises';
import Dispatcher from './dispatcher.js';

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
			console.log(_newUrls.length);
			resolve(_newUrls);
		});
	});
		
}

const run = async () => {
	const __urls = await fetchUrlsFromFile();
	const browser = await Browser.newBrowser()
		.showWindow(false)
		.tabs(8)
		.launch(puppeteer);

	const dispatcher = new Dispatcher(browser, [
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p',
		'https://www.decathlon.in/p/8535863/mountain-bikes/mountain-bike-rockrider-st540?id=8535863&type=p',
		'https://www.decathlon.in/p/8591166/mountain-bikes/mountain-bike-rockrider-st120?id=8591166&type=p',
		'https://www.decathlon.in/p/8812099/jogging-clothing/run-warm-long-sleeved-running-t-shirt-red?id=8812099&type=p',
		'https://www.decathlon.in/p/8398867/jogging-clothing/men-uv-protect-running-t-shirt-black?id=8398867&type=p',
		'https://www.decathlon.in/p/8751851/jogging-clothing/men-s-running-warm-long-sleeved-t-shirt-warm-500-beige?id=8751851&type=p',
		'https://www.decathlon.in/p/8776135/jogging-clothing/men-running-tshirt-blue-grey?id=8776135&type=p',
		'https://www.decathlon.in/p/8487923/jogging-clothing/men-warm-long-sleeved-running-t-shirt-black?id=8487923&type=p',
		'https://www.decathlon.in/p/8326403/men-tracksuit/men-tracksuit-jacket-polyester-black?id=8326403&type=p',
		'https://www.decathlon.in/p/8560956/skipping-ropes/skipping-rope-jr100?id=8560956&type=p',
		'https://www.decathlon.in/p/8731509/backpacks/hiking-backpack-10-l-nh-arpenaz-50?id=8731509&type=p'
	].splice(0,160));
	dispatcher.start();
}

run();
