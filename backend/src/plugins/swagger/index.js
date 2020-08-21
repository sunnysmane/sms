const log = require("logger/logger"),
	config = require("config"),
	{ resolve } = require("path");

 
const register = async server => {
	try {
		return server.register([
			require("@hapi/inert"),
			require("@hapi/vision"),
			{
				plugin: require("hapi-swagger"),
				options: {
					info: {
						title: "SMS Backend Service",
						description: "SMS Backend Service Api Documentation",
						version: "1.0",
						// termsOfService: "This documentation is private",
						contact: {
							name: "admin",
							email: "admin@admin.com",
						},
					},
					// host: config.swagger.host,
					//basePath: `/aurops-project-notes-${config.env}`,
					schemes: ["http", "https"],
					tags: [
						{
							name: "SMS Backend Service",
							description: "Api interface.",
						},
					],
					documentationPath: '/documentation',
					grouping : 'tags',
					swaggerUI: true,
					documentationPage: true,
					templates: resolve("templates", "swagger")
				},
			},
		]);
	} catch (err) {
		log.info(`Error registering swagger plugin: ${err}`);
	}
};

module.exports = {
	register,
	info: { name: "Swagger Documentation", version: "1.0.0" },
};
