const core = require('@actions/core');
const SftpClient = require('ssh2-sftp-client');

async function run() {
  const client = new SftpClient();
  const host = core.getInput('host');
  const username = core.getInput('username');
  const password = core.getInput('password');
  const source = core.getInput('source');
  const destination = core.getInput('destination');

  try {
    // Connect to the server
    await client.connect({
      host: host,
      port: 22,
      username: username,
      password: password,
    });

    // Upload files from the source directory to the destination directory
    core.info(`Uploading files from ${source} to ${destination}`);
    await client.uploadDir(source, destination);

    core.info('Deployment successful');
  } catch (err) {
    core.setFailed(`Failed to deploy: ${err.message}`);
  } finally {
    client.end();
  }
}

run();
