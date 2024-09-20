

# Todo

## v0.3.0

### 2024-09-21/22
- webextension
	- foldable webextension sections (projects/source/clipboard/etc.)
	

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
