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

    (window as any)["gloperate"] = gloperate;
    (window as any)["canvas"] = canvas;
    (window as any)["context"] = canvas?.context;
    (window as any)["controller"] = canvas?.controller;
    (window as any)["visualization"] = visualization;
    (window as any)["renderer"] = visualization.renderer;
  }

  return (
    <Container fixed>
      <div id="labelContainer" className="label-overlay"></div>
      <canvas id="canvasElement" width="1400" height="700"></canvas>
    </Container>
  );
}
