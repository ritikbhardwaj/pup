export default const PupConfig = {
	worker_threads: 4,
	tabs: 3,
	tasks: [
		{
			name: 'Souled Store: Cargo Pants',
			url: '',
			selectors: [
				{ key: 'product_name', selector: '' },
				{ key: 'price', selector: '' }				
			]
		},
		{
			name: 'Amazon: Wooden Knife Holder',
			url: '',
			selectors: [
				{ key: 'product_name', selector: '' },
				{ key: 'price', selector: '' },
			]
		},
		{
			name: 'Amazon: Gillette Shaving Gel',
			url: '',
			selectors: [
				{ key: 'product_name', selector: '' },
				{ key: 'price', selector: '' },
			]
		}
	]
}