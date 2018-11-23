import fileDrop from 'file-drops';

export default function (modeler) {
  const dndHandler = fileDrop('Drop BPMN Diagram here.', function (files) {
    modeler.importXML(files[0].contents);
  });

  document.querySelector('body').addEventListener('dragover', dndHandler);
}