import '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ModalGame, { startGame } from '.';
import GameProvider from '../../contexts/gameContext';

jest.mock('.');

const setActive = jest.fn();

const renderComponent = ()=> {
    return render(
        <GameProvider value={{setActive}}>
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
    //const startGame = jest.fn();
    //render(<ModalGame startGame={startGame}  />)
  
    const { getByText } = renderComponent(<ModalGame onClick={startGame} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const botao = getByText('Start'); // Encontre o botão pelo texto ou por algum outro seletor
    fireEvent.click(botao)

    console.log(startGame)
  
    expect(startGame).toHaveBeenCalled()
    });
})
