
const htmlFolder = 'html/';



export function fetchHtml(filename : string) : Promise<string> {
    
        let url = browser.runtime.getURL(
            htmlFolder + filename
        );
         
        // this is th epromise that we return and letting the fetch function handle resolving the promise
        return fetch(url)
            .then(response => response.text())
            .then(text => text)
            .catch(error => "Error in fetcher.ts")
}


type Tfetcher = {
    fetchHtml : Promise<string>
}

export type {
    Tfetcher
};

// export {
//     fetchHtml : 
// }

