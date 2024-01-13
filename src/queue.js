import EventEmitter from 'events';

export default class Queue extends EventEmitter {
	//PUBLIC
	get size() { return this._queue.length };

	enq(data) {
		this.emit('enq', data);
		const len = this._queue.unshift(data);
		return len;
	}

	deq() {
		this.emit('dequeue');
		const data = this._queue.pop();
		return data;
	}

	peek() {
		return this._queue[this._queue.length-1];
	}

	isEmpty() {
		return this._queue.length ? false : true; 
	}

	// PRIVATE
	_queue = [];

};
