class Response {
	static sendResponse(is_success, result, message, status_code) {
		return {
			is_success,
			result,
			message,
			status_code,
		};
	}
}

module.exports = Response;
