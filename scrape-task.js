
export const SelectorType = {
	XPath       : 'xpath',
	CssSelector : 'cssselector',
};

export const FetchDataType = {
	TextProperty:    'text-property',
	Attribute:       'attribute',
	GenericProperty: 'generic-property'
}

const State = {
	Resolved   : 'resolved',
	Failed     : 'failed',
	Pending    : 'pending'
};
const SelectorState = State;
const TaskState = State;

class FetchDataTypeBase {
	constructor(type, property) {
		this._fetchType = type;
		this._fetchProp = property; 
	}
	setElement = (element) => this._elementRef = element;
	getData = (attribute) => {};
	_fetchType;
	_fetchProp;
	_elementRef;
}

export class FetchGeneric extends FetchDataTypeBase{
	constructor(property) { super(FetchDataType.GenericProperty, property) };
	getData = (arg) => {
		if (this._elementRef === undefined) throw new Error('Data fetcher element undefined');
		return this._elementRef[this._fetchProp]
	};
}

export class FetchTextProperty extends FetchDataTypeBase{
	constructor(property) { super(FetchDataType.TextProperty, property) };
	getData = (arg) => { 
		if (this._elementRef === undefined) throw new Error('Data fetcher element undefined');
		return this._elementRef.textContent;
	}
}

export class FetchAttribute extends FetchDataTypeBase{
	constructor(property) { super(FetchDataType.Attribute, property) };
	getData = () => {
		if (this._elementRef === undefined) throw new Error('Data fetcher element undefined');
		return this._elementRef.getProperty(this._fetchProp);
	}
}

export class Selector {
	// Public
	constructor(key, selector, filterFn = (value) => value,
		opts = {},
		dataFetcherType = FetchDataType.GenericProperty,
		dataFetcherProp = 'textContent', 
		type = SelectorType.CssSelector, timeout = 3000) {

		this._selector = selector;
		this._key = key;
		this._type = type;
		this._dataFetcher = new FetchGeneric(); 
		this._data = '';
		this._filterFn = filterFn;

		this._opts = opts;

		switch(dataFetcherType) {
			case FetchDataType.GenericProperty:
				this._dataFetcher = new FetchGeneric();
				break;

			case FetchDataType.Attribute:
				this._dataFetcher = new FetchAttribute();
				break;	

			default:
				this._dataFetcher = new FetchGeneric();
				break;
		} 

		this._state = SelectorState.Pending; 
		this._timeout = timeout;
	}

	get dataFetcher() {
		return this._dataFetcher;
	}

	get filter() {
		return this._filterFn;
	}

	get selector() {
		return this._selector;
	}

	get key () {
		return this._key;
	}

	setState = (state) => {
		this._state = state;
	}

	get data() {
		return this._data;
	}

	set data (data) {
		// check for data validity
		this._data = data;
	}

	// Private
	_selector;
	_type;
	_dataFetcher;
	_key; 
	_state; 
	_data;
	_opts;
	_filterFn;
	// Selector timeout. ie waitForSelector()
	_timeout;
};

export default class ScrapeTask {
	// Public	
	constructor(url, selectors = [], timeout = 5000) {
		this._url = url;
		// this._name = name;
		this._selectors = selectors;
		this._timeout = timeout;
		this._state = TaskState.Pending;
	}

	get url () {
		return this._url;
	}

	get selectors () {
		return this._selectors;
	}

	// Private
	_id;
	_name;
	_selectors;
	_state; 
	_url;

	// Navigation timeout. page.goto()
	_timeout;
};
