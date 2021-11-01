import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs";
import { Octokit, App } from "octokit";

const components = ["git@github.com:Cerulean-Circle-GmbH/once.ts.git"];

const workdir = "Once";
const octokit = new Octokit();
const componentsDir = "Components";

!fs.existsSync(componentsDir) && fs.mkdirSync("Components");

async function doit() {
  const git: SimpleGit = simpleGit(componentsDir);

  try {
    // await git.addRemote(
    //   "foo",
    //   "git@github.com:Cerulean-Circle-GmbH/once.ts.git"
    // );

    let foo = await octokit.rest.search.repos({ q: "topic:eamd-component" });
    console.log("units",foo.data.items)

    // console.log(
    //   "REPOS",
    //   await octokit.rest.repos.listForOrg({
    //     org: "Cerulean-Circle-GmbH",
    //     request: {},
    //   })
    // );

    console.log("remotes", await git.getRemotes());
  } catch (e: any) {
    console.log("error", e);
  }
  // git.init();
  // let foo = git
  // //   .init(onInit)
  //   .addRemote()
  //   .status()#
  git
    .clone("git@github.com:Cerulean-Circle-GmbH/once.ts.git")
  //   .clone()
  //   .fetch()

  // function onInit(err:any, initResult:any) {
  //     console.log(err,initResult)
  // }
  // function onRemoteAdd(err:any, addRemoteResult:any) {
  //     console.log(err,addRemoteResult)
  // }

  console.log("WORD");
}

doit();
