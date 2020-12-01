// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const jsonObject = require('./resources/resource.json');
const rest = require('./facilities/module_rest.js')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo-extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		var vsCodePath = vscode.workspace.rootPath;
		if (!vsCodePath) {
			vscode.window.showInformationMessage('Open Folder is need');
			return;
		}

		// retrieve values
		var myJson = jsonObject;

		// writing
		var filePath = path.join(vscode.workspace.rootPath, 'my_xml.xml');
		var content = "<xml>my xml</xml>"
		fs.writeFileSync(filePath, content, 'utf8');

		// opening
		var openPath = vscode.Uri.parse("file:///" + filePath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc);
			vscode.window.showInformationMessage('New file has been created :D');
		});
	});

	let restTest = vscode.commands.registerCommand('demo-extension.helloRest', function () {

		const options = {
			host: 'jsonplaceholder.typicode.com',
			port: 443,
			path: '/posts',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		rest.getJSON(options, (statusCode, result) => {
			// I could work with the resulting HTML/JSON here. I could also just return it
			console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(restTest);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}

module.exports = {
	activate,
	deactivate
}
