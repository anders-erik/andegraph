
const fs = require('fs');
const cp = require('child_process');


let dbi = require('../db-interface/DbInterface');
const { log } = require('console');
const { query } = require('express');

let fileDir = `/data/live/files/`;

if (!fs.existsSync(fileDir)) {
	cp.execSync(`mkdir ${fileDir}`);
}


module.exports = async (req, res) => {
	res.set('Access-Control-Allow-Origin', `*`);


	// console.log('body: ', req.body)

	let methodString = 'file-' + req.method;
	// console.log("functionstring = ", req.params)
	
	let fileUuid = req.params.fileUuid;
	let fileQuery = req.query;
	let fileObject = (await dbi.queries.File_SelectOnUuid(fileUuid))[0];



	try {


		// UUID EXISTS ?
		// make sure a file object has been created previously
		if (fileObject === undefined) {
			// let dateObj = new Date(Date.now());
			console.log("_________________");
			console.log('File object does not exist. Create a File content-node first.');
			throw new Error("File object does not exist. Create a File content-node first.")
		}

		// FILE PATH CHECK
		// Using /test/api/mars-source-files-v0.3/api-logic-diagram.png
		let filePath = fileDir + `${fileObject.Uuid}`;
		let fileExists = fs.existsSync(filePath);

		// Only allow post if no file exists
		if (fileExists && req.method ==  "POST"){
			console.log("_________________");
			console.log("File already exists. PUT if you want to replace. [IN FILE: " + __filename + "]");
			throw new Error("File already exists. PUT if you want to replace")
		}
		// Make sure we don't run if we try to change a non-existing file
		if (!fileExists && (req.method == "PUT" || req.method == "GET" || req.method == "DELETE")) {
			console.log("_________________");
			console.log("File doesn't exist. Can't PUT, GET, or DELETE. [IN FILE: " + __filename + "]");
			throw new Error("File already exists. PUT if you want to replace")
		}

		
		
		let newFileObject;

		switch (req.method) {

			case 'GET':
				
				// res.set('Content-Type', `${fileObject.Type}/${fileObject.Extension}`);
				if (fileObject.Extension == "pdf")
					res.set('Content-Type', `application/${fileObject.Extension}`);
				else
					res.set('Content-Type', `${fileObject.Type}/${fileObject.Extension}`);
				res.download(filePath, `${fileObject.Title}.${fileObject.Extension}`);

				// return is needed or the default 200-response is run!
				
				return;
				break;



			case 'POST':

				fs.writeFileSync(filePath, req.body);

				// console.log(fileQuery);
				newFileObject = { ...fileObject }
				newFileObject.Type = fileQuery.Type;
				newFileObject.Title = fileQuery.Title;
				newFileObject.Extension = fileQuery.Extension;
				newFileObject.IAmAuthor = fileQuery.IAmAuthor;
				newFileObject.SizeBytes = req.body.length; // buffer object
				// console.log(newFileObject)


				await dbi.queries.File_Update(newFileObject);
				await dbi.queries.Node_Update(newFileObject);

				// await dbi.queries.File_Update(fileObject);


				// fs.linkSync(filePath, filePath + '-' + newFileObject.Title + '.' + newFileObject.Extension )
				cp.execSync(`ln -s ${newFileObject.Uuid} "${filePath}-${newFileObject.Title}.${newFileObject.Extension}"`);

				break;




			case 'PUT':

				// Buffer.from(new Uint8Array(req.body))

				fs.writeFileSync(filePath, req.body);

				// console.log(fileQuery);
				newFileObject = { ...fileObject }
				newFileObject.Type = fileQuery.Type;
				newFileObject.Title = fileQuery.Title;
				newFileObject.Extension = fileQuery.Extension;
				newFileObject.IAmAuthor = fileQuery.IAmAuthor;
				newFileObject.SizeBytes = req.body.length; // buffer object
				// console.log(req.body.length)

				// console.table([fileObject, newFileObject])

				await dbi.queries.File_Update(newFileObject);
				await dbi.queries.Node_Update(newFileObject);
				// await dbi.queries.File_Update(fileObject);


				// fs.linkSync(filePath, filePath + '-' + newFileObject.Title + '.' + newFileObject.Extension )
				//cp.execSync(`ln -s ${newFileObject.Uuid} ${filePath}-${newFileObject.Title}.${newFileObject.Extension}`);
				try {
					cp.execSync(`rm ${filePath}-*`);
				}
				catch (error) {

				}

				cp.execSync(`ln -s ${newFileObject.Uuid} ${filePath}-${newFileObject.Title}.${newFileObject.Extension}`);
				// fs.writeFileSync(filePath + '.' + newFileObject.Extension,  Buffer.from(new Uint8Array(req.body)));

				break;




			case 'DELETE':

				// Buffer.from(new Uint8Array(req.body))

				fs.unlinkSync(filePath);
				cp.execSync(`rm ${filePath}-*`);


				// update object
				newFileObject = { ...fileObject }
				newFileObject.Type = '';
				newFileObject.Title = '';
				newFileObject.Extension = '';
				newFileObject.IAmAuthor = 0;
				newFileObject.SizeBytes = 0; // buffer object
				// console.log(newFileObject)

				await dbi.queries.File_Update(newFileObject);
				// TODO : NODE IS _NOT_ GETTING THE NEWLY UPDATED 'TimeLastChange' !
				// Probably not a big deal since I've moved to ContentEdge almost exclusively, but still be mindful of this! 
				await dbi.queries.Node_Update(newFileObject);

				break;


			default:
				break;
		}


	} catch (error) {
		let date = new Date(Date.now());
		console.log("400,", methodString + ",", fileUuid + ",", date.toISOString());
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		res.status(400).send([]);
		return;
	}


	let datetime = new Date(Date.now());
	console.log(200 + ',', methodString + ',', fileUuid + ',', datetime.toISOString());
	if(query.method != "GET")
		res.status(200).send([]);

};



function getContentHeader(fileExtension) {

}
