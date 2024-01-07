const TaskState = {
	PENDING: 0,
	FULFILLED: 1
}

export default class ScrapeTask {
	// PUBLIC
	// PRIVATE
	_id = '';
	_selector = '';
	_selectorType = '';
	_xPath = '';
	_url = '';
	_htmlContent = '';
	_status = TaskState.PENDING; 
};
