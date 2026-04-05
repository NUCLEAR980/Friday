import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Brain, Plus, Trash2, Download } from "lucide-react";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

export function MindMapTool() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", name: "Main Idea" }
  ]);
  const [links, setLinks] = useState<Link[]>([]);
  const [newNodeName, setNewNodeName] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#E7E5E4")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("rect")
      .attr("width", d => d.name.length * 10 + 40)
      .attr("height", 40)
      .attr("x", d => -(d.name.length * 10 + 40) / 2)
      .attr("y", -20)
      .attr("rx", 12)
      .attr("fill", "white")
      .attr("stroke", "#EA580C")
      .attr("stroke-width", 2);

    node.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#1C1917");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  const addNode = () => {
    if (!newNodeName.trim()) return;
    const id = Date.now().toString();
    const newNode = { id, name: newNodeName };
    setNodes([...nodes, newNode]);
    if (nodes.length > 0) {
      setLinks([...links, { source: nodes[0].id, target: id }]);
    }
    setNewNodeName("");
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex gap-3">
        <input 
          type="text"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="New idea..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-600/20"
        />
        <button onClick={addNode} className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Idea
        </button>
        <button onClick={() => { setNodes([{ id: "1", name: "Main Idea" }]); setLinks([]); }} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 bg-[#FAFAF9] rounded-3xl border border-gray-200 overflow-hidden relative">
        <svg ref={svgRef} className="w-full h-full cursor-move" />
        <div className="absolute bottom-4 right-4 text-[10px] uppercase font-bold opacity-30">Drag nodes to organize</div>
      </div>
    </div>
  );
}
