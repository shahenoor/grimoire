import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function JobCard(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      parent: props.parent,
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(5deg)`,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Optional: Adds shadow for better visual feedback
  } : undefined;

  return (
    <div ref={setNodeRef} style={{ ...style, margin: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0' }} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export default JobCard