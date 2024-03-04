# Andegraph Web Extension


## Purpose

Extracting shards from sources in firefox.

## Dev

### web-ext

$ web-ext run --firefox="C:\Program Files\Firefox Nightly\firefox.exe" --source-dir ./src/

Watches the source directory and will reload the extension on updates.


### node build

nodejs file at the root of webextension directory will watch and output from dev-directory to src-folder.

On write to src/dist the web=ext watcher will reload the extension.



