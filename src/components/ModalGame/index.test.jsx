import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ModalGame from '.';

describe('ModalGame', () => {
  it('deve renderizar corretamente', () => {
    render(<ModalGame />);
    
    expect(screen.getByText('Guess the color')).toBeInTheDocument();
    expect(screen.getByText('Remaning Time (s)')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('High Score')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset all data')).toBeInTheDocument();
  });

  it('should render the button with the text "Start"', () => {
  render(<ModalGame text='Start' />);

  const startButton = screen.getByRole('button', { name: /start/i});
  expect(startButton).toBeInTheDocument()
  });

  it('Clique no botão "Start" inicia o jogo', () => {
    const fn = jest.fn()
    render(<ModalGame text='Start' onClick={fn} />);
  
    const startButton = screen.getByRole('button', { name: /start/i});
    fireEvent.click(startButton)
    });
})
