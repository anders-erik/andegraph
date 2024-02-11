/* 

I wrote with a few glasses of wine on the evening of 2024-02-10. Please excuse any **ehrm** peculiarities. 

The available tools were too complicated to bend to my specific needs at this time.

Instead we got this. A handful of funtions. One task.

The task? Watch the files of the overlay-dev-folder and, on any change, concatenate all html, css, and js files directly linked in the index.html file into one big js file.

This behemeoth of a file is then written to the appropriate content_script folder for the extension.

When the file is then written, 'web-ext' will detect that change and update the extension itself. 

AEE
(2024-02-10)

*/


console.log()

const path = require('path');
const fs = require('fs');

// let srcDir = '../';

let srcDir = path.resolve('./')

let devDir = srcDir + '/overlay-dev/';
let distDir = srcDir + '/src/overlay-dist/';


// Will hold the content to be written to dist
let tempFileContent = '';


// fs.writeFileSync(distDir + 'dist.js', '')

// console.log('srcDir', srcDir)
// console.log('devDir', devDir)
// console.log('distDir', distDir)

// console.log(fs.readdirSync(devDir))



function startWatchingDirFiles(dirToWatch) {

	console.log()

	// https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
	let dirents = fs.readdirSync(dirToWatch, { withFileTypes: true });

	dirents.forEach(dirent => {


		if (dirent.isFile()) {

			// https://stackoverflow.com/questions/45135338/fs-watchfile-delayed-nodejs
			fs.watchFile(dirToWatch + dirent.name, { interval: 1000 }, () => {

				console.log('CHANGE')

				writeToDist()

			});

			console.log('watching: ', dirToWatch + dirent.name)

		}
		else {

			// console.log(dirent.name, dirent.isDirectory() ? ': directory' : 'file')

			// RECURSIVE WATCH
			startWatchingDirFiles(dirToWatch + dirent.name + '/')

		}

	});
	console.log()

}









// The main function that wiil read all files AND write them to dist
function writeToDist() {


	// clear old overlay during development!
	// Moved to 'window.reload.location()' in order to clear style sheets injected into header
	tempFileContent = `

	if(document.getElementById('contextOverlay') != undefined){
		// document.remove(document.getElementById('contextOverlay'))
		// document.getElementById('contextOverlay').remove()
		window.location.reload();
	}

	`;


	tempFileContent += htmlBodyContents();
	tempFileContent += linkedCssFileContents();
	tempFileContent += linkedScriptFileContent();


	fs.writeFileSync(distDir + 'dist.js', tempFileContent)
	console.log('Wrote to: ', distDir + 'dist.js');
}





function linkedScriptFileContent() {

	let scriptFilePaths = [];
	let newFileContents = '';

	let indexHtml = fs.readFileSync(devDir + 'index.html', "utf8");
	// indexHtml = indexHtml.replace(/\s/g, '')
	// console.log(indexHtml);

	const regexp = /.js/g;
	const result = regexp.exec(indexHtml);
	// console.log(result)


	const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	// Extracting script tags from HTML content using the regex
	const scriptTags = indexHtml.match(scriptTagRegex);
	// Output the matched script tags
	// console.log(scriptTags);


	const regexBetweenQuotes = /"([^"]*)"/g;

	for (let scriptTag of scriptTags) {
		// let match = regexBetweenQuotes.exec(scriptTag)
		let match = scriptTag.match(regexBetweenQuotes)[0].replaceAll('"', '')
		// console.log(scriptTag)
		// console.log("match ", match[0])
		// console.log()
		scriptFilePaths.push(devDir + match)

	}

	// console.log('Read the following files: ')
	for (let scriptFilePath of scriptFilePaths) {
		// console.log(filePath)
		let fileContents = fs.readFileSync(scriptFilePath, "utf8");

		newFileContents += '\n' + fileContents;
	}
	// console.log()

	// console.log(newFileContents)
	// fs.appendFileSync(distDir + 'dist.js', newFileContents)

	// console.log('Wrote to ')
	// console.log(distDir + 'dist.js')
	// console.log()

	return newFileContents;
}




function linkedCssFileContents() {

	let cssFilePaths = [];
	let cssFileContents = '';

	let indexHtml = fs.readFileSync(devDir + 'index.html', "utf8");
	// indexHtml = indexHtml.replace(/\s/g, '')
	// console.log(indexHtml);



	// const scriptTagRegex = /\b\w+\.css\b/gi;
	const cssFilePathRegex = /\"([^"]*\.css)\"/gi;
	// Extracting script tags from HTML content using the regex
	cssFilePathsWithQuotes = indexHtml.match(cssFilePathRegex);
	// cssFilePaths = cssFilePathsWithQuotes.
	for (let cssFilePathWithQuotes of cssFilePathsWithQuotes) {
		cssFilePaths.push(cssFilePathWithQuotes.replaceAll('\"', ''))
	}
	// Output the matched script tags
	// console.log(cssFilePaths);


	const regexBetweenQuotes = /"([^"]*)"/g;




	// console.log('Read the following files: ')
	for (let cssFilePath of cssFilePaths) {
		// console.log(cssFilePath)
		let fileContents = fs.readFileSync(devDir + cssFilePath, "utf8");

		cssFileContents += '\n' + fileContents;
	}
	// console.log()


	// console.log(newFileContents)
	// fs.writeFileSync(distDir + 'dist.css', newFileContents)
	let innerCssString = `\n\n

let styleSheet = document.createElement("style");
styleSheet.innerText = \`
${cssFileContents};
\`
document.head.appendChild(styleSheet);

	`


	return innerCssString;
}





function htmlBodyContents() {

	let cssFilePaths = [];
	let newFileContents = '';

	let indexHtml = fs.readFileSync(devDir + 'index.html', "utf8");
	// indexHtml = indexHtml.replace(/\s/g, '')
	// console.log(indexHtml);



	const bodyContentRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
	const bodyContentMatch = indexHtml.match(bodyContentRegex);
	let bodyContent;

	if (bodyContentMatch && bodyContentMatch.length >= 2) {
		// Extracted content between <body> tags
		bodyContent = bodyContentMatch[1];
		// console.log(bodyContent);
	} else {
		console.log("No <body> tags found or content between them.");
		return;
	}



	let innerHtmlString = `\n\n

document.body.innerHTML += \`

${bodyContent}

		\`
	`


	return innerHtmlString;

}


writeToDist()

startWatchingDirFiles(devDir);


