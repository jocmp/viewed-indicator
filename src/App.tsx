import React from 'react';
import './styles/App.scss';
import { GridLayout } from './components/GridLayout';
import { clearAllViews } from './artworkVisitStorage';

export default function App() {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    clearAllViews();
  }

  return (
    <div className="main">
      <GridLayout />
      <button
        type="button"
        onClick={onClick}
      >
        Clear Views
      </button>
    </div>
  );
}
