





# 2023-12-05

### TODO
### Database
 - create separate 'live' data, backup data, practice data, and data scripts/docs
 - live and backup data should be included in .gitignore, practice data should have a few example databases
 - add npm run scripts to load example databases into live. Alternatively, run app with different scripts and example dbs are loaded dynamically.

In short: clean up and add useful script to enable a good dev-experience

### HTTP backup
- tried to implement backup of data using a http command (/backup). Unfortunately I couldn't get '.backup' or '.dump' commands to work from the nodejs-connection

### Add 'fileEnding' to DB
- I need to dynamically download files by grabbing the file ending of each source file. I will keep this info in the db itself, as a column

### Semver freakout
- whenever I try to copy a backup from windows 11 file explorer, a few files prevent me.
- thien it will get stuck generating copies of semver in node_modules
 - the file generation will continue until I restart WSL 2. Until then, two of my 12700-cores will be running at MAXIMUM
- look at the two images in repo (semver + semver_CPU)

### Created a project management folder
- /project





<br>
<br>
<br>
<br>



# 2023-12-14
- Added 'shardReviewDate' to DB
- Created one source (#84) manually in sqlite
- minor adjustments in table data types
- Created some queries (/data/utils/sql-scripts )


### MAJOR REFACTORING
- Previously, js-modules had a very flay hierarcy. Modules/files were organized by function. (extractDOM, updateDom, etc.)
- Now, It is organized by app-part/comomponent. (e.g. sourcing/sourcefind, sourcing/sourceview, etc.)
- The function for a particular action is contained within the folder of a particular component. (events, update DOM, etc. are providied by component. Update/extract-commends are exposed to the rest of the app for cross-component manipulation) 
- I tried to improve fetch-structure. I'm still not sure how to implement it properly. But remember to just try making it fetch well. Nothing else!
- No Additional Features were added today, only refactoring. 
	- TODO:
		- complete review
		- finally add shards
		- add the improved file uploading
		- Finding a robust way of detecting and keeping track of file-types/endings
		- adding some keyboard shortcuts



<br>
<br>
<br>
<br>



### 2023-12-16
- refactored the whole sqlite-connection
	- replaced the all-in-one sqlite-file with a 'connection' file/object
	- the sqlite-functions representing specific db-queries were split into]
	- routes subscriptions/paths moved into new hierarchy for API
- TODO
	- Clean up the sqlite-files naming
	- Complete the CRUD functionality of the four primary tables
	- complete REST-access to CRUD functionality
	- API
		- /sourcefile --> /source/file
		- /sources --> /source/search
		- /# = / + /source/#



<br>
<br>
<br>
<br>


### 2023-12-17
- moved to sourceshard.com:3000 instead of localhost
- Moved all requests to '/api/...' from '/...'.
- Implemented /api/source/reviewdate
	- post, get, patch, delete
	- heavily reliant on url queries
- Insomnia is good, but not great for request chaining. Well I haven't found a way of doing it at least...
- implemented /api/source/search
	- query types: today, date interval, and all
	- all types take a 'searchstring' for SQL 'LIKE'
- Implemented /api/source/file
- Implemented /api/source
	- post, patch (whichc previously was put), get, and delete
	- DELETE I had some trouble with. At one poit the folder was delted, but an error interrupted the db-deletion, and I got stuck with an un-deletable source...
		- I manually added the fouilders back and then DELTE worked..
- 



<br>
<br>
<br>
<br>


### 2023-12-18

- rearrange frontend fetches to match backend routes/api structure
- added basic logging/toast to frontend
	- tried adding script and html elements using 'innerHTML'.
		- worked a lot better than expected!
		- still wary of starting to implementing it in any live code atm
- slowly migrating frontend functionality into respective cards, as per refactoring efforts!
- implemented all sourcereview fetch-functions for the api in client side
	- [post, patch, get, delete]SourceReviewDate
	- Fetches/api/source/reviewdate
- created a separete 'PropertiesCard_reviewdates' object using js and css
	- /home/andersubu/dev/sources/src/static/modules/sourcing/sourceview/propertiescard/PropertiesCard_reviewdates.[js, css]
	- this component grew VERY rapidly when added. It has a lot of complexity. 
		- No wonder I havent been able to implement it before. I needed the comprehensive refactoring first!!
	- didn't add a 'delete' button. I probably should...

- backend: 
	- sorted selected sourceReviewDates by 'date ASC' to more easily display dates in the frontend
	- moved DELETE:/api/source/:id to more sane queries after conflicts with DELETE:/api/source/reviewdate


### 2023-12-19

DONE
- recolored date input
- sourceview-viewcard
	- enabled drag and drop (extremly buggy! Avoid!)
	- enabled paste using focus + (ctrl+v) [not connected to load/upload yet..]
	- moved upload/load buttons from the property card
	- made sure file adding and removing was more consistnetly done by directly removing based on elment id
- Search card
	- redid the whole UI
	- connected search cabability to backend sucesfully
		- ORDER BY - new sane order
		- NULL titles messed with searches constantly. NOW ADDS EMPTY STRING TO NEW SOURCES
		- extract from searchcard and pass to api-fetch as a parameter-object

TODO
- Define they acceptable files and then make sure my input can handle those well!
	- image - jpeg, png, webp, svg, gif
	- text - plain text, code + appropriate file ending
	- pdf
	- video - mp4
	- audio - mp3, wav, 
- Put sourcing under the URL 'sourceshard.com/s/#'
	- https://stackoverflow.com/questions/46722092/expressjs-passing-parameters-to-html-doesnt-work/46722250#46722250
		- pug (npm module?)
			- https://expressjs.com/en/guide/using-template-engines.html
		- :: or just injecting myself using app.get('/static', injectFunction).
			- https://medium.com/deno-the-complete-reference/the-hidden-cost-of-using-framework-express-vs-native-http-servers-ed761a5cfc4c
	- WAIT! I'll just dynamically load the source using the client based on the URL!!!!!!
		- https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript
			- window.location.href
			- document.URL
			- window.location.pathname
		- just tried and express.static will not accept a path name it cant find...
			- BUT i added a defult id to be loaded using client storage
				- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage


### 2023-12-20
- Made adding source files barable
	- Enabled pasting new source file by focusing on viewcard and pressing CTRL+V
	- Disable ability to add new file if file already exists
		- Sure, I the future I might add DELETE/PUT....
	- File type detection
		- fileviewer_utils.js
			- grabs the file ending/extension
			- matches extension against arrays contining extension for different file types
			- file types are:
				- image
				- audio
				- video
				- pdf
				- data
				- text (txt + code)
		- Still not completely done with displaying...
- Fully acceptable search functionality!
	- Automatically fetch for new sources on :
		- toggling ANY of the checkboxes
		- on content-change when searchbar is in focus
	- Change order between ASC/DESC
- localStorage
	- All four checkboxes
	- id of the last loaded source
		- If the last loaded source is not found on reload, 410 error code is returned.
			- Honestly it might be a 404 if i accidentily enter a future source id and it is silently cached!!
			- but it is nice hving the 410 for the purpose of 'LAST LOADED SUORCE NOT FOUND!!'


- TODO:
	- display file types:
		- audio
		- pdf
		- data
	- source files
		- PUT
		- DELETE
		- MAYBE NOT????
	- review dates:
		- PUT
		- DELETE
		- MAYBE NOT??
	- SHARDS!
	- SHARDS!
	- SHARDS!

- late in evning:
	- sourcefile
		- enabled audio
			- slightly buggy when forcing player to end of audio. Gets stuck with warnings/errors
		- enabled embed/pdf
			- firefox: 
				- it is utilizing PDF.js ?
				- unsolicited logs
				- warnings about http..
			- other browsers:
				- not yet tried...
	- added a quick and dirty way of horizontally rezsizing the panels
		- the vertical seperators were given their own js-files
		- some eventlisteners with focus and clicks did the trick
		- not a good user experience. The two sperators are NOT MOVING INDEPENDENTLY
	- added the sharding panel
		- only the panel and a add/delete button at the top
- TODO
	- Shard DB
	- Shard API
	- Shard Fetch
	- Shardlist
		- shardcard


### 2023-12-21

- Shard SQLite queries
	- insertShard
	- selectShard
    - selectShardsOnSourceid
    - updateShard
    - updateShardFileInfo
    - deleteShard
    - deleteShardsOnSourceid
- deployed shard api
	- changed file paths from the planned /api/shard/... to /api/source/{sourceid}/shard/..
		- it makes more intuitive sense, and its FANTASTIC to always have access to sourceid at endpoints!
	- /api/source{sourceid}/shard/{shardid}
		- POST, GET, PATCH, DELETE
	- /api/source{sourceid}/shard/{shardid}/file
		- POST, GET, PUT

- Completed a functioning shardlist with almost full CRUD
	- NOTE: This was definitely a push today and there are many places where I did the quick and dirty thing to get it to work.
		- No real care to structure
		- I tried to copy too much code directly from the other panels. I should have done more structuring from scratch, and added snippets!!
		- No clear naming and component responsibility
		- I took many small, quick decisions. I will not remember most of this stuff in a week!!
	- Basically I added the shardcards
		- Ctrl+v - paste file from clipboard to shardcard with focus
			- Then the WHOLE SOURCE is realoaded
		- alt+shift+del - deletes the shardcard currently in focus
		- top button (Add) will post a new, empty shard and then reload the whole SOURCE
		- SOURCE RELOADS IS CURRENTLY THE ONLY REAL WAY OF RELOADING THE SHARDS!
			- some sort of cashing is definietly needed
			- Many this is not always a bad thing, as long as large files are not always transfered for each reload!
			-
	- Some techincal debt has been aquired today.
		- But if I can use the app for some time,, then I should be able to clean it up some!
- TODO:
	- Deploy app for some inital data collecting!
	- Enable the merging of two databases!
		- files are easy to copy
		- SQLite is trickier. Maybe I can simply use the .dump command! Then I read the dump from the other db!
		- I need to make sure that there is continuity in entry ids..
		- FOR NOW I ONLY MAKE *ONE* PRIMARY APP DATABASE. 
			- ALSO START BUILDING TEST DATA!!


### 2023-12-22 

- Extremely unproductive day given the amount of time I spent 'working'
	- Essentially spen the hwole day on getting the shards to be reasonable to work with.
	- Its not good yet, but I can actually use it now
- Highlights:
	- Moved all shards with filetype=text to a new column in the shards-table (textContent)
		- not a well thought out plan and naming is whack all over the code bas
			- at least it works for now
		- The posting of shard files is still always done at the same path. As is 'GET'
			- PATCH is moved to a separate API ednpoint for all shards consisting of text..
		- The whole thing is a mess, but I can edit!
	- A couple of hours was also spent starting the app with a clean /data/live
		- Many pesky bugs too a while to figure out
			- Docker at times did not register thate files were removed/added, leading to contradictory log messages
			- had problems with the most recently loaded source, expecially in combination the docker idssue described above
			- 
	- played around with downscaling videos using ffmpeg. It worked well!
		- Proably 240p (maybe 360p) for movies
		- 360p for shorter videos
		- example files, resolution table, and commands is located at "/home/andersubu/720to360" 
			- ffmpeg -i movieAt720p.mp4 -vf "scale=256:144" -c:a copy movieAt240p.mp4
		- my 12700 is still trying to recover from that load...!

	- Snipping tool CAN RECORD VIDEO SNIPPETS DIRECTLY TO CLIPBOARD
		- Great for extracting image and video
		- no simple key combination for it....
			- I guess I could create a shortcut and then creating a key combination for that
	- still no good audio cpturing to clipboard..
		- windows built in audio recorder is only generating files..
	- I should create a table with all media extraction techinques/manipulations
		- audio from computer, image to text, audio to text, video to audio, etc.etc.
		- I need to be very comfortable converting between iles
		- I need an established workflow for all of them! This is CRITIICAL for 'sources'
			- without the streamlined movement and handling of files one can never expect to being able to maximize the actual learning. 
	- hiding the lables for the shards.
		- they vere just taking up valuable real estate for the shards, which are at the core of the actual learning process.
	- I GUESS THE EXPRESS JSON PARSER RULES AT THE ENDPOINT AND IGNORES THE WHOLE BODY OF ANY REQUEST THAT DOES NOT CARRY THE APPLICATION/JSON HEDER FOR CONTENT TYPE....
	- Much of the problems I had today comes from not planning properly, but instead is focused on just getting it to work as quickly as possible.
	- ACCIDENTELLY ADDED 100MB file to repo and commited. GITHUB PROMPTLY BLOCKED THE SYNC.
		- SINCE EVEN IF I REMOVE THE FILE THE OLD COMMIT IS STILL THERE
		- https://stackoverflow.com/questions/20002557/how-to-remove-a-too-large-file-in-a-commit-when-my-branch-is-ahead-of-master-by
			- TWO 'git reset HEAD^'
			- commit a much shrunken version
			- 

- TODO: 
	- Sizing of the shards in the shardlist is an absolute mess.
		- too many nested divs with different max, min, and widths.
		- many different file types are displayed
	- 


### 2024-01-10

CHANGES SINCE LAST LOG ENTRY:
- a lot of practice with the app 
- small adjustments
- split the UI into a mainMenu and mainContent
	- mainMenu lists all pages available (only sourcing and home-dashboard atm)
	- History API enables SPA behavior
	- because routing is preserved using History API, user can copy links to specific pages
	- Routing for the different pages all return the same html, but different parst of the app is fetched and redered based on URL
- added my first small widget on homedash: frequency detector
	- three versions:
		- first I used DFT to extract frequency using MediaRecorder (navigatior/audioSetup + fft.js)
		- I then replaced the DFT with a zero-=crossing algorithm because DFT resulted in a huge compute-outcome ratio. Still MediaRecorder was VERY cumbersome to work with.
		- Finally I moved away from MediaRecorder but kept the zero-crossing (thank you ChatGPT!), And I ended up with a fairly good widget to detect a single frequency!
			- https://chat.openai.com/c/f569861d-6ccf-49a8-a733-5462b0024cbf

TODO:
- sources need to act as shards!
- I need more control over source/shard creation!
	- shortcuts!
		- source
			- author(s)
		- shard
		- base object
			- person
			- place
			- object
			- word
		- 



### 2024-01-15

- after a lot of thinking, I have decided to move all sources/shards into one object
	- I realized that they are very similar, and relate similar to nodes/vertices in a graph
	- Also there will be many more similar objects in the futures (comment, fundamental object, etc.)
- The new structure is that of a mathematical graph
	- nodes
	- edges
	- review dates
- Also dicided on a solution UUID
	- ill use 48-bit integers
		- not to slow for DB to search
		- enough values to last me a lifetime
	- 46-14 : unix time - epoch (1_700_000_000)
	- 13-10 : random bits
	- 9-4   : object specific index for each second
	- 3-1   : object specific id
- App name:
	- hprag (graph backwards)
		- I now realized that is not correct..
			- hparg nor pharg is available as .com ...

TODO:
- Complete the API tomorrow
- Complete the front-end fetches


### 2024-01-16

- completed backend API
	- moved queries (id=123456) to parameters (/123456)
		- This simplfies a ot of things!
	- Added the getting of all parent or child-nodes on /api/nodes/372?parents=0&children=1
- Big worry over night was the handling of 'shards'.
	- what is a shard? a connect? an extracted piece?
		- It is a piece of a source.
		- it is a type of source-child!
	- When i create a shard (i.e. the body contains nodeType=shard on POST), I simply also pass the parent node and create an directed edge to the child. I Should always do this when sourcing!
- Completed frontend fetches
	- Goal was to create the fetch-files to essentially match the backend api
	- Just like with backend it is not properly tested
	- Started building my own simple api tester 
		- only for text-files for the /api/file route atm....
- Migrating Front-end to new nodes/edges/reviewdates and new API
	- utility files/modules
		- Added an IsoDate-file in utils (primary for extracting todays day in iso format : YYYY-MM-DD)
		- a 'models' module for generating new 'empty' objects
	- Searchcard
		- ONE BIG PROBELEM: forgetting the 'content/type':'application/json' is a nightmare!
		- Straightforward
	- Searchlist
		- Straighforward
	- Propertiescard
		- Most work here. 
		- Had to create new fields for the new node-db-files
		- many places were referencing old property names
		- still proably uncaught references I will have to deal with in the future
		- reviewDates: had to implement reviewateId lookups
	- Sourceviewcard
		- Also a bit of work. Making sure file names, extensions, node-properties, etc. are all matching.
	- Most common problems:
		- objects are sometimes on their own. Sometimes alone in an array. THERE IS NO ORDER!
		- many lingering small naming dicrepencies
			- reviewDates: complete/completed
			- FileType/ElementType
			- extension/ending
- (forgot to remove file on source deletion. Added in the next section - sharding)

TODO:
	- SHARDING!


### 2024-01-18

- 2024-01-17
	- solved the problem of textContent vs. files for shards!
		- files are always prioritized if present
		- if not file is associated with the node, textContent is loaded
		- if neither is present, we display a small, empty shard (similar to a notion text block)
	- implemented a textContent editor for shards
		- The default text editors were to bulky and lacked configurability
		- I decided on using a div with contentEditable set to true/false
		- Two modes:
			- focus	: the shard-div is the active element, but you cant input text
			- edit: the regular navigati is turned of and all inputs go to the div-content!
		- HAD A RIGHT FEW HOURS TRYING TO FIGURE OUT TEXT ENCODINGS AND DEALIGN WITH HTML PECULIARITIES
			- browsers love ignoring white space
			- they love <br> instead of new line (\n)
			- etc. etc. (cant remember)
	- the result turned out to be bareble, but not great...

- 2024-01-18
	- I thought the the textContent editing was pretty much done yesterday. 
		- Oh boy were there a ton of stuff left!
		- There were so many small things that I fixed, including imroving the two modes..
			- using colors to inidcate the two modes
			- new 'p' s generated did not have to parropriate id (started using data-node-id instead)
			- if i start writing in a new shard, an empty 'p' is not generated! thus nothing is saved!
				- if I dynamically input a new 'p' it will recieve the caret/focus!
					- I had to use selections and ranges to dynamically move the cursor/caret!!
			- if i use backspace on an empty, last 'p' I will delete it and the edit mode is broken!
				- so I had to block backspace if there was no text left	
					- but if there were multiple lines left (empty p's), I still want to be able to delete those lines!
						- so I had to only block backspace with empty textContent and one p-node
			- I want to enter the edit-mode using both a key (enter) or mouse click
				- I just couldn't get a mousclick during focus to moove user into edit mode
					- because the click triggered element focus before click
				- I settled on having to double click to enter edit mode
			- text editing ignores any 'p's that does not include <br>'s
				- So I need to actively insert those in empty lines
				- But I dont need to actively extract them because they are treated as new line??
		- A strong seperation of the two modes is critical for the previous changes to be made!!
	- started implmeenting more shortcuts in focum mode
		- 'i' : get shardcard id
		- 'o' : print shardcard object
		- THESE WERE SOOOOOO HELPFUL!!!!
	- made sure sources and shards can handle files properly!
	- shardlist: inner and outer container
	- shardlist/shardcard mini menu
		- made a hovering mini menu that moves with the shard curriently in focus
		- can't interact using the mouse because that removes shardcard focus..
		- but It is intentded to be a visual guide when using the keuboard shortcuts!
			- e.g. shard info, new shard/source/data/etc., edit certain shard properties, etc. etc.
	- shardbar was improved to enable certain key actions without keyboard shortcuts
TODO:
	- make shardbar usable beyond adding shards
	- make properties card collapsable?
		- I really want most component to be collapsable and posses good max size constraints
			- This will enable modularity and usablility! especially on mobile devices!
		- A first step in usability is making sure that the current 3-panel model is good!
			- I need to create a separate module that will hold the the sourcing panels!
			- 

- Tried adding a module for my three sourcing panels
	- It actually turned out pretty good!
		- obviously there is some nueiance..
	- Problems:
		- tried using CSS variables to lock parent containers in place
			- turned out I got the syntax wrong and I almost gave up
		- js-css mix is sometimes complex and annoying..
		- getting the max-values right is not easy
		- forgot the vertisep-widths for a long time, creating some minor visual gliches
		- vertisep is not following the cursor well enough
			- Instead of changing the size of the panels I should move the vertisep, and adjust the panels accordingly
			- THIS WORKED OUT WELL!
			- still slight issues:
				- shrinking panels to zero results in small gaps
	- SOLUTION
		- in the end I included all width constrains in the js-file
		- then before applying anny width changes from dragging the panel seperators I simply checked if the new changes conform to the constraints
			- If the constraints were not met, I simply dont do the update...
	- tried animating the panels
		- Did not go well
		- Coding the method I had in mind went better than expected
			- But the outcome of that method was very poor..
		- The big problem was that the width-movement on each frame was never a clean fraction of the total animated distance. 
			- As a rsult, the end location of a 'linear' animation was never where I wanted. So I either got the wor poistion or a big final jump in position...
TOTO
	- When the middle panel has reached its minimum width it should squeze the next panel ! !

- Moved the Actual sourcing 'app' into the threepanels-UI
	- it honestly worked perfectly!
	- Only adjusting some obsolete max/min/width-values.
	- still my inability to shrink multiple panels accordion-style is the only reaminigng obvious issue
		- THere is still the visual selection-glitch when resizing!
	- I am still hesitant to remove the old code for now.
		- I'll keep it around until next restructuring..
	- I ALSO REALIZED THAT I HAVENT RENAMED THE TERRIBLE THREEPANELS FUNCTION NAMES LOL !
- I just realized how easy it would be to push new shards tp shardlist without reload. SO I added that.
	- Also enabled shard deletion without promp if its empty!
TODO:
	- figure out how to make the edge-object forchildren/shards available in the frontend
		- This is (for now) primarily for ordering the shards in the shardlist
		- Intuitively there seems to be two options:
			- always including that information when fetching a shard, or
			- doing separate fetches to get the edge matching a source-child pair.
		- Regardless of how I do it I cannot immediately simply add it.
			- also, I cannot implement child-order in my shardlist until I've solved that problem!



### 2024-01-29

- STARTING UPGRADE TO v0.2!
	- Updated and more robust database
	- Add projects, event, etc.
	- logging lib
	- testing lib
	- web extension!
	- enable usage on smaller screens

- As is usually the case, a few weeks pass from the point of realizing that I need to upgrade to software, to finilize the visiom of how that should happen
	- A big part has simply been to figure out how to structure the database!
	- I;ve considered different realitionshiups and table stuructures, and everytime you come up with a new idea, You have to live with it at least a few days until you can clearly see the implications of that change, and wether or not it will scale.
	- A BIG realization was that I need to organize my sources and shards in logical units. Not taks, not difinitions, but for now it will be projects!
	- Also I've thought a lot about categorizzation of information. These things will come later!

- Done Today 
	- Create base table classes
	- Create table sub types tables for several tables
		- Make sure foreign keys point to primary key!
		- No traling commas on create table!
	- Statring to export old data to new structure
		- Files and sources pretty easy + done!
			- NO ! Files ahave their own id!!!
		- Shards are complicatied because they can pratiacelly be any of the new types
			- files, text, code, etc.
		- Also, shard information will becaome part of the edge!
			- a directed edge from parent (source), but also edge type will be shard



### 2024-01-30

- Created bash script where I rename all old source and shard files
	- xxx_so -> 50xxx
	- xxx_sh -> 56xxx
- Old sources
	- TWO PARTS
		- Moved source-node into new 'Source' table. 
		- Created a new File-node-sibling and linked using edge for old source that had a built in file
	- First step was not too bad
	Second was a a bit more invloved in both theory and implmentation
- Old Shards
	- Checks:
		- is file?
		- is Code?
		- is source?
		- else is text
	- One SQL script for each check
	- At least one shard was incorectly categorized (use of curly braces, reddit package-handling discussion)
		- Probably my exists.
- Reviews
	- Turned the old review dates into review objects with associated node
	- Had to add edges to link the review dates to their associated object to be reviewed


### 2024-02-05

- Built the base queries for the new database
	- still a few left
		- 
- Started buildning the comopsite 'procedures'
- small unit testing
- models and enums
- errors:
	- restarting within one second on tests will trigger unique Uuid constraint 
		- The server obviously does not remember the previous sessions second-secific index...
	- Recursive require-statements will cause some errors...



