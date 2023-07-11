import React, { PureComponent } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

const oldCode = `
{
  "name": "Original name",
  "description": null,
  "asd": 1,
  1
}
`;
const newCode = `
{
  "name": "My updated name",
  "description": "Brand new description",
  "status": "running",
  "asd": 1,
  1
}
`;

class Diff extends PureComponent {
  render = () => {
    return (
      <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        compareMethod={DiffMethod.WORDS}
        splitView={true}
      />
    );
  };
}

export default Diff;
