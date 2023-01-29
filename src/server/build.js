const esbuild = require("esbuild");
const { argv } = require("process");

const args = require("yargs").argv;

function onRebuild(error, result) {
  if (error) console.log("watch build failed: ", error);
  else console.log("watch build succeeded");
}

console.log(args.outfile)

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    // outfile: "../../dist/server.js",
    bundle: true,
    minify: true,
    platform: "node",
    target: "node18.2.1",
    watch: {
      onRebuild: !!args.watch && onRebuild,
    },
    outfile: args.outfile,
  })
  .then(() => console.log("⚡ Done"))
  .catch(() => process.exit(1));
