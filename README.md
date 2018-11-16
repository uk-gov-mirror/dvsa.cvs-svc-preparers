## cvs-svc-stub-crm-atfs

**In order to run cvs-svc-preparers-mock locally:**

  - `npm install (install dependencies)`
  - `npm run start (start project locally with serverless offline)`

**Git Hooks**

Please set up the following prepush git hook in .git/hooks/pre-push

`#!/bin/sh`  
`npm run prepush && git log -p | scanrepo`

**Security**

Please install and run the following securiy programs as part of your testing process:

https://github.com/awslabs/git-secrets

After installing, do a one-time set up with `git secrets --register-aws`. Run with `git secrets --scan`.
https://github.com/UKHomeOffice/repo-security-scanner

After installing, run with `git log -p | scanrepo`.
These will be run as part of prepush so please make sure you set up the git hook above so you don't accidentally introduce any new security vulnerabilities.
