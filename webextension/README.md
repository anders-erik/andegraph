# Andegraph Web Extension


## Purpose

Extracting shards from sources in firefox.

## Dev

### Latest npm scripts: 2024-09-24
`ext-attach` <br>
`ext-build-wp-tsc-watch` <br>
custom build: <br>
`ext-build-custom-watch` <br>


<br>

### web-ext

$ web-ext run --firefox="/home/anders/software/firefox-dev/firefox" --source-dir ./webextension/src/

Watches the source directory and will reload the extension on updates.


### node build

nodejs file at the root of webextension directory will watch and output from dev-directory to src-folder.

On write to src/dist the web=ext watcher will reload the extension.



