import { FileMetrics, FileTree, Metrics, TreeNode } from "@analytics/types";
import { Configuration, NodeSort, Visualization } from "treemaps";

interface ValueMapping {
  weights: keyof Metrics;
  heights: keyof Metrics;
  colors: keyof Metrics;
}

export function createFileTree(rows: FileMetrics[]): FileTree {
  const fileTree = {
    name: "root",
    children: [],
  } as TreeNode;
  rows.forEach((row) => {
    const filenames = row.filename.split("/");
    filenames.reduce((r, name) => {
      if (!r.children.find((c) => c.name === name)) {
        const child = {
          name,
          children: [],
        } as TreeNode;
        if (name === filenames[filenames.length - 1]) {
          child.metrics = row;
        }
        r.children.push(child);
      }
      return r.children.find((c) => c.name === name)!;
    }, fileTree);
  });

  console.log(fileTree);
  return { root: fileTree };
}

export function configFromFileTree(
  fileTree: FileTree,
  valueMapping: ValueMapping = {
    weights: "loc",
    heights: "loc",
    colors: "loc",
  }
): Configuration {
  const config = new Configuration();

  const root = fileTree.root;
  const edges: [number, number][] = [];
  const names = new Map<number, string>();

  const weights: number[] = [];
  const heights: number[] = [];
  const colors: number[] = [];

  names.set(0, root.name);
  weights.push(1);
  heights.push(1);
  colors.push(1);

  function buildEdges(node: TreeNode, parent = 0) {
    const index = edges.length;
    names.set(index, node.name);
    edges.push([parent, index]);
    node.children.forEach((child) => {
      if (child) {
        buildEdges(child, index);
        if (child.metrics) {
          weights.push(child.metrics[valueMapping.weights]);
          heights.push(child.metrics[valueMapping.heights]);
          colors.push(child.metrics[valueMapping.colors]);
        } else {
          weights.push(0);
          heights.push(0);
          colors.push(0);
        }
      }
    });
  }
  buildEdges(root, 0);

  console.log(names);
  console.log("weights", weights);
  console.log("heights", heights);
  console.log("colors", colors);

  config.colors = [
    { identifier: "emphasis", space: "hex", value: "#00b0ff" },
    { identifier: "auxiliary", space: "hex", values: ["#00aa5e", "#71237c"] },
    { identifier: "inner", space: "hex", values: ["#e8eaee", "#eef0f4"] },
    {
      identifier: "leaf",
      space: "hex",
      values: [
        "#4575b4",
        "#91bfdb",
        "#e0f3f8",
        "#ffffbf",
        "#fee090",
        "#fc8d59",
        "#d73027",
      ],
    },
    // { identifier: 'leaf', space: 'hex', values: ['#ffffff', '#5392ff', '#71cddd', '#34bc6e',
    //      '#95d13c', '#db7c00', '#ffb000', '#ff509e', '#9b82f3'] },
  ];

  config.layout = {
    algorithm: "snake",
    weight: "bufferView:weights",
    sort: {
      key: "bufferView:weights",
      algorithm: NodeSort.Algorithm.Keep,
    },
    parentPadding: { type: "relative", value: 0.05 },
    siblingMargin: { type: "relative", value: 0.05 },
    accessoryPadding: {
      type: "absolute",
      direction: "bottom",
      value: [0.0, 0.02, 0.01, 0.0],
      relativeAreaThreshold: 0.4,
      targetAspectRatio: 8.0,
    },
  };

  config.geometry = {
    parentLayer: { showRoot: true },
    leafLayers: [
      {
        colorMap: "color:leaf",
        height: "bufferView:heights-normalized",
        colors: "bufferView:colors-normalized",
      },
    ],
    emphasis: { outline: new Array<number>(), highlight: new Array<number>() },
    heightScale: 0.5,
  };

  config.labels = {
    innerNodeLayerRange: [0, 2],
    numTopInnerNodes: 4,
    numTopWeightNodes: 4,
    numTopHeightNodes: 4,
    numTopColorNodes: 4,
  };

  config.labels.callback = (
    idsToLabel: Set<number>,
    callback: Visualization.NameSetCallback
  ) => callback(names);

  config!.altered!.alter("labels");

  config.topology = {
    edges,
    format: "tupled",
  };

  config.buffers = [
    {
      identifier: "source-weights",
      type: "numbers",
      data: weights,
      linearization: "topology",
    },
    {
      identifier: "source-heights",
      type: "numbers",
      data: heights,
      linearization: "topology",
    },
    {
      identifier: "source-colors",
      type: "numbers",
      data: colors,
      linearization: "topology",
    },
  ];

  config.bufferViews = [
    {
      identifier: "weights",
      source: "buffer:source-weights",
      transformations: [
        { type: "fill-invalid", value: 0.0, invalidValue: -1.0 },
        { type: "propagate-up", operation: "sum" },
      ],
    },
    {
      identifier: "heights-normalized",
      source: "buffer:source-heights",
      transformations: [
        { type: "fill-invalid", value: 0.0, invalidValue: -1.0 },
        { type: "normalize", operation: "zero-to-max" },
      ],
    },
    {
      identifier: "colors-normalized",
      source: "buffer:source-colors",
      transformations: [
        { type: "fill-invalid", value: 0.0, invalidValue: -1.0 },
        { type: "normalize", operation: "zero-to-max" },
      ],
    },
  ];

  console.log("Config", JSON.stringify(config, null, 2));
  return config;
}
