import FileOps, { FileWriteMode } from './fileops.js';
import { PageResponseStatus,  } from './page.js';
import { getDate, getTime } from './utils.js';

/**
 * Transport types enum. 
 */
export const TransportType = {
	LocalStorage: 'localstorage',
	MySql: 'mysql',
	Sqlite: 'sqlite',
	MongoDB: 'mongodb'
};

export const DataTypes = {
	STRING:  'string',
	INTEGER: 'number',
	// DATE:    'date',
	BOOLEAN: 'boolean'
};

export class Schema {
	constructor(schema = {}) {
		if(this._isSchemaValid(schema) === false) throw new Error('Invalid schema object.');
		this._schema = schema;
	}

	setSchema = (schema) => {
		if(this._isSchemaValid(schema) === false) throw new Error('Invalid schema object.');
		this._schema = schema;
	}

	isDataValid = (data) => {
		let isValid = true;

		if(Object.keys(data).length === 0) {
			// Debug Message: empty schema validates every data
			return true;
		}

		let keyIdx = -1;
		const schemaKeys = Object.keys(this._schema);
		for(const [key, value] of Object.entries(data)) {
			keyIdx = schemaKeys.indexOf(key);
			if(keyIdx !== -1 && (typeof value) === this._schema[key]) {
				isValid = true;
			} else {
				isValid = false;
				break;
			}
		}
		return isValid;
	}

	// Private
	_isSchemaValid = (schema) => {
		let isValid = true;
		let dataTypes = Object.values(DataTypes);

		if(typeof schema !== 'object') return false;
		for(const value of Object.values(schema)) {
			if(dataTypes.indexOf(value) === -1) {
				isValid = false;
				break;
			}
		}
		return isValid;
	}

	_schema;
};

/**
 * Abstract class TransportBase 
 */
class TransportBase {
	// Public
	constructor(opts, schema, type = TransportType.LocalStorage) {
		if(this.constructor === TransportBase) throw new Error('Can\'t instantiate abstract base class TransportBase');
		if(typeof opts !== 'object') throw new Error('Transports options must be an object.');
		if(!(schema instanceof Schema)) throw new Error('Invalid schema object.');
		this._transportOpts = opts;
		this._schema = schema;
		this.__transportType = type;
	}
	checkConnection = async () => { throw new Error(`Method 'checkConnection()' must be implemented.`); }
	connect = async () => { throw new Error(`Method 'connect()' must be implemented.`); }
	store = async () => { throw new Error(`Method 'store()' must be implemented.`); }
	dataSchema = (schema) => {

	}
	
	get schema() {
		return this._schema;
	}

	isSchemaValid = () => {}
	// removeData = () => { throw new Error(``); }
	// updateData = () => { throw new Error(``); }

	// Private
	_transportOpts;
	_transportType;
	_schema;
};

export class LocalFileTransport extends TransportBase {
	constructor(fileName, filePath, fileWriteMode, schema) {
		super({ fileName, filePath }, schema, TransportType.LocalStorage);
		this._fileOps = new FileOps(
			fileName,
			filePath,
			fileWriteMode
		);
		this._NAME_SLICE = 20;
	}

	check = async () => {
		try {
			await this._fileOps.fileExists(); 
		} catch(error) {
		}
	}

	establish = async () => {
		return this._fileOps.createFile();
	}

	store = async (data) => {
		const stub = {};
		stub['status'] = 'null';
		for(const key of Object.keys(this._schema._schema)) {
			stub[key] = 'null';
			if(key === 'date') {
				stub['date'] = getDate();
			}
			if(key === 'time') {
				stub['time'] = getTime();
			}
		}
		const { status, url, task_id, selectors, message } = data;
		stub['url']     = url;
		stub['task_id'] = task_id;
		stub['message'] = 'null';
		if(status === PageResponseStatus.Resolved && Array.isArray(selectors) ) {

			stub['status'] = PageResponseStatus.Resolved;
			for(const s of data.selectors) {
				if(s.status === 'fulfilled') {
					const { key, data} = s.value;
					stub[key] = data;
				} else {
					console.log(s.reason);
				}	
			}

			if(this._schema.isDataValid(stub)) {
				this._writeToFile(stub);	
			} else {
				const { task_id, date, time, product_name } = stub;
				console.log(`Date:${date}|time:${time}|Product: ${product_name?.slice(0, this._NAME_SLICE)}... did not match schema.`)
			}
		} else if (status === PageResponseStatus.Error && message) {
			stub['status'] = PageResponseStatus.Error;
			const { task_id, message } = data;
			stub['task_id'] = task_id;
			stub['message'] = message;
			if(this._schema.isDataValid(stub)) {
				this._writeToFile(stub);
			} else {
				console.log(stub);
				const { task_id, date, time, product_name } = stub;
				console.log(`Date:${date}|time:${time}|Product: ${product_name.slice(0, this._NAME_SLICE)}... did not match schema.`)
			}
		}
	}

	// Private
	_writeToFile = (stub) => {
		this._fileOps.write(stub).then((stub) => {
			const { product_name } = stub;
			console.log(`Product: '${product_name.slice(0, this._NAME_SLICE)}...' written to file.`);
		})
		.catch((stub) => {
			const { product_name } = stub;
			console.log(`Product: '${product_name.slice(0, this._NAME_SLICE)}. 'Error writing to file.`);
		})
	}
	_fileOps;
	_NAME_SLICE;
}

export class MyqlDbTransport extends TransportBase {}

export class MongoDbTransport extends TransportBase {}

export class SqLiteDbTransport extends TransportBase {} 
