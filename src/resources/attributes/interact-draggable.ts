// source: http://davismj.me/blog/aurelia-drag-and-drop/

import { inject, bindable, bindingMode } from 'aurelia-framework';

// import * as interact from "interact.js";
const interact = require('interact.js');

@inject(Element)
export class InteractDraggableCustomAttribute {

  // we make options bindable, so that the interact draggable options can be customized declaratively
  @bindable({ defaultBindingMode: bindingMode.oneTime }) options;

  constructor(private element: HTMLElement) {}

  attached() {
    interact(this.element)

      // we can set default options if we want, overriding any options that were passed in
      .draggable(Object.assign({}, this.options || {}))

      // for each event, we dispatch an bubbling, HTML5 CustomEvent, which the aurelia
      // binding engine will be able to listen for
      .on('dragstart', (event) => this.dispatch('interact-dragstart', event))
      .on('dragmove', (event) => this.dispatch('interact-dragmove', event))
      .on('draginertiastart', (event) => this.dispatch('interact-draginertiastart', event))
      .on('dragend', (event) => this.dispatch('interact-dragend', event));

  }

  dispatch(name, data) {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }
}

// interact.js events
// interact.js provides a number of different events, including resize and rotation events.
// Today, we’re just going to look at the draggable event. In order to make an element draggable,
// we wrap the element as an interact object and call draggable() on it, and configure some event handlers.
//
// interact('.draggable')
//   .draggable()
//   .on('dragstart', ondragstart)
//   .on('dragmove', ondragmove)
//   .on('draginertiastart', ondraginertiastart)
//   .on('dragend', ondragend);
// });

// The event handlers will be called on their respective events and passed an InteractEvent object.
//
// class InteractEvent {
//   target // The element that is being interacted with
//   interactable // The Interactable that is being interacted with
//   interaction // The Interaction that the event belongs to
//   x0, y0 // Page x and y coordinates of the starting event
//   clientX0, clientY0 // Client x and y coordinates of the starting event
//   dx, dy // Change in coordinates of the mouse/touch
//   velocityX, velocityY // The Velocity of the pointer
//   speed // The speed of the pointer
//   timeStamp // The time of creation of the event object
// }
