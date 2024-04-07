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
  colorCode,
  edgeValidity
}) => {
  // The force simulation mutates links and nodes, so create a copy first
  // Node positions are initialized by d3
  // console.log('network',data.nodes);
  const links = data.links.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({ ...d }));
  let X = 0;
  let Y = 0;
  const canvasRef = useRef(null);
  const fakeInput = useRef(null);
  //const colorCode = useRef('0000000');


  function handleNodeClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    X = mouseX;
    Y = mouseY;
    console.log(X, Y);
    nodes.forEach((node) => {;
      const dx = X - node.x;
      const dy = Y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= RADIUS) {
        node.group = "main";
      }
      else{
        node.group = "team4";
      }
    })
    drawNetwork(canvas.getContext('2d'), width, height, nodes, links, colorCode, edgeValidity);
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
        node.group = "main";
        // let newValue = node.value === '0' ? "" : fakeInput.current.value;
        // const keyPressed = event.key;
        // if (event.key === '0' || event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9') {
        //   newValue += keyPressed;
        //   if (newValue > 13) {
        //     toast("Values greater than 13 are NOT allowed !!");
        //   } else if (newValue % 2 === 0 && newValue !== '0' && newValue !== '') {
        //     console.log(newValue);
        //     toast("Even values are NOT allowed !!");
        //   } else {
        //     node.value = newValue.trim();
        //     for (let i = 0; i < 7; i++) {
        //       data.nodes[i] = nodes[i];
        //     }
        //     drawNetwork(ctx, width, height, nodes, links,colorCode, edgeValidity);
        //   }
        // }
        let newValue = fakeInput.current.value;
        newValue = newValue.trim();
        newValue = newValue === '' ? "0" : newValue;
        if (isNaN(newValue)){
          toast("Only numbers are allowed !!");
          newValue = newValue.replace(newValue.substring(newValue.length-1), "");
          fakeInput.current.value = newValue;
          return;
        }
        if (newValue > 13) {
          toast("Values greater than 13 are NOT allowed !!");
          newValue = newValue.replace(newValue.substring(newValue.length-1), "");
          console.log(newValue);
          fakeInput.current.value = newValue;
        } else if (newValue % 2 === 0 && newValue !== '0' && newValue !== '') {
          toast("Even values are NOT allowed !!");
          newValue = newValue.replace(newValue.substring(newValue.length-1), "");
          fakeInput.current.value = newValue;
        } else if(newValue !== "") {
          node.value = newValue;
          for (let i = 0; i < 7; i++) {
            data.nodes[i] = nodes[i];
          }
        }
        
      }
      else{
        node.group = "team4";
      }
      drawNetwork(ctx, width, height, nodes, links, colorCode, edgeValidity);
    });
  }



  const handleCanvasClick = (event) => {
    handleNodeClick(event);
    fakeInput.current.focus();
    fakeInput.current.value = '';
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
        d3.forceLink(links).id((d) => d.id).distance(80),
      )
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))

      // at each iteration of the simulation, draw the network diagram with the new node positions
      .on('tick', () => {
        drawNetwork(context, width, height, nodes, links, colorCode, edgeValidity);
      });
  }, [width, height, nodes, links]);

  return (
    <div>
      <input ref={fakeInput} style={{"outline":"none", "border":"none", "width":"1vw","color":"white","height":"1vh"}} inputMode="numeric" id="input" className='fake' onChange={handleKeyDown} />
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        tabIndex={0}
      />
      <ToastContainer position="top-center"/>
    </div>
  );
};
