import { parseScript, Program } from "esprima";
import { readFileSync } from "fs";

export function getMetrics(filename: string) {
  const file = readFileSync(filename, "utf-8");
  const ast = parseScript(file, { loc: true, comment: true, range: true });
  const loc = getLoC(ast);
  const noc = getNoC(ast);
  const cloc = getCommentLines(ast);
  const dc = getDensityOfComments(loc + cloc, cloc);
  const nof = getNumberOfFunctions(ast);
  return { loc, noc, cloc, dc, nof };
}

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
