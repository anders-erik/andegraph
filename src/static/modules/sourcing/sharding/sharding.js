
import * as shardbar from './shardbar/shardbar.js';
import * as Listcard from './shardlist/shardlist.js';

function createShardingPanel(){

	let shardingPanelOuter = document.createElement('div');
	shardingPanelOuter.id = 'sharding-panel-outer';

	let shardingPanel = document.createElement('div');
	shardingPanel.id = 'sharding-panel';
	shardingPanel.classList.add('panel');
	//sourcefindPanel.textContent = 'panelpanel';


	shardingPanel.appendChild(shardbar.createShardbar());
	shardingPanel.appendChild(Listcard.createShardlistcard());

	shardingPanelOuter.appendChild(shardingPanel);

	return shardingPanelOuter;
}






export {
	createShardingPanel
}