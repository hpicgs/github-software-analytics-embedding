import { MetricsNode } from "@analytics/types";
import { Configuration } from "treemaps";

export function configFromMetricsJSON(json: string): Configuration {
  //Todo: parse json into MetricsNode
  console.log("JSON", json);
  const metricsNode: MetricsNode = JSON.parse(json);
  console.log("MetricsNode", JSON.stringify(metricsNode, null, 2));

  return new Configuration();
}
