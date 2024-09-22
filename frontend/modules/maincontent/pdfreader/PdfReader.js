
import { dbis } from "../../dbi-send/dbi-send.js";



async function loadPdfReader(uuid){
    console.log("LOADING PDF READER");

    let pdfContainer = document.createElement("div");
    pdfContainer.id = "pdf-container";

    let pdfFile = await dbis.Get_File(uuid);
    // console.log("pdfFile.name = ", pdfFile.name)
    const pdfURL = URL.createObjectURL(pdfFile);
    // console.log("pdfURL = " + pdfURL)

    let innerHtml = `
        <iframe src="${pdfURL}" width="90%" height="90%">
            Your browser does not support iframes.
        </iframe>
    `;

    pdfContainer.innerHTML = innerHtml;


    let _mainContent = document.getElementById("mainContentContainer");
    console.log("_mainContent.id = ", _mainContent.id)


    _mainContent.append(pdfContainer);
}


export {
    loadPdfReader
}