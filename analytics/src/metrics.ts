import { readFileSync } from "fs";
import { Metrics } from "./types";
import {
  createSourceFile,
  Node,
  ScriptTarget,
  SyntaxKind,
  forEachChild,
  getLeadingCommentRanges,
  CommentRange,
} from "typescript";

/*
  Metric: Lines of Code
  TODO: eliminate blank lines -> when parsing the file probably
  */
function getLoC(ast: Node): number {
  const fullText = ast.getFullText();
  return (fullText.match(/\n/g) || "").length + 1;
}

/*
  Metric: Numbers of Comments
  -> number of comments in a code file
  -> single-line comments count as 1
  -> multi-line comments count as 1
  */
function getComments(ast: Node) {
  let comments: CommentRange[] = [];
  const fullText = ast.getFullText();
  function visit(node: Node) {
    forEachChild(node, visit);

    const commentRange = getLeadingCommentRanges(fullText, node.getFullStart());
    if (commentRange) {
      comments = comments.concat(commentRange);
    }
  }
  forEachChild(ast, visit);
  const uniqueComments = comments.reduce((acc: CommentRange[], curr) => {
    if (!acc.some((t) => curr.end === t.end && curr.pos === t.pos)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return uniqueComments;
}

function getNoC(comments: CommentRange[]): number {
  return comments.length;
}

/*
  Metric: Comment Lines
  -> number of comment lines in a code file
  -> single-line count as 1
  -> multi-line comments count as multiple lines 
  */
function getCommentLines(comments: CommentRange[], fullText: string): number {
  let commentLines = 0;
  for (const comment of comments) {
    commentLines +=
      (fullText.substring(comment.pos, comment.end).match(/\n/g) || "").length +
      1;
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

/*
 MethodDeclaration: class member
FunctionDeclaration: function Keyword
ArrowFUnction: ArrowFUnction
- get set Accessor? 
- Constructor?
*/
function getNumberOfFunctions(ast: Node): number {
  let numberOfFunctions = 0;
  function visit(node: Node) {
    forEachChild(node, visit);
    if (
      node.kind === SyntaxKind.MethodDeclaration ||
      node.kind === SyntaxKind.FunctionDeclaration ||
      node.kind === SyntaxKind.ArrowFunction
    ) {
      numberOfFunctions++;
    }
  }
  forEachChild(ast, visit);
  return numberOfFunctions;
}

export function getMetrics(filename: string): Metrics {
  const file = readFileSync(filename, "utf-8");
  const ast = createSourceFile(filename, file.toString(), ScriptTarget.Latest);

  const comments = getComments(ast);
  const loc = getLoC(ast);
  const noc = getNoC(comments);
  const cloc = getCommentLines(comments, ast.getFullText());
  const dc = getDensityOfComments(loc + cloc, cloc);
  const nof = getNumberOfFunctions(ast);
  return { loc, noc, cloc, dc, nof };
}
