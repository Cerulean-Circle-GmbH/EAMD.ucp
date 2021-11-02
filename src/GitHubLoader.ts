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
    this.componentsDir = path.join("Components", "Github");
    this.mkDirRecursive(this.componentsDir);
    this.git = simpleGit();
    this.git.status().then(result=>console.log("status",result))
  //  console.log("status",this.git.status())
  }

  async loadUcpComponents() {
    let result = await this.octokit.rest.search.repos({
      q: "topic:ucp-component",
    });

    result.data.items.forEach((repo) => {
      const repoPath = path.join(this.componentsDir, repo.full_name);
      const companyPath = path.parse(repoPath).dir;
      this.mkDirRecursive(companyPath);

      if (fs.existsSync(repoPath)) {
        this.git.submoduleUpdate(repoPath)
        // this.git.cwd({ path: repoPath }).pull();
      } else {
        // this.mkDirRecursive(repoPath)
        this.git.submoduleAdd(repo.git_url,repoPath).then(f=>console.log("submodule",f))
        // this.git.cwd({ path: companyPath }).clone(repo.git_url);
      }
    });
  }
  
  private mkDirRecursive(dir: string) {
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  }
}
