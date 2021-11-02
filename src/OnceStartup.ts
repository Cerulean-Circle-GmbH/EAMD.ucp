// @ts-ignore
import { getPackages } from "@lerna/project";
import fs from "fs";
import path from "path";

// import {Once} from "../Components/com/github/ucpComponents/Cerulean-Circle-GmbH/once.ts/Once.class.js"
// Once.start()

export class OnceStartup {
  static get submodulesPath() {
    return path.join(__dirname, "..", "src", "submodules");
  }
  static getNamespace(location: string) {
    const basePath = path.resolve(__dirname, location);
    return basePath.replace(this.submodulesPath + path.sep, "");
  }

  static async start() {
    const components = await getPackages("");

    // Copy build
    components.forEach((component: any) => {
      const basePath = path.resolve(__dirname, component.location);
      const namespace = this.getNamespace(basePath);
      const distDir = path.join(basePath, "dist");
      const ucpComponentDir = path.join("dist","EAMD.ucp","Components", namespace);

      this.mkDirRecursive(ucpComponentDir);
      fs.cpSync(distDir, ucpComponentDir, { recursive: true });
    });

//     const once = components.find((p: any) => p.name === "once");
// const onceClassPath = path.join("..","Components",this.getNamespace(once.location),"Once.class.js")
// // const onceClassPath = path.resolve(this.submodulesPath,onceClassRelativePath)
//     // this.getNamespace(once.location)
//     console.log("ONCE",onceClassPath);

    // const onceClass = (await import (onceClassPath))
    // console.log(onceClass)

    // const submodulesPath = path.join(__dirname, "..", "src", "submodules");

    // const eamdDir = path.resolve(__dirname, "..")

  }

  static mkDirRecursive(dir: string) {
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  }
}
