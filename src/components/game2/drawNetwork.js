import { color } from "d3";

export const RADIUS = 30;

export const drawNetwork = (
  context,width,height,nodes,links,colorCode
) => {
  context.clearRect(0, 0, width, height);
  let colors = ['green','red']

  // Draw the links first
  links.forEach((link) => {
    context.beginPath();
    context.moveTo(link.source.x, link.source.y);
    context.lineTo(link.target.x, link.target.y);
    context.stroke();
  });

  // Draw the nodes
  nodes.forEach((node,key) => {
    if (!node.x || !node.y) {
      return;
    }

    context.beginPath();
    context.moveTo(node.x + RADIUS, node.y);
    context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
    context.fillStyle = colors[colorCode[key]]//'#cb1dd1';
    context.fill();
    context.lineWidth = 5;
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    // Write text inside the circle
    var text = node.value;
    context.font = '20px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, node.x, node.y);
  });
};
