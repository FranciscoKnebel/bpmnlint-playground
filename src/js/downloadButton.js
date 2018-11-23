import download from 'downloadjs';

export default function (modeler, button) {
  button.addEventListener('click', () => {
    modeler.saveXML({
      format: true
    }, (err, xml) => {
      if (!err) {
        download(xml, 'diagram.bpmn', 'application/xml');
      }
    });
  });
}