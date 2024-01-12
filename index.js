import puppeteer from 'puppeteer';
import Browser from './browser.js';
import { open } from 'node:fs/promises';
import Dispatcher from './dispatcher.js';
import ScrapeTask, { Selector, FetchDataType } from './scrape-task.js';

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

const run = async () => {
	const __urls = await fetchUrlsFromFile();
	const browser = await Browser.newBrowser()
		.showWindow(false)
		.tabs(4)
		.launch(puppeteer);

	const demoLinks = [
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
	].splice(0,160);

	const amazonLinks = [
		'https://www.amazon.in/Engage-Cool-Marine-Pocket-Perfume/dp/B079H12TC8/ref=sr_1_156?crid=3GFMFR248N1O3&keywords=perfumes&qid=1704825966&sprefix=perfumes%2Caps%2C559&sr=8-156',
		'https://www.amazon.in/Engage-Pocket-Perfume-Women-Cool/dp/B0735HDWWZ/ref=pd_bxgy_img_d_sccl_1/261-6995092-7112216?pd_rd_w=HExlv&content-id=amzn1.sym.2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_p=2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_r=1JA00X634JAKRRJWEB33&pd_rd_wg=OMyu5&pd_rd_r=8c6fb515-4781-4b66-8ecc-37c97a1c781d&pd_rd_i=B0735HDWWZ&psc=1',
		'https://www.amazon.in/Engage-Floral-Fresh-Pocket-Perfume/dp/B07DCKKTGC/ref=pd_bxgy_img_d_sccl_2/261-6995092-7112216?pd_rd_w=oAfDZ&content-id=amzn1.sym.2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_p=2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_r=69EX0XC33TPSXTB1WYGH&pd_rd_wg=p7hcd&pd_rd_r=2a47ffc9-7e63-4d5e-b7b0-7dcd31df8423&pd_rd_i=B07DCKKTGC&psc=1',
		'https://www.amazon.in/Yardley-London-Morning-Compact-Perfume/dp/B07K2HD8T7/ref=pd_bxgy_img_d_sccl_1/261-6995092-7112216?pd_rd_w=H7nPd&content-id=amzn1.sym.2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_p=2f895d58-7662-42b2-9a98-3a18d26bef33&pf_rd_r=73NSKFS3JCXDPCWAZB5R&pd_rd_wg=M5wrI&pd_rd_r=a6c2d63e-00ae-42da-aab8-19a3ec0f869c&pd_rd_i=B07K2HD8T7&psc=1',
		'https://www.amazon.in/Orpat-OEH-1220-2000-Watt-Heater-White/dp/B00B7GHQQW/ref=zg_bs_c_kitchen_d_sccl_1/261-6995092-7112216?pd_rd_w=z868d&content-id=amzn1.sym.7dd29d48-66c1-486c-967d-2ed40101f2ea&pf_rd_p=7dd29d48-66c1-486c-967d-2ed40101f2ea&pf_rd_r=HCSCDR4ZVW8RF4J8GAPF&pd_rd_wg=Jl7db&pd_rd_r=f5bad811-e9cf-4297-a6fa-884334a46978&pd_rd_i=B00B7GHQQW&psc=1'		
	]
	const tasks = [];
	for(const link of demoLinks) {
		tasks.push(new ScrapeTask(
			'Amazon Product',
			link,
			[
				new Selector(
					'product_name',
					'h1.text-14',
					(data) => data.trim()
				),
				new Selector(
					'price',
					'span.text-26'
				),
				// new Selector(
				// 	'rating',
				// 	// 'span#acrPopover > span.a-declarative > a > span',
				// 	'',
				// 	(data) => data.trim()
				// ),
				// new Selector(
				// 	'total_reviews',
				// 	'span#acrCustomerReviewText',
				// 	(data) => data.split(' ')[0]
				// )
			]
		))
	}
	const dispatcher = new Dispatcher(browser, tasks);

	dispatcher.start();
}

run();
