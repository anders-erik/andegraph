
const shardQueries = require('../../../../sql/ShardQueries');

const fs = require('node:fs'); 



module.exports = async (req, res) => {

    //console.log('getting shard file');

    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;


    let queryShard = await shardQueries.selectShard(shardid);
    //console.log(queryShard);

    // equals empty array?? not intuitive but it works...
    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        const file = `/data/live/sources/${sourceid}/shards/${shardid}_sh.${queryShard[0].fileEnding}`;
        

        if(queryShard[0].fileType == 'text'){

            //res.send("asdfasdf");
            let textContent = await shardQueries.selectShardTextContent(shardid);

            //console.log(textContent)
            res.set('Content-fileType', 'text');
            res.send(textContent);
            
            fs.readFile(file, 'utf8', function(err, data){ 
      
                // Display the file content 
                //console.log(typeof data); 
                



            });

        }
        else {

            console.log(`Downloaded file for shard #${shardid}, at path ${file}`);

            res.download(file);

        }

        

        

    }




};
