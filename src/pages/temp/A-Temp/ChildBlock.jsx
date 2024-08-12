import React, { useState } from 'react';

const ChildBlock = ({ id, blockType, content, onUpdate }) => {
  const [type, setType] = useState(blockType);
  const [value, setValue] = useState(content);

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);
    onUpdate(id, { blockType: newType, content: value });
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setValue(newContent);
    onUpdate(id, { blockType: type, content: newContent });
  };

  return (
    <div>
      <h4>Child Block {id}</h4>
      <select value={type} onChange={handleTypeChange}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      {type === 'text' && (
        <textarea value={value} onChange={handleContentChange} />
      )}
      {type === 'image' && (
        <input type="file" value={value} onChange={handleContentChange} />
      )}
      {type === 'video' && (
        <input type="file" value={value} onChange={handleContentChange} />
      )}
    </div>
  );
};

export default ChildBlock;
