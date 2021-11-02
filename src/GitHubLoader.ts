import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs";
import { Octokit } from "octokit";
import path from "path";

export class GitHubLoader {
  private octokit: Octokit;
  private git: SimpleGit;

  static async init() {
    return new GitHubLoader();
  }

  constructor() {
    this.octokit = new Octokit();
    this.git = simpleGit();
  }

  async loadUcpComponents(rootdir:string) {
    const dir = path.join(rootdir,"com","github","ucpComponents")
    let result = await this.octokit.rest.search.repos({
      q: "topic:ucp-component",
    });

    for (let repo of result.data.items) {
      const repoPath = path.join(dir, repo.full_name);
      const companyPath = path.parse(repoPath).dir;
      this.mkDirRecursive(companyPath);

      if (fs.existsSync(repoPath)) {
        console.log("update");
        //TODO check logic
        // await this.git.cwd(repoPath).pull();
      } else {
        await this.git
          .submoduleAdd(repo.ssh_url, repoPath)
          .then((f) => console.log(f));
      }
    }

  }

  private mkDirRecursive(dir: string) {
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  }
}
