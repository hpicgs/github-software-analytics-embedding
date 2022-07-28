import { useEffect, useRef, useState } from "react";
import {
  gloperate,
  initialize,
  Configuration,
  Visualization,
} from "treemaps";
  
export default function Treemap() {

  const [config, setConfig] = useState<Configuration>(new Configuration());
  const [visualization, setVisualization] = useState<Visualization>(new Visualization());
  const [canvas, setCanvas] = useState<gloperate.Canvas>();
  const canvasElement = useRef(null);


  useEffect(() => {
    setCanvas(initialize("canvasElement"));
    loadConfig();
    debugInit();
  }, []);



  function loadConfig() {
    if (config && visualization && canvas) {
      visualization.configuration = config;
      canvas.controller.update();
    }
  }

  function debugInit() {
    // TODO: input(s) for debug logging / exposing global variables?

    // Enable debug logging
    // this.visualization.debug = true;

    (window as any)['gloperate'] = gloperate;
    (window as any)['canvas'] = canvas;
    (window as any)['context'] = canvas?.context;
    (window as any)['controller'] = canvas?.controller;
    (window as any)['visualization'] = visualization;
    (window as any)['renderer'] = visualization.renderer;
  }



  return (
    <div>
        <h1>Treemap</h1>
        <div id="labelContainer" className="label-overlay"></div>
        <canvas id="canvasElement"></canvas>
    </div>
  );
}
