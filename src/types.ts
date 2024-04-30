export interface ICassiopeia {
	email: string;
	password: string;
	accessToken: string | undefined;
}

export enum MessageType {
	TEXT = 'TEXT',
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
	AUDIO = 'AUDIO',
	DOCUMENT = 'DOCUMENT',
	FONT = 'FONT',
	EXAMPLE = 'EXAMPLE',
	MODEL = 'MODEL',
	MULTIPART = 'MULTIPART',
	UNKNOWN = 'UNKNOWN'
}

export interface IUploadResponce {
	uuid: string;
	type: MessageType;
	blurhash: string | 'null';
}
