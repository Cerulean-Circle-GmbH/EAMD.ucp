import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs";
import { Octokit } from "octokit";
import path from "path";

export class GitHubLoader {
  private octokit: Octokit;
  private componentsDir: string;
  private git: SimpleGit;

  static async loadUcpComponents() {
    let loader = new GitHubLoader();
    loader.loadUcpComponents();
  }

  constructor() {
    this.octokit = new Octokit();
    this.componentsDir = path.join("src", "Github");
    this.mkDirRecursive(this.componentsDir);
    this.git = simpleGit();
    this.git.status().then((result) => console.log("status", result));
  }

  async loadUcpComponents() {
    let result = await this.octokit.rest.search.repos({
      q: "topic:ucp-component",
    });

    for (let repo of result.data.items) {
      const repoPath = path.join(this.componentsDir, repo.full_name);
      const companyPath = path.parse(repoPath).dir;
      this.mkDirRecursive(companyPath);

      if (fs.existsSync(repoPath)) {
        console.log("update");
        await this.git.cwd(repoPath).pull();
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
