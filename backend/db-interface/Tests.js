
const { runCodeCrud } = require('./tests/RunCodeCrud')
const { runEdgeCrud } = require('./tests/RunEdgeCrud')
const { runEquationCrud } = require('./tests/RunEquationCrud')
const { runEventCrud } = require('./tests/RunEventCrud')
const { runFileCrud } = require('./tests/RunFileCrud')
const { runNodeCrud } = require('./tests/RunNodeCrud')
const { runProjectCrud } = require('./tests/RunProjectCrud')
const { runReviewCrud } = require('./tests/RunReviewCrud')
const { runSourceCrud } = require('./tests/RunSourceCrud')
const { runTextCrud } = require('./tests/RunTextCrud')
const { InsertChild } = require('./tests/InsertChild')


module.exports = {
	runCodeCrud,
	runEdgeCrud,
	runEquationCrud,
	runEventCrud,
	runFileCrud,
	runNodeCrud,
	runProjectCrud,
	runReviewCrud,
	runSourceCrud,
	runTextCrud,
	InsertChild,
}
