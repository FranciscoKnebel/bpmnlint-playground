import BpmnModeler from 'bpmn-js/lib/Modeler';
import download from 'downloadjs';

import defaultDiagram from '../diagrams/example.bpmn';
import {
  getUrlParam,
  setUrlParam
} from './helpers';

let i = 0;
const STORAGE_KEY = 'diagramXML';
export class BPMN {
  constructor({
    container,
    additionalModules,
    linting,
    keyboard
  }) {
    this.modeler = new BpmnModeler({
      container,
      additionalModules,
      linting,
      keyboard
    });

    const diagram = this.getStoredXML(STORAGE_KEY);
    this.modeler.importXML(diagram || defaultDiagram);

    this.modeler.on('linting.toggle', event => this.toggleLint(event));
    this.modeler.on('import.done', () => this.importDone());
    this.modeler.on('import.parse.start', event => this.setXML(event));
  }

  importDone() {
    const active = getUrlParam('linting');
    const linting = this.modeler.get('linting');

    if (active) {
      linting.activateLinting();
    } else {
      linting.deactivateLinting();
    }
  }

  setStoredXML(event) {
    window.localStorage.setItem(STORAGE_KEY, event.xml);
  }

  getStoredXML() {
    const diagram = window.localStorage.getItem(STORAGE_KEY);
    return diagram;
  }

  toggleLint(event) {
    setUrlParam('linting', event.active);
  }

  downloadDiagramXML() {
    this.modeler.saveXML({
      format: true
    }, (err, xml) => {
      if (!err) {
        download(xml, 'diagram.bpmn', 'application/xml');
      }
    });
  }

}