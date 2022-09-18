import { configFromMetrics } from "@/utils/treemap_helpers";
import { useEffect, useState } from "react";
import {
  gloperate,
  initialize,
  Configuration,
  Visualization,
  Renderer,
} from "treemaps";
  
export default function Treemap() {

  const [config, setConfig] = useState<Configuration>(new Configuration());
  const [visualization, setVisualization] = useState<Visualization>(new Visualization());
  //const [canvas, setCanvas] = useState<gloperate.Canvas | undefined>(undefined);

  let canvas: gloperate.Canvas | undefined = undefined;
  useEffect(() => {
    canvas = initialize("canvasElement");
    canvas.renderer = visualization.renderer as Renderer;
    //setCanvas(initialize("canvasElement"));
    //createConfig();
    configFromMetrics();

    loadConfig();
    //debugInit();
  }, []);


  function createConfig() {
    config.topology = {
      edges: [
          [0, 1], [1, 10], [1, 11], [1, 12], [1, 13],
          [1, 3], [3, 30], [3, 31], [3, 32], [3, 33],
          [0, 2], [2, 4], [4, 40], [4, 41], [4, 42], [4, 43],
          [2, 20], [2, 21], [2, 22], [2, 23],
      ],
      format: 'tupled',
    };

    config.buffers = [
        {
            identifier: 'Alpha', type: 'uint8',
            data: new Uint8Array(
                [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]),
        },
        { identifier: 'Beta', type: 'uint8', data: new Uint8Array(21) },
        {
            identifier: 'Gamma', type: 'uint8',
            data: new Uint8Array(
                [0, 0, 1, 2, 3, 4, 0, 5, 6, 7, 8, 0, 0, 9, 10, 11, 12, 13, 14, 15, 16]),
        },
        { identifier: 'Delta', type: 'float32', data: new Float32Array(21) },
        { identifier: 'Epsilon', type: 'uint8', data: new Uint8Array(21) },
    ];

    config.bufferViews = [
        {
            identifier: 'Weight', source: 'buffer:Alpha',
            transformations: [{ type: 'propagate-up', operation: 'sum' }],
        },
        {
            identifier: 'Beta-Transformed', source: 'buffer:Beta',
            transformations: [
                { type: 'range-transform', sourceRange: [0.0, 64.0], targetRange: [0.0, 0.75] }],
        },
        {
            identifier: 'Gamma-Normalized', source: 'buffer:Gamma',
            transformations: [{ type: 'normalize', operation: 'min-to-max' }],
        },
    ];

    config.colors = [
        { identifier: 'emphasis', space: 'hex', value: '#00b0ff' },
        { identifier: 'auxiliary', space: 'hex', values: ['#00aa5e', '#71237c'] },
        { identifier: 'inner', space: 'hex', values: ['#e8eaee', '#eef0f4'] },
        { identifier: 'leaf', space: 'hex', values: ['#ffffff', '#fed500', '#fe8500', '#e62325'] },
        // { identifier: 'leaf', space: 'hex', values: ['#ffffff', '#5392ff', '#71cddd', '#34bc6e',
        // '#95d13c', '#db7c00', '#ffb000', '#ff509e', '#9b82f3'] },
    ];

    config.layout = {
        algorithm: 'snake', weight: 'bufferView:Weight',
        parentPadding: { type: 'absolute', value: 0.02 },
        siblingMargin: { type: 'relative', value: 0.20 },
        accessoryPadding: {
            type: 'absolute', direction: 'bottom', value: [0.0, 0.04, 0.03],
            relativeAreaThreshold: 0.4, targetAspectRatio: 2.0,
        },
        cascade: false,
    };


    config.labels = { innerNodeLayerRange: [1, 3], numTopInnerNodes: 4 };

    config.geometry = {
        parentLayer: { showRoot: false },
        leafLayers: [
            {
                colorMap: 'color:leaf', height: 'bufferView:Beta-Transformed',
                colors: 'bufferView:Gamma-Normalized',
            },
            {
                colorMap: 'color:leaf', height: 'buffer:Delta',
                colors: 'buffer:Epsilon',
            },
        ],
        emphasis: { outline: new Array<number>(), highlight: new Array<number>() },
        heightScale: 0.5,
    };
    visualization.configuration = config;

    visualization.skipLeafLabeling = true;
    visualization.renderer.skipLeafLabelPass = true;
  }

  function loadConfig() {
    //if (config && visualization && canvas) {
      visualization.configuration = config;
      console.log("Visualization:", visualization);
      console.log("Config:", visualization.configuration);
      console.log("Canvas:", canvas);

      
      canvas.controller.update();
    //}
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
      <canvas id="canvasElement" width="300" height="150"></canvas>
    </div>
  );
}
