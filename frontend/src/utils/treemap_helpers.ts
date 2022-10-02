import {
  DirectoryNode,
  Metrics,
  MetricsNode,
  NodeType,
} from "@analytics/types";
import { keyframes } from "@emotion/react";
import { Configuration, NodeSort, Visualization } from "treemaps";
import MetricsTree from "./metricstree";

interface ValueMapping {
  weights: keyof Metrics;
  heights: keyof Metrics;
  colors: keyof Metrics;
}

export function configFromMetricsJSON(
  metricsTree: MetricsTree,
  valueMapping: ValueMapping = {
    weights: "loc",
    heights: "loc",
    colors: "loc",
  }
): Configuration {
  const config = new Configuration();

  const size = metricsTree.size;
  const root = metricsTree.root;
  const edges: [number, number][] = [];
  const names = new Map<number, string>();

  const weights: number[] = [];
  const heights: number[] = [];
  const colors: number[] = [];

  function buildEdges(node: MetricsNode, parent = 0) {
    const index = edges.length;
    names.set(index, node.name);
    edges.push([parent, index]);

    weights.push(
      node.metrics[valueMapping.weights] / root.metrics[valueMapping.weights]
    );
    heights.push(
      node.metrics[valueMapping.heights] / root.metrics[valueMapping.heights]
    );
    colors.push(
      node.metrics[valueMapping.colors] / root.metrics[valueMapping.colors]
    );

    if (node.type === NodeType.DIRECTORY) {
      const directory = node as DirectoryNode;
      directory.children.forEach((child) => {
        if (child) {
          buildEdges(child, index);
        }
      });
    }
  }

  names.set(0, root.name);
  weights.push(1);
  heights.push(1);
  colors.push(1);
  buildEdges(root, 0);

  console.log(names);
  console.log(weights);
  console.log(heights);
  console.log(colors);

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
