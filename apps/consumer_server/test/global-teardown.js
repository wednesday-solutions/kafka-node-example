const isCI = require("is-ci");
const { down } = require("docker-compose");
const { join } = require("path");

module.exports = async () => {
    // Check if running CI environment
    if (isCI) {
        await down({
            commandOptions: ["--remove-orphans"],
            cwd: join(__dirname),
        });
    }
};
