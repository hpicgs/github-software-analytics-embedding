import { useEffect, useRef, useState } from "react";
import {
  gloperate,
  initialize,
  Configuration,
  Visualization,
} from "treemaps";
  
export default function HiViSerClient() {

  const [config, setConfig] = useState<Configuration>(new Configuration());
  const [visualization, setVisualization] = useState<Visualization>(new Visualization());
  const [canvas, setCanvas] = useState<gloperate.Canvas>();
  const canvasElement = useRef(null);


  useEffect(() => {
    setCanvas(initialize(canvasElement));

    loadConfig();
  }, []);



  function loadConfig() {
    if (config && visualization && canvas) {
      visualization.configuration = config;
      canvas.controller.update();
    }
  }


  return (
    <div>
        <h1>HiviserClient</h1>
        <div ref={canvasElement} className="label-overlay"></div>
        <canvas id="canvasElement"></canvas>
    </div>
  );
}
