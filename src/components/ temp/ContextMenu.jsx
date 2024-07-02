import React, { useState, useEffect, useRef } from 'react'

const ContextMenu = ({ x, y, onClose, onAction }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const style = {
    position: 'absolute',
    top: y,
    left: x,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    padding: 10
  };

  return (
    <div ref={menuRef} style={style}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li onClick={() => onAction('action1')}>Action 1</li>
        <li onClick={() => onAction('action2')}>Action 2</li>
        <li onClick={() => onAction('action3')}>Action 3</li>
      </ul>
    </div>
  );
};


export default ContextMenu;