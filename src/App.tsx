import React from 'react';
import './styles/App.scss';
import { GridLayout } from './components/GridLayout';
import { ArtworkVisitsProvider, useArtworkVisitContext } from './ArtworkVisitsProvider';

export default function App() {
  return (
    <div className="main">
      <ArtworkVisitsProvider>
        <GridLayout />
        <ClearButton />
      </ArtworkVisitsProvider>
    </div>
  );
}

function ClearButton() {
  const { clearAll } = useArtworkVisitContext();

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    clearAll();
  }

  return (
    <button
      type="button"
      onClick={onClick}
    >
      Clear Views
    </button>
  );
}
