





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
- I tries to improve fetch-structure. I'm still not sure how to implement it the best. But remember to just try making it fetch well. Nothing else!
- No Additional Features were added today, only refzctoring. 
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


