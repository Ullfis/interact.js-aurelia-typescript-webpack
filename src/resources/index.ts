import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(aurelia: FrameworkConfiguration) {

  // attributes
  aurelia.globalResources([
    './attributes/interact-draggable'
  ]);

}
