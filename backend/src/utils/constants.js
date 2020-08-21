module.exports = Object.freeze({
	CONTENT_TYPE: {
		JSON: "application/json",
		FORM: "application/x-www-form-urlencoded",
		FORM_DATA: "multipart/form-data",
		XML: 'application/xml',
		TEXT_XML: 'text/xml'
	},
	CONTENT_TYPE_WITH_CHARSET: {
		JSON: 'application/json;charset=utf-8',
		FORM: 'application/x-www-form-urlencoded;charset=utf-8',
		FORM_DATA: 'multipart/form-data;charset=utf-8',
		XML: 'application/xml;charset=utf-8',
		TEXT_XML: 'text/xml;charset=utf-8'
	},
	METHODS: {
		GET: "GET",
		POST: "POST",
		PUT: "PUT",
		DELETE: "DELETE",
	}
});
