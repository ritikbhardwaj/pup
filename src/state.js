export default class HasState {

	constructor() { this._state = {}; }

	setState = (state) => {
		this._state.s = state;
		return this;
	}

	reason = (reason) => {
		if(typeof reason !== 'string') throw new TypeError('Reason must be a string');
		this._state.reason = reason;
	}

	get state() {
		return this._state.s;
	}

	// Private
	_state;
};
