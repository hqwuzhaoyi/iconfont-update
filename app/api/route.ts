import { NextResponse } from "next/server";
import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";
import { exec, execSync } from "child_process";
import path from "path";
import fs from "fs";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git: SimpleGit = simpleGit(options);

function splitGitDiff(diff: string) {
  const diffLines = diff.split("\n");
  let oldCode = [];
  let newCode = [];

  for (const line of diffLines) {
    if (line.startsWith("-")) {
      oldCode.push(line.slice(1));
    } else if (line.startsWith("+")) {
      newCode.push(line.slice(1));
    }
  }

  return {
    oldCode: oldCode.join("\n"),
    newCode: newCode.join("\n"),
  };
}

console.debug(process.env.GIT_REPO)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get("branch");
  const code = searchParams.get("code");
  const project = searchParams.get("project");
  console.debug("branch", branch);
  console.debug("code", code);
  console.debug("project", project);
  if (fs.existsSync(path.join(process.cwd(), "icon"))) {
    fs.rmdirSync(path.join(process.cwd(), "icon"), { recursive: true });
  }
  await git.clone(process.env.GIT_REPO as string, "icon", [
    "--branch",
    "master",
    "--single-branch",
  ]);

  const options: Partial<SimpleGitOptions> = {
    baseDir: path.join(process.cwd(), "icon"),
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
  };

  const targetGit: SimpleGit = simpleGit(options);

  execSync(
    `node ./scripts/downloadIcon.js --iconCode=${code} --iconProject=${project}`,
    {
      cwd: path.join(process.cwd(), "icon"),
    }
  );

  const diff = await targetGit.diff();
  const summary = await targetGit.diffSummary();
  console.debug("diff", diff);

  return NextResponse.json({
    result: {
      diff: splitGitDiff(diff),
      summary: summary,
    },
  });
}
