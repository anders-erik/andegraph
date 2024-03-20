
# Changelog


## v0.2.1

- removed old type tables from db-module as they were preventing the creation of new databases.
- reenabled empty file-rows. (accidentally disabled during removal of old tables)

- disabled content card overlays on contentCardMenu (contextmenu) as the overlay is for review, not viewing.
- made content card overlay non-transparent to get the expected flashcard-functionality. 
- content card colors: more consitent and :root color variable, visually improved with rounded corners etc., resolved some margin-padding issues on the editable cards.

- changelog and todo md files added.

- large webextension update
	- v0.2.0 did not work on many websites. So far things look very good with new html injection method (append(...) over the previous .innerHtml += ...)
	- now one can add ANY Type to pasted Code AND Text. As the constraints for Text and Code type was removed in the database, we are free to choose type freely. 
		- NOTES: types may return in the future, but as for now I want the freedom. Also, file-types are still very much restricted to the old value (video, image, etc.), and are determined automatically.
	- A lot of unused code in the extension has been removed, and all unnecessary communication has been eliminated, resulting in a smaller size and enabling easier future changes.

- main content toolbar got two updates: firstly, it is now fixed to the right viewport border, enabling ok behavior down to viewport widths of ~1400px. In addition it got a dark themed makeover, making it slightly easier on the eye. 

- fixed broken toast notification when new edges are created. Also added a couple of QOL improvements, such as only create toast element on first log-import and text centering. 


## v0.2.2

2024-03-19
- Toolbar:
	- added a 'complete' button for simple review-completion
	- removed file-panel button
	- grouped the right panel buttons (previously four of them) into one connection-button/panel.
	- toggling the shardcard overlay checkbox will immediately apply to cards loaded into DOM. 
- Shortcuts
	- t + '=' : toggle the right panel
	- focus: y, h, u, j (the four main toolbar elements)
- titleMenu: will always update the content object, not just when pressing 'escape'
- Review:
	- remove review object from 'reviews due menu' when clicking 'complete' in toolbar
	- enabled the addition of undirected review objects ('v' + r). Default review-date is the next day.
- Left panel visual upgrade