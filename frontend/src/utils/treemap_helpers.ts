import { DirectoryNode, MetricsNode, NodeType } from "@analytics/types";
import { Configuration } from "treemaps";

export function configFromMetricsJSON(metricsTree: MetricsNode): Configuration {
  const config = new Configuration();

  const tree = metricsTree as DirectoryNode;
  const edges: [number, number][] = [];

  function buildEdges(node: MetricsNode, parent = 0) {
    const index = edges.length;
    edges.push([parent, index]);
    if (node.type === NodeType.DIRECTORY) {
      const directory = node as DirectoryNode;
      directory.children.forEach((child) => {
        if (child) {
          buildEdges(child, index);
        }
      });
    }
  }

  buildEdges(tree, 0);

  config.topology = {
    edges,
    format: "tupled",
  };

  config.buffers = [
    {
      identifier: "Alpha",
      type: "uint8",
      data: new Uint8Array([
        0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      ]),
    },
    { identifier: "Beta", type: "uint8", data: new Uint8Array(21) },
    {
      identifier: "Gamma",
      type: "uint8",
      data: new Uint8Array([
        0, 0, 1, 2, 3, 4, 0, 5, 6, 7, 8, 0, 0, 9, 10, 11, 12, 13, 14, 15, 16,
      ]),
    },
    { identifier: "Delta", type: "float32", data: new Float32Array(21) },
    { identifier: "Epsilon", type: "uint8", data: new Uint8Array(21) },
  ];

  config.bufferViews = [
    {
      identifier: "Weight",
      source: "buffer:Alpha",
      transformations: [{ type: "propagate-up", operation: "sum" }],
    },
    {
      identifier: "Beta-Transformed",
      source: "buffer:Beta",
      transformations: [
        {
          type: "range-transform",
          sourceRange: [0.0, 64.0],
          targetRange: [0.0, 0.75],
        },
      ],
    },
    {
      identifier: "Gamma-Normalized",
      source: "buffer:Gamma",
      transformations: [{ type: "normalize", operation: "min-to-max" }],
    },
  ];

  config.colors = [
    { identifier: "emphasis", space: "hex", value: "#00b0ff" },
    { identifier: "auxiliary", space: "hex", values: ["#00aa5e", "#71237c"] },
    { identifier: "inner", space: "hex", values: ["#e8eaee", "#eef0f4"] },
    {
      identifier: "leaf",
      space: "hex",
      values: ["#ffffff", "#fed500", "#fe8500", "#e62325"],
    },
    // { identifier: 'leaf', space: 'hex', values: ['#ffffff', '#5392ff', '#71cddd', '#34bc6e',
    // '#95d13c', '#db7c00', '#ffb000', '#ff509e', '#9b82f3'] },
  ];

  config.layout = {
    algorithm: "snake",
    weight: "bufferView:Weight",
    parentPadding: { type: "absolute", value: 0.02 },
    siblingMargin: { type: "relative", value: 0.2 },
    accessoryPadding: {
      type: "absolute",
      direction: "bottom",
      value: [0.0, 0.04, 0.03],
      relativeAreaThreshold: 0.4,
      targetAspectRatio: 2.0,
    },
    cascade: false,
  };

  config.labels = { innerNodeLayerRange: [1, 3], numTopInnerNodes: 4 };

  config.geometry = {
    parentLayer: { showRoot: false },
    leafLayers: [
      {
        colorMap: "color:leaf",
        height: "bufferView:Beta-Transformed",
        colors: "bufferView:Gamma-Normalized",
      },
      {
        colorMap: "color:leaf",
        height: "buffer:Delta",
        colors: "buffer:Epsilon",
      },
    ],
    emphasis: { outline: new Array<number>(), highlight: new Array<number>() },
    heightScale: 0.5,
  };

  console.log("Config", JSON.stringify(config, null, 2));
  return config;
}
