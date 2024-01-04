import { configFromFileTree, createFileTree } from "@/utils/treemap_helpers";
import { MetricsTableData } from "@analytics/types";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import {
  gloperate,
  initialize,
  Configuration,
  Visualization,
  Renderer,
} from "treemap";

export default function Treemap({ header, rows }: MetricsTableData) {
  const fileTree = createFileTree(rows);

  const [config, setConfig] = useState<Configuration>(
    configFromFileTree(fileTree)
  );
  const [visualization, setVisualization] = useState<Visualization>(
    new Visualization()
  );

  let canvas: gloperate.Canvas | undefined = undefined;
  useEffect(() => {
    // This is a workaround to get the Treemap library to look for the font files in the right place
    (window as any).SeereneConstants = {
      STATIC_DIRECTORY: `${import.meta.env.BASE_URL}assets`,
    };
    const html_canvas = document.getElementById("canvasElement") as HTMLCanvasElement;
    canvas = initialize(html_canvas);
    canvas.dispose();
    // canvas.frameScale = [ 1.0, 1.0 ];
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

    (window as any)["gloperate"] = gloperate;
    (window as any)["canvas"] = canvas;
    (window as any)["context"] = canvas?.context;
    (window as any)["controller"] = canvas?.controller;
    (window as any)["visualization"] = visualization;
    (window as any)["renderer"] = visualization.renderer;
  }

  const width = 1440 / window.devicePixelRatio;
  const height = 720 / window.devicePixelRatio;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <canvas id="canvasElement" width={width} height={height}></canvas>
    </div>
  );
}
