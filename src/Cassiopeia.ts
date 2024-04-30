import axios from 'axios';
import { ICassiopeia, IUploadResponce } from './types';
import { serverInfo } from './serverInfo';

class Cassiopeia implements ICassiopeia {
	email: string;
	password: string;
	accessToken: string | undefined;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
		this.checkRemoteConfig();
	}

	async updateTokens() {
		try {
			const response = await axios.post(serverInfo.api + '/login', { email: this.email, password: this.password });
			if (response.status !== 200) return new Error('Error while updating tokens');
			this.accessToken = response.data.accessToken;
			console.log('Tokens successfully updated');
		} catch (error) {
			return new Error('Error while updating tokens');
		}
	}

	async checkRemoteConfig() {
		const response = await axios.get('https://raw.githubusercontent.com/002love/002love/main/Cassiopeia-Starlighter/config.json');
		if (response.data.warning === 'none') return;
		console.log(response.data.warning);
	}

	async register() {
		try {
			const response = await axios.post(serverInfo.api + '/registration', { email: this.email, password: this.password });
			if (response.status === 200) console.log('User successfully registered, please, check your email and call the activation function');
			else console.log(response.data.message);
		} catch (error) {
			return new Error('Error while registering');
		}
	}

	async activate(activationCode: string) {
		try {
			const response = await axios.get(serverInfo.api + `/activate/${activationCode}`);
			if (response.data.message === 'OK')
				console.log(
					'User successfully activated. Now you call updateTokens method to get access codes and use our database at full capacity, thank you for choosing us ❤️'
				);
		} catch (error) {
			return new Error('Error while activating');
		}
	}

	async upload(file: Buffer, filename: string, isPublic: boolean): Promise<IUploadResponce | Error> {
		if (file.byteLength > 15000000) return new Error('File is too big');
		if (!filename || typeof filename !== 'string' || filename.length < 3 || filename.length > 255 || filename.trim() === '')
			return new Error('No filename. Filename is required');
		if (!this.accessToken) return new Error('No access token. Please, refresh tokens before use this function');

		try {
			const response = await axios.post(
				serverInfo.api + '/upload',
				{ file: file.toString('base64'), filename, isPublic },
				{ headers: { Authorization: 'Bearer ' + this.accessToken } }
			);
			return response.data;
		} catch (error) {
			return new Error('Error while uploading file');
		}
	}

	async download(uuid: string, preview?: boolean): Promise<Buffer | Error> {
		if (!uuid) return new Error('No UUID');
		if (typeof uuid !== 'string') return new Error('Invalid UUID');
		if (uuid.length !== 36) return new Error('Invalid UUID');

		try {
			const response = await axios.get(serverInfo.api + `/files/${uuid}?preview=${!!preview}&info=true`, {
				headers: { Authorization: 'Bearer ' + this.accessToken }
			});
			return Buffer.from(response.data.base64, 'base64');
		} catch (error) {
			return new Error('Error while downloading file');
		}
	}

	async downloadPublic(uuid: string, preview?: boolean): Promise<Buffer | Error> {
		if (!uuid) return new Error('No UUID');
		if (typeof uuid !== 'string') return new Error('Invalid UUID');
		if (uuid.length !== 36) return new Error('Invalid UUID');

		try {
			const response = await axios.get(serverInfo.api + `/files/public/${uuid}?preview=${!!preview}&info=true`);
			return Buffer.from(response.data.base64, 'base64');
		} catch (error) {
			return new Error('Error while downloading file');
		}
	}
}

export { Cassiopeia };
