import React, { useEffect, useRef } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';

export interface CytoscapeCanvasProps {
  elements: {
    nodes: any[];
    edges: any[];
  };
  onSelectNode: (nodeData: any) => void;
  onSelectEdge: (edgeData: any) => void;
  highlightedNodeIds?: string[];
  highlightedEdgeIds?: string[];
  focusNodeId?: string | null;
  typeFilters?: Record<string, boolean>;
  dateWindowMax?: string;
}

export const CytoscapeCanvas: React.FC<CytoscapeCanvasProps> = ({
  elements,
  onSelectNode,
  onSelectEdge,
  highlightedNodeIds = [],
  highlightedEdgeIds = [],
  focusNodeId,
  typeFilters = {},
  dateWindowMax
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      boxSelectionEnabled: false,
      autounselectify: false,
      elements: {
        nodes: elements.nodes,
        edges: elements.edges
      },
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#E2E8F0',
            'font-family': 'Inter, system-ui, sans-serif',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-margin-y': 4,
            'text-background-color': '#0B0F19',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'background-color': '#1E293B',
            'border-width': 2,
            'border-color': '#475569',
            'width': 28,
            'height': 28,
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': 0.25
          }
        },
        {
          selector: 'node[type = "PERSON"]',
          style: {
            'background-color': '#0284C7',
            'border-color': '#38BDF8',
            'width': 30,
            'height': 30
          }
        },
        {
          selector: 'node[type = "PHONE"]',
          style: {
            'background-color': '#059669',
            'border-color': '#34D399',
            'shape': 'round-rectangle',
            'width': 26,
            'height': 26
          }
        },
        {
          selector: 'node[type = "VEHICLE"]',
          style: {
            'background-color': '#4F46E5',
            'border-color': '#818CF8',
            'shape': 'hexagon',
            'width': 28,
            'height': 28
          }
        },
        {
          selector: 'node[type = "LOCATION"]',
          style: {
            'background-color': '#7E22CE',
            'border-color': '#C084FC',
            'shape': 'diamond',
            'width': 32,
            'height': 32
          }
        },
        {
          selector: 'node[type = "CASE"]',
          style: {
            'background-color': '#C2410C',
            'border-color': '#FB923C',
            'shape': 'octagon',
            'width': 30,
            'height': 30
          }
        },
        {
          selector: 'node[type = "ACCOUNT"]',
          style: {
            'background-color': '#0891B2',
            'border-color': '#22D3EE',
            'shape': 'barrel',
            'width': 28,
            'height': 28
          }
        },
        {
          selector: '.highlighted-bridge-node',
          style: {
            'background-color': '#F59E0B',
            'border-color': '#FDE047',
            'border-width': 4,
            'width': 44,
            'height': 44,
            'font-size': '12px',
            'font-weight': 'bold',
            'color': '#FDE047',
            'z-index': 99
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38BDF8'
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#475569',
            'line-color': '#334155',
            'width': 1.8,
            'opacity': 0.7,
            'font-size': '8px',
            'font-family': 'monospace',
            'color': '#94A3B8',
            'text-rotation': 'autorotate',
            'text-margin-y': -6
          }
        },
        {
          selector: 'edge[relationship = "CALLS"]',
          style: {
            'line-color': '#0284C7',
            'target-arrow-color': '#0284C7',
            'width': 2.2
          }
        },
        {
          selector: 'edge[relationship = "OWNS"]',
          style: {
            'line-color': '#818CF8',
            'target-arrow-color': '#818CF8',
            'width': 2
          }
        },
        {
          selector: 'edge[relationship = "USES"]',
          style: {
            'line-color': '#34D399',
            'target-arrow-color': '#34D399',
            'width': 2
          }
        },
        {
          selector: 'edge[relationship = "VISITED"]',
          style: {
            'line-color': '#C084FC',
            'target-arrow-color': '#C084FC',
            'line-style': 'dashed',
            'width': 1.8
          }
        },
        {
          selector: '.highlighted-bridge-edge',
          style: {
            'line-color': '#F59E0B',
            'target-arrow-color': '#F59E0B',
            'width': 4.5,
            'opacity': 1,
            'z-index': 98,
            'line-style': 'solid'
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.15
          }
        },
        {
          selector: '.hidden',
          style: {
            'display': 'none'
          }
        }
      ],
      layout: {
        name: 'cose',
        idealEdgeLength: () => 70,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: () => 400000,
        edgeElasticity: () => 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      }
    });

    cy.on('tap', 'node', (evt: EventObject) => {
      onSelectNode(evt.target.data());
    });

    cy.on('tap', 'edge', (evt: EventObject) => {
      onSelectEdge(evt.target.data());
    });

    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        cy.elements().removeClass('dimmed');
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [elements]);

  // Handle Highlighting
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.elements().removeClass('highlighted-bridge-node highlighted-bridge-edge dimmed');

      if (highlightedNodeIds.length > 0 || highlightedEdgeIds.length > 0) {
        cy.elements().addClass('dimmed');

        highlightedNodeIds.forEach((id) => {
          const node = cy.$id(id);
          node.removeClass('dimmed').addClass('highlighted-bridge-node');
        });

        highlightedEdgeIds.forEach((id) => {
          const edge = cy.$id(id);
          edge.removeClass('dimmed').addClass('highlighted-bridge-edge');
        });
      }
    });
  }, [highlightedNodeIds, highlightedEdgeIds]);

  // Handle Focus
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !focusNodeId) return;

    const targetNode = cy.$id(focusNodeId);
    if (targetNode.length > 0) {
      cy.animate({
        center: { eles: targetNode },
        zoom: 1.6,
        duration: 500
      });
      targetNode.select();
      onSelectNode(targetNode.data());
    }
  }, [focusNodeId]);

  // Handle Type Filters
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.nodes().forEach((node) => {
        const type = node.data('type');
        if (typeFilters[type] === false) {
          node.addClass('hidden');
        } else {
          node.removeClass('hidden');
        }
      });
    });
  }, [typeFilters]);

  // Handle Timeline Date Window
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !dateWindowMax) return;

    const maxTs = new Date(dateWindowMax).getTime();

    cy.batch(() => {
      cy.edges().forEach((edge) => {
        const edgeTs = edge.data('timestamp');
        if (edgeTs) {
          const t = new Date(edgeTs).getTime();
          if (t > maxTs) {
            edge.addClass('hidden');
          } else {
            edge.removeClass('hidden');
          }
        }
      });
    });
  }, [dateWindowMax]);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full min-h-[460px]" />
    </div>
  );
};
