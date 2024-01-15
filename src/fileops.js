import { access, open, rm, constants } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { stringifyObject } from './utils.js';

export const FileWriteMode = {
	OverrideExisting: 'override',
	AppendToExisting: 'append'
};

const {
	O_RDONLY, // Open for read only
	O_WRONLY, // Open for write only
	O_RDWR,   // Open for both read and write

	O_CREAT,  // Create a file if it does not exist already
	O_EXCL,   // Opening a file should fail if O_CREAT flag is set and file already exists
	O_APPEND, // Data will be appended to the end of file
} = constants;

const FileOpsFlags = {
	CreateIfNotExist: O_WRONLY | O_CREAT,
	FailIfFileExists: O_WRONLY | O_CREAT | O_EXCL,
	AppendToExisting: O_WRONLY | O_APPEND 
};

export default class FileOps {
	constructor(fileName = '', filePath = '', writeMode = FileWriteMode.AppendToExisting) {
		this._fileName        = fileName;
		this._filePath        = filePath;
		this._fileHandle      = null;
		this._fileWriteStream = null;
		this._writeMode       = writeMode;
	}

	fileExists = async () => {
		try {
			await access(join(this._filePath, this._fileName))
			return Promise.resolve(true);
		} catch(error) {
			return Promise.resolve(false); 
		}
	}

	write = async (dataObject) => {
		return new Promise(async (resolve, reject) => {
			if(this._fileHandle === null) {
				await this.createFile();
			}
			if(this._fileWriteStream === null) {
				reject('File stream is null');
			} else {
				this._fileWriteStream.write(stringifyObject(dataObject), 'utf-8', _ => {
					resolve(dataObject);
				});
			}

		});
	}

	createFile = async () => {
		const path = join(this._filePath, this._fileName);
		if(this._writeMode === FileWriteMode.OverrideExisting) {

			/**
			 * If file with the same name already exists. Remove it and
			 * create a new file with the name and write to it.
			 */
			if(await this.fileExists()) await rm(path);
			try {
				this._fileHandle = await open(path, FileOpsFlags.CreateIfNotExist);
				this._setupFileWriteStream(this._fileHandle);
				return Promise.resolve(this._fileHandle);
			} catch(error) {
				return Promise.reject(`Couldn't create file '${path}'.`);
			}

		} else if (this._writeMode === FileWriteMode.AppendToExisting) {

			/**
			 * If file does not exist. Return with error.
			 * If file exists. Open it in append mode and append
			 * new data at the end. 
			 */
			if(await this.fileExists()) {
				try {
					this._fileHandle = await open(path, FileOpsFlags.AppendToExisting);
					this._setupFileWriteStream(this._fileHandle);
					return Promise.resolve(this._fileHandle);
				} catch(error) {
						console.log(error);
						return Promise.reject(`Couldn't create file '${path}'.`);
				}
			} else {
				return Promise.reject(`File '${resolve(path)}' does not exist. Please create file first or open in override mode.`);
			}

		}
	}

	// Private
	_setupFileWriteStream = (fileHandle, cb) => {
		this._fileWriteStream = fileHandle.createWriteStream();
		this._fileWriteStream.on('error', (error) => {
			cb(error);
		});
	}
	_fileName;
	_filePath;
	_fileWriteStream;
	_fileHandle;
	_writeMode;
};
