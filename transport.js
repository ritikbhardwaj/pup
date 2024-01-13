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
		this._transportOpts = opts;
		this._schema = schema;
		this.__transportType = type;
	}
	checkConnection = async () => { throw new Error(`Method 'checkConnection()' must be implemented.`); }
	connect = async () => { throw new Error(`Method 'connect()' must be implemented.`); }
	store = async () => { throw new Error(`Method 'store()' must be implemented.`); }
	dataSchema = (schema) => {

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
	constructor(opts, schema) {
		super(opts, schema, TransportType.LocalStorage);
	}

	checkConnection = async () => {}
	connect = async () => {}
	store = async () => {}
}

export class MyqlDbTransport extends TransportBase {}

export class MongoDbTransport extends TransportBase {}

export class SqLiteDbTransport extends TransportBase {} 
