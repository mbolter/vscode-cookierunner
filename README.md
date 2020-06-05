# vscode-cookierunner README

Extension for running Cookiecutter inside Visual Studio Code.

Activated through Command palette (Ctrl+Shift+P / Command+Shift+P), command "CookieRunner: Create new project" displays templates from predefined local folders and git-repos. Once selected cookiecutter executes with selected user input. Project will be created in currently open VS Code folder.

<img src="https://github.com/mbolter/vscode-cookierunner/blob/master/images/cmd_run.gif">

## Features

- Run cookiecutter from Command Palette
- Configure folders containing your cookicutter templates
- Configure templates in git-repos
- Cookicutter CLI controlled in Terminal-view
- Target/Outpur directory is currently open dir

## Requirements

- [Cookiecutter](https://github.com/cookiecutter/cookiecutter)

## Extension Settings

This extension contributes the following settings:

* `vscode-cookierunner.basic.localDiskTemplates`: Array with local folders containing cookiecutter templates
* `vscode-cookierunner.basic.gitTemplates`: Array with urls to git repos of templates

## Known Issues

## Release Notes

### 1.0.0

- Initial release


