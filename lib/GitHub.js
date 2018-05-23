class GitHub {
  constructor() {
    this.octokit = require('@octokit/rest')({
      headers: {
        accept:       'application/vnd.github.v3+json',
        'user-agent': 'octokit/rest.js v1.2.3',
      },
      baseUrl: 'https://api.github.com',
      agent:   undefined
    });
  }

  async getTree(repo) {
    const [org, path, branch] = repo.split('/'),
          o = {
            owner:     org, 
            repo:      path, 
            tree_sha:  branch || 'master', 
            recursive: 1
          };

    try {
      const data = await this.octokit.gitdata.getTree(o);
      return data.data.tree;
    }
    catch (e) {
      throw e;
    }
  }


}

module.exports = new GitHub;

