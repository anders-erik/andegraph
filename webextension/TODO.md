

# v0.3.3

### Features:
- enable space/enter selection of search entry
- clipboard server
- display shortcuts
- basic persisting capabilities of projects/sources
	- NOTE: VERY IMPORTANT TO DISABLE PASTING WHEN WEBEXTENSION IS HIDDEN BEFORE IMPLEMENTING THIS FEATURE!
	- auto-search based on url
	- pin-menu for currently much used projects
	- set default loaded project that always loads
- be able to toggle paste detection on and off when extension is showing


### Bugs:
- tabbing from the search box to the first search entry requires user to hit tab twice
- clipboard-title on mozilla is enlarged.
- when closing the project container on mozilla, it cuts into the porject title
- shardlist is not being displayed if the properties-table is open when pasting a new shard 
- Stop pasting shard if wextension is hidden!
- hitting space when typing during clipboard capture is scrolling page on Mozilla page
- very slow source creation using webextension
- when a new source is created, and then immediately changing its name, doe not actually change the source name. I have to reload and change it again.


<br>
<br>

# v0.3.2

### Features:
- Typing to text clipboard when capturing added
- More keyboard layouts are supported when using shortcuts
- Enter/Escape leaves a content-editable field and tries to focus on it's parent


### Bugs:
- |o| when chainging the project title, the extension-wide update function will change non-title fields!
    - |o| also the updates are not truly extension-wide
    - |o| also updates titles when exiting contentedtiable other than title
- when entering an EMPTY content editable field, the cursor is moved to the top-right. I probably need to insert `<div><br></div>`
- |o| when creating a new source I am not generating a schedule....
- |o| search input is loosing padding on some webistes [youtube, developer.mozilla.org, svt, ]
    - |o| the height of element had been set to 1.5rem. Setting a fixed 21px 
- |o| Table borders and extension-dimension change on developer.mozilla.org
    - |o| Dimensions: They where given a box-sizingpropertry by the website. Solution: force all age_elements "box-sizing: content-box;"
    - |o| borders: made sure that the border on my table-class and their descendants defaults to no border.
- completely breaks on example.org
    - example.org has a non-full-screen document+body!
- |o| prevent default/propagation when searching
    - |o| e.g. youtube is being muted when pressing 'm', paused (and not entering the extension!!) with space, etc.
- |o| using Swedish keyboard breaks many shortcuts
    - |o| make shortcuts using keycodes, not chars!
- |o| Pasting text to contenteditable creates a new source-child! Yikes !!
- search-text overflow
- |o| sometimes the initial search is done before api-url loading
