import '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ModalGame from '.';
import GameProvider from '../../contexts/gameContext';

const setActive = jest.fn();
const startGame = jest.fn();
const restart = jest.fn();

const renderComponent = ()=> {
    return render(
        <GameProvider value={{setActive, startGame, restart}}>
            <ModalGame />
        </GameProvider>
    )
}

describe('ModalGame', () => {
  it('should render the texts', () => {
    render(<ModalGame />)
    
    expect(screen.getByText('Guess the color')).toBeInTheDocument();
    expect(screen.getByText('Remaning Time (s)')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('High Score')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset all data')).toBeInTheDocument();
  });

  it('should render the button with the text "Start"', () => {
    render(<ModalGame />)

    const startButton = screen.getByRole('button', { name: /start/i});
    expect(startButton).toBeInTheDocument()
  });

  it('should call function on button click', () => {

    renderComponent()
  
    const startButton = screen.getByText('Start');
    expect(startButton).toBeInTheDocument();
  
    fireEvent.click(startButton);

    console.log(startGame)
  
    expect(startGame).toHaveBeenCalledTimes(1)
    });
})
