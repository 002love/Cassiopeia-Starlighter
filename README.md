# Cassiopeia-Starlighter

## Description

**cassiopeia-starlighter** is an npm library designed to facilitate interaction with the Cassiopeia Database swiftly and effortlessly. It provides a set of tools for managing authentication, registration, file uploads, and downloads with the database.

**cassiopeia-database** does not have a website yet, and is currently in beta testing. As a reminder, this is a free file storage for any files up to 15mb. Please do not abuse the database. Use it only for its intended purpose. If your account is seen to be using the database in a dishonest or harmful way, it will be irretrievably deleted automatically.

## Installation

Install cassiopeia-starlighter using npm:

```bash
npm install cassiopeia-starlighter
```

## Usage

First, import the Cassiopeia class from the package:

```js
import { Cassiopeia } from 'cassiopeia-starlighter';
```

Create an instance of Cassiopeia with your credentials:

```js
const cassiopeia = new Cassiopeia('your_email@example.com', 'your_password');
```

### Registering a New User

```js
await cassiopeia.register();
```

### Activating a User

```js
await cassiopeia.activate('activation_code_from_email');
```

### Updating Tokens

```js
await cassiopeia.updateTokens();
```

### Uploading Files

```js
const fileBuffer = Buffer.from('your_file_data'); // or you can read file via fs
const filename = 'your_file_name.ext';
const isPublic = false; // or true for public files
const uploadResponse = await cassiopeia.upload(fileBuffer, filename, isPublic);
```

### Downloading Files

```js
const uuid = 'your_file_uuid';
const fileBuffer = await cassiopeia.download(uuid);
```

or

```js
const uuid = 'your_file_uuid';
const fileBuffer = await cassiopeia.downloadPublic(uuid);
```

for public files

## API Reference

Refer to the API documentation for detailed information on all the methods available.

## Contributing

Contributions are welcome! Please refer to the repository’s issues page for the contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Author

002love
Acknowledgments
Thanks to all the contributors who invest their time into making cassiopeia-starlighter better.

## Support

If you encounter any issues or require assistance, please open an issue on the GitHub repository.

```
Remember to replace placeholder texts like `your_email@example.com`, `your_password`, `activation_code`, `your_file_data`, `your_file_name.ext`, and `your_file_uuid` with actual values when implementing the code.

Feel free to customize this README to better fit the style and requirements of your project. Happy coding! 🌟
```
