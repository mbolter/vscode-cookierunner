
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('vscode-cookierunner.cookierunner', function () {
		var term;
		
		var templates = getTemplates()
		
		const cookieSelect = () => {
            return vscode.window.showQuickPick(templates, {
                placeHolder: "Select Cookiecutter template", ignoreFocusOut: true });
		};
		cookieSelect().then(selection => {
            if (!selection) {
                return;
			}

			var outputfolder = vscode.workspace.rootPath
			var command = "".concat("cookiecutter -o ", outputfolder, " ", selection); 
			if (vscode.window.terminals.length < 1) {
				term = vscode.window.createTerminal("bash");
			} else {
				term = vscode.window.activeTerminal;
			}
			term.show();
			term.sendText(command);

			vscode.window.showInformationMessage('Running Cookiecutter with : ' + selection);
		});
	
	});
	context.subscriptions.push(disposable);
}

function getConfig() {
	return vscode.workspace.getConfiguration('vscode-cookierunner');
}

function getLocalTemplateFolders(configuration) {
	var configuredFolders = configuration.get('basic.localDiskTemplates');
	var projectFolders = [].concat.apply([], configuredFolders.map(f => getSubFolders(f)));
	return projectFolders
}

function getGitTemplateFolders(configuration) {
	return configuration.get('basic.gitTemplates')
}

function getSubFolders(directory) {
	var subfolders = fs.readdirSync(directory).filter(function (file) {
		return fs.statSync(directory+'/'+file).isDirectory();
	  });
	return subfolders.map(p => path.join(directory, p));
}

function getTemplates() {
	var extConfig = getConfig();
	var localFolders = getLocalTemplateFolders(extConfig);
	var gitFolders = getGitTemplateFolders(extConfig);
	var templates = localFolders.concat(gitFolders)
	return templates
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
