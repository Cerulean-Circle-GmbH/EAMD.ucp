import { GitHubLoader } from "./../src/GitHubLoader";
GitHubLoader.init().then((loader) =>
  loader.loadUcpComponents("src/submodules")
);