## Synopsis

Boiller controller - web apllication to manage temperature of heating boiller. 
Code hosted on [GitHub repository](https://github.com/viktor255/Kotol-webapp).

## Installation

You need to have installed Node.js (tested version 9.11.1) and running local or remote MongoDB database.

### Configurations needed before first use:

 - MongoDB database link, you can run MongoDB local or remote - provide link to variable 'urlLink' in 'app.js' file
 - Url application link, local or remote - provide link to variable 'urlLink' in both 'auth.service.ts' and 'timeConfig.service.ts' files
 - run 'npm install' to install dependencies

### How to run:

 - to start backend run 'npm start'
 - to start Angular front-end in dev mode run 'npm run build:dev'
 - to build Angular front-end in prod mode run 'npm run build:prod'
 - visit [http://localhost:3000/](http://localhost:3000/) to use application

### Project structure:

* assets folder - Angular front-end
* bin folder - Express web server setup
* models folder - Mongoose schematic database models
* node_modules - installed dependencies after 'npm install'
* public - public files for users, there will be compiled Angular application
* routes - backend routes to communicate between front-end and back-end, REST
* views - default view that user sees before Angular application is loaded
* app.js - main configuration of app
* package.json - project npm setup and dependencies
* tsconfig.json - TypeScript compiler config
* webpack.config files - webpack configurations

## License

Copyright 2018 Viktor Lehotský

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.