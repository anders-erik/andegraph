
# Todo

## v0.4.0
### GOALS:
- data overview dashboard
- reviewable on ipad
	- https using proxy nginx
- solution to lack of project types
- all tables/types have functional app pages
- download source / content
- automated tests for all four project parts (front, back, data, ext)
- shortcuts
	- nicely show all shotcuts 
	- make the common ones accessible!
- automated 
	- api with one command (mars)
	- deployment
	- database example
- webextension 
	- needs to dynamically find current sources and their project from currently visited url
	- esc/enter when finished writing a contenteditable
	- Be able to delete sources/projects
	- make sure shortcuts are language-agnostic
	- automatically add source-type on new sources
		- e.g. youtube, pdf, svt, reddit, etc.
	- I need to be able to capture audio and video to clipboard on supported platforms!
	- need to be able to write text to back of card!
- Bulk move sources to other project!
- Provide the user with shortcuts from media capture on all platforms
	- Starting with only Ubuntu 22.04
	- capture dircetly to clipboard!
	- Media types:
		- Screenshot
		- screen video
		- audio : select from available audio sources


<br>
<br>

## v0.3.2
### GOALS
- LARGE UI refactoring
	- THIS IS NECESSARY TO MAKE THE IMPLEMENTATIO OF ANY REAL NEW FEATURES FEASIBLE.
- |o| resolve multiple webextension problems
- Code 'output'-column in the SQLite code table!
- Be able to see project files!
	- /file/-page!
		- history
		- add/remove file-contents
		- use camera
	- add file-object from context menu
- add breadcrumb of current uuid's ancestors
- database table containing simple snapshots of db prameters (tables, table rows, etc.)
- decide on three test sources!
	- USE SOMETHING I WANT TO LEARN!
	- will be used for testing webextension and review
		- good way of getting comfortable with extension and changes
	- maybe also for test-data for database/api testing!
		- good automatically test api
			- I should have a few persistent pre-made db/files in the source code for this purpose
	- should include multiple types of shard types (text, code, image, video, audio, etc.)
- add new meta-table in db
	- each column is name of the other tables in the db (Project, Code, etc.)
		- each row is number of rows in the respective table
		- auto generate a new mata-row every day
- Identify two improvements to the review page, and implement
	- What those are can only be decided after a few days of testing
	1. need active toggle to display card content!
	2. new context menu that can be toggled to show undirected shards/objects for review item - comments, thoughts, etc. 
- save source as one unit, ideally as flashcards?
	- pdf?
	- html?
	- markdown?
	- open office format?
	- anki?
- add drawing functionality
- project types (1, 2, 3, 4, etc.)
- add symlink directory structure
	- projects are directories
		- 1 are top level, type 2 is contained within a level 1, etc. 
	- sources are directories in a project

### features
- see current backend version from client
- write persistent error logs in the frontend
- add frontend module bundler - cleaner network tab and faster load, especially during deployment!
z

### Bugs
- stop error message on page load with no set project/states



### 2024-10-17
- Webextension:
	- Bugs resolved:
		- Overlay layout problems in CSS [search box height, table borders, box-sizing]
		- premature first search
	- features
		- type directly to text clipboard
		- Leave content-editable on Enter/Escape

### 2024-10-05
- add better-sqlite3 and begin refactor of dbi
### 2024-10-04
- |o| get apache reverse proxy working
	- |o| replace the nginx
	- |o| generate SSL certificate
- add better-sqlite3 and refactor database tests



<br><br><br>

## v0.3.1 - DEPLOYED ON 2024-10-03
### GOALS
- |o| webextension	
	- |o| refactored using webpack and ts
	- |o| is targeting the correct server...
- |o| important keyboard shortcut panel
- database scripts
	- |o| extract 3 good parameters giving a sense of integrity/size/structure
	- add one new column in one content table for practice

### Week 40 (ISO)
- v0.3.1
- |o| webextension refactoring
	- |o| get a functiong viable webextension
		- |o| refactored, but same functionality
		- |o| the api location can be changed and persists
- database scripts
- a working review-page

#### 2024-10-03
- persist changes of api-url
- 

### Week 39 (ISO)
- Webextension refactoring
	- Project Container
		- Implement the more options menu items
		- niceties
			- prevent select of certain element text
			- move automatically to search box
			- table styling
			- project container height
				- collapse when selecting a source?
				- toggle?
	- Source Container
	- Clipboard Container

### 2024-09-25/26 (ISO week 39)
- webextension refactoring
	- my own data types for typescript!
	- project menu
		- new project
		- reload
		- sort
		- favorites
- decide on two test sources!
	- will be used for testing webextension and review
	- maybe also for test-data for database/api testing!
- database scripts
	- extract 3 good parameters giving a sense of integrity/size/structure
	- add one new column in one content table for practice


### 2024-09-24
- |o| Clickable basic Keyboard shortcut popup
	- |o| Most shortcuts included
- REFACTOR WEBEXTENSION!
	- |o| try out some bundler or expand build system!
		- |o| Set up webpack AND typescript (after a couple of return+intellisense hiccups)!
- refactor app
	- separate the global event listener
- decide on two test sources!
	- will be used for testing webextension and review
	- maybe also for test-data for database/api testing!
- database scripts
	- extract 3 good parameters giving a sense of integrity/size/structure
	- add one new column in one content table for practice



<br>



## v0.3.0

### 2024-09-23

REVELATION: BROWSERS MAKE SURE ALL MODULES RESOLIVING TO THE SAME URL WILL BE A SINGLETON! IMPORTMAPS HELP!

- |o| URL
	- |o| detect and reload on url change
- refactor app (can't right now because app is too tightly integrated into class+element hierarchy)
	- globalEventListerner module
- Review
	- |o| reach same functionality as with old class structure
- rounting/object access
	- Make sure I can route /content.Table/uuid
		- for files I route /content.Table/content.type/uuid ?
	- implmemnt g+g shortcut : go to default for specific object table/type
- Enable nginx server
	- proxy api calls
	- HTTPS
- |o| Webextension
	- |o| enable title editing
		- |o| automatically move focus to title edit when creating shard
	- |o| collapsable sections
	- |o| made the title-labels the same size on different websites (the padding was not always applied!)
	- |o| small QOL
- deploy v0.3.0
	- I need to get comfortable with deployment
	- also start to actually start using the app
- START USING
	- I NEED TO START USING FOR FEEDBACK ON NEXT STEPS TO TAKE !
	- maybe also do some cleaning up of the 'real data'
- Keyboard shortcuts
	- I need to be able to easily find the current shortcuts!


### 2024-09-22
- |o| enable reading pdf's in frontend
	- |o| /pdf/<uuid> path ?
	- |x| test iframe
	- |x| otherwise include pdf.js in project
- Webextension
	- enable title editing
		- automatically move focus to title edit when creating shard
	- collapsable sections
- Dynamically loading page on url change
- review-path for loading a review from the url
	- |o| make sure review loads on url
	- |o| implement as a non-class version
	- if uuid does not correspond to a review, go where?
		- try parent object
		- else a connected object
		- else home


### 2024-09-21
- webextension
	- foldable webextension sections (projects/source/clipboard/etc.)
- frontend:
	- If i build js/css modules into on big 'andegraph'-module, then I can simply include that in the index.html and always get full access??
		- I need to export all js-code properly I think
			- MAYBE A BUNDLER LIKE WEBPACK??
	- Context menu when clicking on content/edge-object
		- |o| im yet to streamline a way of systematically detect content object interaction ! !
		- SHOULD PUT ALL CURRENT MENUS INTO ONE ACCORDION MENU (+ new)
		- open, open in new tab, copy properties, etc.
		- I need a system to detect first ancestor that has a contentObject attached to itself
			- make sure that all contenobject elements are listening to click events add then first content=element that detects and 'empty' event writes it's contentobject?
				- Does the event object persist for that to work?
	- pdf reader that allows webextension
		- iframe?
		- render to canvas using pdf.js
	- CALLBACK TRACE FOR 4XX api calls!



### 2024-09-18/19/20
- |o| seperate backend code
- |o| stabilize api (prevent craches!)
- |o| api tests (bruno)
- webextension
	- |o| separate from other source code
	- tests?
	- self sign
- new endpoints
	- status
	- stats
- api contentedge:
	- i return 200 when the uuid doesn't exist
- new api tester
	- mars - electron
- frontend:
	- Context menu when clicking on content/edge-object
		- I need a system to 
	- pdf reader that allows webextension
		- iframe?
		- render to canvas using pdf.js




### 2024-09-17
- |o| set up static file delivery using ngnx in docker
- |o| new static html: /project-review
	- load simple project info
	- all children (sources, etc.)
	- click for context menu


## v0.2.3

- Source categorization

## general
- when loading new url-uuid, then update all dom content object elements with same uuid
- when pasting text to editable content cards, that content is not sent to db unless user enter and exit contentEditable mode!
- update project automatically when new child is added


database:
- enable events? - or should that be stared in a more structured, pesistent pformat?
	- It should be in a different location, but parts of events should be imported here as a 'source'
- enable 'people'
	- thus events should probably ust be a type of source!
		- most things should just be a type of source.
- A 'memorize' table with a list of sources/shards to be memorized by heart

main app
- Doom scroll review Type! 
	- Regular
	- Memorize
	- Scroll
- enable a scroll-functionality and quick create and complete a review of type 'scroll'

- 

- turn off forced review-children-list on go-review
- provide a veriety of review schedules
- Clicking on 'complete' during review does not remove the review from review menu
- Shortcut for completing current review, and then immediately loading the next review

webext.
- search children
- load first source matching current Url (find already existing source, and handle accidental page exit)
- prevent default letter input (especially probelematic on youtube)
- Enable Title-editing of source children
- enable connecting to more than one project


<br>
<br>

# Done

### v0.2.1
- webextension is breaking many app-websites
	- it seems to get stuck in a reload content-script loop
	- Renders it impossible to active in the same session as this app itself, youtube, chatgpt, etc.
- main toolbar moves on smaller screens ( < 1920 width )
- toast is broken (new edge) 
