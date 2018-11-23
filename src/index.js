import lintModule from 'bpmn-js-bpmnlint';

// Import module CSS
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';

// Import project css
import './css/normalize.css';
import './css/index.css';

import {
  BPMN
} from './js/modeler';

import bpmnlint from './.bpmnlintrc';
import dragAndDrop from './js/dragAndDrop';

const bpmn = new BPMN({
  container: '#canvas',
  additionalModules: [lintModule],
  linting: {
    bpmnlint
  },
  keyboard: {
    bindTo: document
  }
});

// Allow drag and drop of diagrams
dragAndDrop(bpmn.modeler);

// Define click of download button
document.querySelector('#download-button').addEventListener('click', () => bpmn.downloadDiagramXML());