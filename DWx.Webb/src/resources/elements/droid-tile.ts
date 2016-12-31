import { bindable, autoinject } from 'aurelia-framework';

export class DroidTile {
  @bindable droid;
  private bindingContext: Object;

  bind(bindingContext: Object, overrideContext: Object) {
    this.bindingContext = bindingContext;
  }
}