import { NextResponse } from 'next/server';
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get('branch');
  const code = searchParams.get('code');
  const project = searchParams.get('project');
  console.debug('branch', branch);
  console.debug('code', code);
  console.debug('project', project);
  if (fs.existsSync(path.join(process.cwd(), 'icon'))) {
    const options: Partial<SimpleGitOptions> = {
      baseDir: path.join(process.cwd(), 'icon'),
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };

    const targetGit: SimpleGit = simpleGit(options);
    if (branch) {
      const result = await targetGit
        .add('./*')
        .commit('feat: update' + project, () => {
          execSync(`npm run version`, {
            cwd: path.join(process.cwd(), 'icon'),
          });
        })
        .push('origin', `master:${branch}`, ['--follow-tags']);
      console.debug('push result', result);
      return NextResponse.json(result);
    }
  }

  return NextResponse.json({
    result: {
      error: 'no rss',
    },
  });
}
