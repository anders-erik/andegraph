
const fs = require('fs');
const cp = require('child_process');

let dbi = require('../db-interface/DbInterface');

let fileDir = `/data/live/files-v0.2/`;




module.exports = async (req, res) => {

	// console.log('body: ', req.body)

	let fileUuid = req.params.fileUuid;
	let fileQuery = req.query;
	let fileObject = (await dbi.queries.File_SelectOnUuid(fileUuid))[0];

	if (fileObject === undefined) {
		res.status(400).send(['File object does not exist. Create a File content-node first. ']);
		return;
	}

	let filePath = fileDir + `${fileObject.Uuid}`;

	// console.log(req.method);


	switch (req.method) {
		
		case 'GET':


			// console.log(fileObject)
			// console.log(`/data/live/files-v0.2/${fileObject.Uuid}`)
			// console.log(`${fileObject.Title}.${fileObject.Extension}`)
			
			res.set('Content-Type', `${fileObject.Type}/${fileObject.Extension}`);
			res.download(filePath, `${fileObject.Title}.${fileObject.Extension}`);
			break;


		case 'POST':

			if (fs.existsSync(filePath)) {

				console.log('EXISTS')
				res.status(400).send(['File already exists. PUT if you want to replace']);
				return;

			}
			else {
				// console.log('DOES NOT EXIST')
				// Buffer.from(new Uint8Array(req.body))

				fs.writeFileSync(filePath, req.body);
				

				// console.log(fileQuery);
				let newFileObject = {...fileObject}
				newFileObject.Type = fileQuery.Type;
				newFileObject.Title = fileQuery.Title;
				newFileObject.Extension = fileQuery.Extension;
				newFileObject.IAmAuthor = fileQuery.IAmAuthor;
				newFileObject.SizeBytes = req.body.length; // buffer object
				// console.log(newFileObject)

				console.log('File put:')
				console.table([fileObject, newFileObject])

				await dbi.queries.File_Update(newFileObject);
				// await dbi.queries.File_Update(fileObject);


				// fs.linkSync(filePath, filePath + '-' + newFileObject.Title + '.' + newFileObject.Extension )
				cp.execSync(`ln -s ${newFileObject.Uuid} ${filePath}-${newFileObject.Title}.${newFileObject.Extension}`);

				// fs.writeFileSync(filePath + '.' + newFileObject.Extension,  Buffer.from(new Uint8Array(req.body)));
				

				// console.log('new file')
				// console.log(fileObject)
				// console.log('body: ', req.body)
				// console.log(req.headers)
				res.status(200).send([]);

			}

			break;




		case 'PUT':

			if (!fs.existsSync(filePath)) {

				console.log('DOES NOT EXISTS')
				res.status(400).send(['File does not exists. POST if you want to create']);
				return;

			}
			else {
				// console.log('DOES NOT EXIST')
				// Buffer.from(new Uint8Array(req.body))

				fs.writeFileSync(filePath, req.body);


				// console.log(fileQuery);
				let newFileObject = { ...fileObject }
				newFileObject.Type = fileQuery.Type;
				newFileObject.Title = fileQuery.Title;
				newFileObject.Extension = fileQuery.Extension;
				newFileObject.IAmAuthor = fileQuery.IAmAuthor;
				newFileObject.SizeBytes = req.body.length; // buffer object
				// console.log(req.body.length)


				console.log('File put:')
				console.table([fileObject, newFileObject])

				await dbi.queries.File_Update(newFileObject);
				// await dbi.queries.File_Update(fileObject);


				// fs.linkSync(filePath, filePath + '-' + newFileObject.Title + '.' + newFileObject.Extension )
				//cp.execSync(`ln -s ${newFileObject.Uuid} ${filePath}-${newFileObject.Title}.${newFileObject.Extension}`);
				try{
					cp.execSync(`rm ${filePath}-*`);
				}
				catch(error){

				}
				
				cp.execSync(`ln -s ${newFileObject.Uuid} ${filePath}-${newFileObject.Title}.${newFileObject.Extension}`);
				// fs.writeFileSync(filePath + '.' + newFileObject.Extension,  Buffer.from(new Uint8Array(req.body)));


				// console.log('new file')
				// console.log(fileObject)
				// console.log('body: ', req.body)
				// console.log(req.headers)
				res.status(200).send([]);

			}

			break;



		case 'DELETE':

			if (!fs.existsSync(filePath)) {

				console.log('DOES NOT EXISTS')
				res.status(400).send([`File does not exists. Can't delete. `]);
				return;

			}
			else {
				// console.log('DOES NOT EXIST')
				// Buffer.from(new Uint8Array(req.body))

				fs.unlinkSync(filePath);

				try{
					cp.execSync(`rm ${filePath}-*`);
				}
				catch(error){

				}


				console.log('FILE DELETED')
				res.status(200).send([]);

			}

			break;



		default:
			break;
	}


	// res.status(200).send([]);

};



function getContentHeader(fileExtension){

}
