
import * as shardbar from './shardbar/shardbar.js';
import * as shardlist from './shardlist/shardlist.js';

function createShardingPanel(){

	let shardingPanelOuter = document.createElement('div');
	shardingPanelOuter.id = 'sharding-panel-outer';

	
	let shardingPanel = document.createElement('div');
	shardingPanel.id = 'sharding-panel';
	shardingPanel.classList.add('panel');
	//sourcefindPanel.textContent = 'panelpanel';


	shardingPanel.appendChild(shardbar.createShardbar());
	shardingPanel.appendChild(shardlist.createShardlistcard());

	//shardlist.loadShardsIntoShardlist();

	shardingPanelOuter.appendChild(shardingPanel);

	return shardingPanelOuter;
}






export {
	createShardingPanel
}