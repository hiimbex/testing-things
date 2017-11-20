const standard = require('standard')
;
module.exports = {
  async push(event, context) {
    const push = event.payload

    const compare = await context.github.repos.compareCommits(context.repo({
      base: push.before,
      head: push.after
    }));

    const branch = push.ref.replace('refs/heads/', '');

    return Promise.all(compare.data.files.map(async file => {
      const content = await context.github.repos.getContent(context.repo({
        path: file.filename,
        ref: branch
      }));
      const text = Buffer.from(content.data.content, 'base64').toString();

      standard.lintText(text, {cwd: '', fix: true, filename: file.filename}, (err, results) => {
        console.lo(result.output).toString('base64'),
            sha: content.data.sha,
            branch: branch,
          }));
        }));
      });
    }));
  }
