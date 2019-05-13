import { Injectable } from "@angular/core";
import * as d3 from "d3";

@Injectable({
  providedIn: "root"
})
export class D3Service {
  constructor() {}

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour() {}

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour() {}

  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph() {}
}
