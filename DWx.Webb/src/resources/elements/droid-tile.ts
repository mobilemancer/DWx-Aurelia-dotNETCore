import { bindable, autoinject } from 'aurelia-framework';

export class DroidTile {
  @bindable droid;

  bind(bindingContext: Object,overrideContext: Object) {
    console.log(bindingContext);
  }
}