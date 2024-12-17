# Gatling Postman - TypeScript demo project for December 2024 Office Hours Webinar

A demo of various ways to use a Postman collection as a Gatling user scenario with TypeScript NPM.

## Additional Resources
- [Gatling Postman reference documentation](https://docs.gatling.io/reference/script/protocols/postman/).
- [Product announcement blog post with examples](https://gatling.io/blog/postman-integration/)
- [Create a test from Postman tutorial](https://docs.gatling.io/tutorials/postman/)

## Prerequisites

- [Node.js](https://nodejs.org/en/download) v18 or later (LTS versions only)
-  npm v8 or later (included with Node.js)

## Use demo project

Run the typeScript sample:

```shell
cd typescript
npm install
npx gatling run --typescript --simulation GatlingEcomm # automatically download Gatling runtime, build the project, and run the computerdatabase simulation
```

The JavaScript sample does not work as-is


The `gatling` command-line tool has a built-in help function:

```shell
npx gatling --help # List all available commands
npx gatling run --help # List options for the "run" command (--help also works for all other available commands)
```

## Included helper scripts

Note that both sample projects include a few aliases in the `package.json`'s `scripts` section, which you can use for convenience or refer to as examples:

```shell
npm run clean # Delete Gatling bundled code and generated reports
npm run format # Format code with prettier
npm run check # TypeScript project only, type check but don't build or run
npm run build # Build project but don't run
npm run computerdatabase # Run the included computerdatabase simulation
```

