

# Deployment list after final commit:

### Data
- copy currently deployed data folder into backup
- copy currently deployed data folder into new deployment location
- perform data integrity tests
    - files
    - database

### Frontend
- update api location in `frontend/modules/dbi-send/dbi-send.js`

### Backend
- change compose.yaml port: from ` - 0.0.0.0:3000:3000` to apporopriate, e.g. ` - 0.0.0.0:1234:3000` if express api stays at 3000.
- change db location/name in `./backend/db/Db-v0.2.js` and in `./backend/server.js`.
- change file location: `./data/live/files-v0.3.0/` and edit `./backend/dbi-receive/File.js`

### Webextension
- change `let apiUrl = 'http://localhost:3000/api/v02';` in `webextension/src/overlay-dist/dist.js` to deployed location
- zip the contents of `webextension/src/`-folder (make sure then contents are zipped, not the `src`-folder itself)
- submit the extension to [https://addons.mozilla.org/en-US/developers/]
- when downloading the approved extension as `.xpi`, make sure to add the `type:attachment/` in the url to download the actual file, not install it. EXAMPLE: `https://addons.mozilla.org/firefox/downloads/file/4356387/type:attachment/8abffcc4bf454eff9615-0.3.0.xpi`
- save the extension to ``