
// const fs = require('fs');

const fileHandling = require("./fileHandling");

const axios = require("axios");

// fileHandling.getFileData("");

let url = "";

// Used for await-sleep
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

async function run() {

    
    // MAKE SURE AXIOS WORKS
    // url = "https://axios-http.com/docs/res_schema";
    // try {
    //     const response = await axios.get(url);
        
    //     console.log(response.status, url);
    // } catch (error) {
    //     console.error(error.status, url);
    // }



    // await delay(2000);
    // CREATE FILE 1 OBJECT
    let file_1_object = {};
    url = "http://localhost:3000/api/v02/content/Content-InsertOnTable?Table=File";
    try {
        const response = await axios.post(url);
        file_1_object = response.data;
        // console.log(response.data)
        console.log(response.status, "POST", url);
    } catch (error) {
        console.error(error.status, "POST", url);
    }



    // await delay(2000);
    // POST FILE 1
    
    // READ FILE FROM DISK
    let file_1_path = "files/coon.png";
    let data_1;
    url = `http://localhost:3000/api/v02/file/${file_1_object.Uuid}?Type=image&Title=puppies3&Extension=png&IAmAuthor=0`;
    
    data_1 = fileHandling.getFileData(file_1_path);

    // POST
    try {
        const response = await axios.post(url, data_1);
        // file_1_object = response.data;
        // console.log(response.data)
        console.log(response.status, "POST", url);
    } catch (error) {
        console.error(error.status, "POST", url);
    }


    // await delay(4000);
    // PUT FILE 1 - 2

    // READ FILE FROM DISK
    let file_2_path = "files/pso_ep10.png";
    let data_2;
    url = `http://localhost:3000/api/v02/file/${file_1_object.Uuid}?Type=image&Title=pso_ep10&Extension=png&IAmAuthor=1`;

    data_2 = fileHandling.getFileData(file_2_path);
    // console.log(data.size())
    // POST
    try {
        // const response = await axios.post(url, data_2);
        const response = await axios.put(url, data_2);

        // file_1_object = response.data;
        // console.log(response.data)
        console.log(response.status, "PUT", url);
    } catch (error) {
        console.error(error.status, "PUT", url);
    }


    // GET FILE - 3

    let file_3_path = "returned-files/pso_ep10.png";
    let data_3;
    url = `http://localhost:3000/api/v02/file/${file_1_object.Uuid}`;

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        data_3 = response.data;
        // console.log(data_3.length)
        fileHandling.writeFileData(file_3_path, data_3);
        console.log(response.status, "GET", url);
    } catch (error) {
        console.error(error.status, "GET", url);
    }

    
    // await delay(4000);
    // DELETE FILE  - [BUT NOT OBJECT!]
    // let file_1_object = {};
    url = `http://localhost:3000/api/v02/file/${file_1_object.Uuid}`;
    try {
        const response = await axios.delete(url);
        // file_1_object = response.data;
        // console.log(response.data)
        console.log(response.status, "DELETE", url);
    } catch (error) {
        console.error(error.status, "DELETE", url);
    }



    // DELETE OBJECT IN DB
    // let file_1_object = {};
    url = `http://localhost:3000/api/v02/content/Content-DropFullOnUuid?Uuid=${file_1_object.Uuid}`;
    try {
        const response = await axios.delete(url);
        // file_1_object = response.data;
        // console.log(response.data)
        console.log(response.status, "DELETE", url);
    } catch (error) {
        console.error(error.status, "DELETE", url);
    }

}


run();

