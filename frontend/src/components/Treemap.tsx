import { configFromMetricsJSON as configFromMetricsTree } from "@/utils/treemap_helpers";
import { MetricsNode } from "@analytics/types";
import { useEffect, useState } from "react";
import {
  gloperate,
  initialize,
  Configuration,
  Visualization,
  Renderer,
} from "treemaps";

export default function Treemap(metricsTree: MetricsNode) {
  const [config, setConfig] = useState<Configuration>(configFromMetricsTree(metricsTree));
  const [visualization, setVisualization] = useState<Visualization>(new Visualization());

  let canvas: gloperate.Canvas | undefined = undefined;
  useEffect(() => {
    canvas = initialize("canvasElement");
    canvas.renderer = visualization.renderer as Renderer;
    console.log("cfg:", config);
    loadConfig();
    //debugInit();
  }, []);

  function loadConfig() {
    console.log("loadConfig");
    if (config && visualization && canvas) {
      visualization.configuration = config;

      console.log("Visualization:", visualization);
      console.log("Config:", visualization.configuration);
      console.log("Canvas:", canvas);

      canvas.controller.update();
    } else {
      throw Error("Visualization or config not initialized");
    }
  }

  function debugInit() {
    // TODO: input(s) for debug logging / exposing global variables?

    // Enable debug logging
    visualization.debug = true;

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
      <canvas id="canvasElement" width="800" height="400"></canvas>
    </div>
  );
}
