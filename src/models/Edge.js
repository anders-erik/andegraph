
const {newUuid} = require('../utils/uuid-v0.2');

function emptyEdge(){
	return {
		Uuid: newUuid(),
		Node1Uuid: 0,
		Node2Uuid: 0,
		Directed: 0,
		Type: 0,
		Order: 0,
		Path: 0,

	}
}

module.exports =  {
	emptyEdge,
}
