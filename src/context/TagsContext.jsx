import React, { createContext, useContext, useState } from 'react';

// Создаем контекст для управления тегами
const TagsContext = createContext();

// Обертка для управления состоянием тегов
export const TagsProvider = ({ children }) => {
  const [groupTags, setGroupTags] = useState([]);
  const [creativeTags, setCreativeTags] = useState([]);

  const addGroupTag = (tag) => {
    setGroupTags([...groupTags, tag]);
  };

  const addCreativeTag = (tag) => {
    setCreativeTags([...creativeTags, tag]);
  };

  // Можно добавить другие методы для удаления тегов, очистки и т.д.

  return (
    <TagsContext.Provider
      value={{ groupTags, creativeTags, addGroupTag, addCreativeTag }}>
      {children}
    </TagsContext.Provider>
  );
};

// Хук для использования контекста в компонентах
export const useTags = () => useContext(TagsContext);