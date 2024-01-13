import { access, open, rm, constants } from 'node:fs/promises';
import { join } from 'node:path';

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
	constructor(fileName = '', filePath = '', writeMode = FileWriteMode.OverrideExisting) {
		this._fileName   = fileName;
		this._filePath   = filePath;
		this._fileHandle = null;
		this._writeMode  = writeMode;
	}

	fileExists = async () => {
		try {
			await access(join(this._filePath, this._fileName))
			return Promise.resolve(true);
		} catch(error) {
			return Promise.resolve(false); 
		}
	}

	createFile = async () => {
		const path = join(this._filePath, this._fileName);
		if(this._writeMode === FileWriteMode.OverrideExisting) {
			try {
				this._fileHandle = open(path, FileOpsFlags.FailIfFileExists);
			} catch(error) {

				// File exists. Override it.
				await rm(path);
				try {
					open(path, FileOpsFlags.CreateIfNotExist);
				} catch(error) {
					return Promise.reject(`Couldn't create file '${this._fileName}'.`);
				}
			}
		} else if (this._writeMode === FileWriteMode.AppendToExisting) {
			try {
				this._fileHandle = open(path, FileOpsFlags.AppendToExisting)
			} catch(error) {
					return Promise.reject(`Couldn't create file '${this._fileName}'.`);
			}	
		}
	}

	// Private
	_fileName;
	_filePath;
	_fileHandle;
	_writeMode;
};
