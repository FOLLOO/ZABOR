import React, { useState } from 'react';
import ChildBlock from './ChildBlock';

const Form = () => {
  const [childBlocks, setChildBlocks] = useState([{ id: 1, blockType: 'text', content: '' }]);

  const addChildBlock = () => {
    setChildBlocks([
      ...childBlocks,
      { id: childBlocks.length + 1, blockType: 'text', content: '' },
    ]);
  };

  const updateChildBlock = (childBlockId, updates) => {
    setChildBlocks(
      childBlocks.map((childBlock) =>
        childBlock.id === childBlockId ? { ...childBlock, ...updates } : childBlock
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Отправка childBlocks на сервер
    console.log(childBlocks);
  };

  return (
    <form onSubmit={handleSubmit}>
      {childBlocks.map((childBlock) => (
        <ChildBlock
          key={childBlock.id}
          id={childBlock.id}
          blockType={childBlock.blockType}
          content={childBlock.content}
          onUpdate={updateChildBlock}
        />
      ))}
      <button type="button" onClick={addChildBlock}>
        Add Child Block
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
