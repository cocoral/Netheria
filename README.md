# Tools used in this library:

- [Create React App](https://github.com/facebook/create-react-app).

- [Axios](https://axios-http.com/) to handle http requests.

- [AntDesign](https://ant.design/) as UI library.

# System Requirements

yarn \
node > v14

# Getting Started with the project on your local environment

In the project directory, run following to install node modules

### `yarn install`

Then

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Folder structure

1. API related code goes into `/API` folder. This include [axios](https://axios-http.com/docs/intro) set-up, requests.

2. Components goes into `/Components` folder. Those components only take data as props.

3. Containers: anything that related to getting data goes into containers.

4. Utils, customized hooks goes under `/Utils` folder.
