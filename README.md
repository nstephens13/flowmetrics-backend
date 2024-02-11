# Flowmetrics Backend


## Getting started

To get started with backend run npm install to get all packages.
When you want to start the backend you have to run the following command:

```
npm run start
```

## Jira Data from Adesso

To get the Jira Data from Adesso you have to create an .env file in the root directory of the project.
The .env file should never be pushed to the repository. The .env file should contain the following variables:

```
USER_BEARERTOKEN=
PORT=3000
JIRA_URL=
```

If you don´t add the .env file the backend will start, but you will not get any data from Jira.
Otherwise, you will get sample data from the backends mock-data.
