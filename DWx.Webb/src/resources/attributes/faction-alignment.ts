import { autoinject } from 'aurelia-framework';

@autoinject()
export class FactionAlignmentCustomAttribute {
  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    console.log("fac al attrib!")
    console.log(newValue);
    if (!!newValue && newValue === "00000000-0000-0000-0000-000000000000") {
      (<any>this.element).style.backgroundImage = "url(images/rebel-logo.jpg)";
    } else {
      (<any>this.element).style.backgroundImage = "url(images/imperial-logo.jpg)";
    }
  }
}