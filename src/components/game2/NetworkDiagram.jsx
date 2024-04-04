import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { RADIUS, drawNetwork } from './drawNetwork';
import { Data, Link, Node } from './data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NetworkDiagram = ({
  width,
  height,
  data,
}) => {
  // The force simulation mutates links and nodes, so create a copy first
  // Node positions are initialized by d3
  const links = data.links.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({ ...d }));
  let X = 0;
  let Y = 0;
  const canvasRef = useRef(null);
  const colorCode = useRef('0000000');


  function handleNodeClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    X = mouseX;
    Y = mouseY;
    console.log(X, Y);
  };

  function handleKeyDown(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(X, Y);

    nodes.forEach((node) => {
      const dx = X - node.x;
      const dy = Y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= RADIUS) {
        let newValue = node.value === '0' ? "" : node.value;
        const keyPressed = event.key;
        if (event.key === "Backspace") {
          newValue = newValue.slice(0, -1);
          if(newValue === ''){
            newValue = '0';
          }
          node.value = newValue.trim();
                for(let i=0;i<7;i++){
                    data.nodes[i]=nodes[i];
                }
                let newCode = '';
                for (let i = 0; i < 7; i++) {
                    newCode += Math.round(Math.random());
                }
                colorCode.current = newCode;
                console.log(colorCode);
                drawNetwork(ctx, width, height, nodes, links,colorCode.current);
        } else if (event.key === '0' || event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9') {
          newValue += keyPressed;
          if (newValue > 13) {
            toast("Values greater than 13 are NOT allowed !!");
          } else if (newValue % 2 === 0 && newValue !== '0' && newValue !== '') {
            console.log(newValue);
            toast("Even values are NOT allowed !!");
          } else {
            node.value = newValue.trim();
            for (let i = 0; i < 7; i++) {
              data.nodes[i] = nodes[i];
            }
            let newCode = '';
            for (let i = 0; i < 7; i++) {
                newCode += Math.round(Math.random());
            }
            colorCode.current = newCode;
            console.log(colorCode);
            drawNetwork(ctx, width, height, nodes, links,colorCode.current);
          }
        }

      }
    });
  }



  const handleCanvasClick = (event) => {
    handleNodeClick(event);
  };

  const handleCanvasKeyDown = (event) => {
    handleKeyDown(event);
  };


  useEffect(() => {
    // set dimension of the canvas element
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }


    // run d3-force to find the position of nodes on the canvas
    d3.forceSimulation(nodes)

      // list of forces we apply to get node positions
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id).distance(150),
      )
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody().strength(-480))
      .force('center', d3.forceCenter(width / 2, height / 2))

      // at each iteration of the simulation, draw the network diagram with the new node positions
      .on('tick', () => {
        drawNetwork(context, width, height, nodes, links, "0000000");
      });
  }, [width, height, nodes, links]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        onKeyDown={handleCanvasKeyDown}
        tabIndex={0}
      />
      <ToastContainer position="top-center"/>
    </div>
  );
};
