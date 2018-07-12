const SSH2Promsie = require('ssh2-promise');
const util = require('util');
const path = require('path');

const sshconfig = {
  host: process.env.HOST || '35.180.41.80',
  // user: process.env.USER || 'ubuntu',
  username: 'ubuntu',
  identity:
    process.env.IDENTITY_PATH ||
    path.join(process.env.HOME, '.ssh/paris_aws_key_pair.pem')
};

const prefix = 'cardiomed';

console.log(util.inspect(sshconfig));

const ssh = new SSH2Promsie(sshconfig);
const sftp = new SSH2Promsie.SFTP(ssh);

const connectSSH = async ssh => {
  try {
    await ssh.connect();
    console.log('SSH connection established');
    const list = await sftp.readdir('/home/ubuntu/apps/envserver');
    // console.log(`files are ${util.inspect(list)}`);
    if (list) {
      const reg = new RegExp(prefix, 'g');
      const result = list
        .filter(it => it.longname.charAt(0) === '-')
        .filter(it => reg.test(it.filename));
      console.log(`filtered: ${util.inspect(result)}`);
    }
    // const attributes = await sftp.attrs();
    // console.log(`files are ${util.inspect(attributes)}`);
  } catch (err) {
    throw Error(err);
  }
};

connectSSH(ssh);
// ssh.connect().then(() => {
//   console.log('Connection established');
// });
