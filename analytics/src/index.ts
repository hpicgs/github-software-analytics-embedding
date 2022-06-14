import { parseScript, Program, tokenize } from "esprima";
import { readFileSync, writeFileSync } from "fs";
import { promisify } from "util";
import glob from "glob";

const globPromise = promisify(glob);

async function processFiles() {
  if(!process.env.REPOSITORY_ROOT) throw new Error('REPOSITORY_ROOT environment variable is not set');
  console.log("REPOSITORY_ROOT=", process.env.REPOSITORY_ROOT)
  const files = await globPromise(`${process.env.REPOSITORY_ROOT}/**/*.ts`);

  console.log(files)
  
  const csvData = [];
  for (const filename of files) {
    const file = readFileSync(filename, "utf-8");
    const ast = parseScript(file, { loc: true, comment: true, range: true });
    //const tokens = tokenize(file, { loc: true });
    const loc = getLoC(ast);
    const noc = getNoC(ast);
    const cloc = getCommentLines(ast);
    const dc = getDensityOfComments(loc + cloc, cloc);
    const functionNumber = getNumberOfFunctions(ast);
    csvData.push([filename, loc, noc, cloc, dc, functionNumber]);
  }
  let csv = "filename,LoC,NoC,CLoC, DC, Number of Functions\r\n";
  for (const row of csvData) {
    csv += row.join(",") + "\r\n";
  }
  writeFileSync("metrics.csv", csv);
}

processFiles().catch((e) => {
  console.error(e);
  process.exit(1);
});

/*
Metric: Lines of Code
TODO: eliminate blank lines -> when parsing the file probably
*/
function getLoC(ast: Program): number {
  let loc = -1;
  if (ast.loc?.end && ast.loc?.start) {
    loc = ast.loc?.end?.line - ast.loc?.start?.line;
  }
  return loc;
}

/*
Metric: Numbers of Comments
-> number of comments in a code file
-> single-line comments count as 1
-> multi-line comments count as 1
*/
function getNoC(ast: Program): number {
  return ast.comments?.length || 0;
}

/*
Metric: Comment Lines
-> number of comment lines in a code file
-> single-line count as 1
-> multi-line comments count as multiple lines 
*/
function getCommentLines(ast: Program): number {
  const comments: object = ast.comments || {};
  let commentLines = 0;
  for (const [_, value] of Object.entries(comments)) {
    commentLines += value.loc?.end?.line - value.loc?.start?.line + 1;
  }
  return commentLines;
}

/*
Metric: Density of Comments (DC)
-> ratio of comment lines to all lines
*/
function getDensityOfComments(allLines: number, cloc: number): number {
  return cloc / allLines;
}

/*
Metric: Nesting Level (NL)
-> depth of enclosing control structures
TODO: implement evalutating of nesting level (NL)
*/

function getNumberOfFunctions(ast: Program): number {
  let numberOfFunctions = 0;
  for (const [key, value] of Object.entries(ast.body)) {
    if (value.type === "FunctionDeclaration") {
      numberOfFunctions++;
    }
  }
  return numberOfFunctions;
}
