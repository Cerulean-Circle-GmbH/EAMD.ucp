# GitHubLoader-research for EAMD.ucp

Enterprise Application Management Descriptors for Unit Component Package Standard

# internal steps to produce repo

```
    npm init -y
```

## Loader which loads all ucp-components from github

```
    npm i -D simple-git fs octokit ts-node

    package.json:
       "init": "ts-node scripts/init",
```

## lerna, rollup setup
idea is to build up all linked ucp-components. so lerne will manage packages and rollup will create the componentsfolder
```
    npm i -D lerna
```
