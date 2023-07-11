import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { ResultType } from '../Form';

export const Code = ({ diffJson }: { diffJson: ResultType }) => {
  return (
    <ReactDiffViewer
      oldValue={diffJson.result.diff.newCode}
      newValue={diffJson.result.diff.oldCode}
      compareMethod={DiffMethod.WORDS}
      splitView={true}
    />
  );
};
