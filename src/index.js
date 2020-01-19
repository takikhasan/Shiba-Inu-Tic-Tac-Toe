import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Logo extends React.Component {
    render() {
        const nbsp = '\u00A0';
        const pawClass = "fas fa-paw pawClass";
        return (
            <div className="logo-wrapper">
                <div className="logo">
                    <span className="hvr">
                        <i className={pawClass}></i>
                        {nbsp} Shiba-Inu Tic-Tac-Toe
                    </span>               
                </div>
            </div>
        );
    }
}

class Square extends React.Component {
    render() {
        let classNames = 'single-square' + (this.props.right ? ' right-border' : '') + 
                         (this.props.bottom ? ' bottom-border' : '');
        if (this.props.value === 'hint_X' || this.props.value === 'hint_O') {
            classNames = classNames + ' single-square-hint';
        }
        let value = this.props.value;
        if (value === 'hint_X')
            value = null;
        else if (value === 'hint_O')
            value = null;
        return (
            <button className={classNames} onClick={this.props.onClick} id={this.props.id}>
                {value}
            </button>
        );
    }
}

class Game extends React.Component {
    renderSquare(right, bottom, i) {
        return (
            <Square 
                right={right} 
                bottom={bottom} 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                id={i}
            />
        );
    }
    render() {
        return (
            <div className='game'>
                <div className='row'>
                    {this.renderSquare(true, true, 0)}
                    {this.renderSquare(true, true, 1)}
                    {this.renderSquare(false, true, 2)}
                </div>
                <div className='row'>
                    {this.renderSquare(true, true, 3)}
                    {this.renderSquare(true, true, 4)}
                    {this.renderSquare(false, true, 5)}
                </div>
                <div className='row'>
                    {this.renderSquare(true, false, 6)}
                    {this.renderSquare(true, false, 7)}
                    {this.renderSquare(false, false, 8)}
                </div>
            </div>
        );
    }
}

class Hint extends React.Component {
    render() {
        const nbsp = '\u00A0';
        const classStr = 'board-btn-container pd_top_twenty';
        return (
            <div className="hint">
                <div className={classStr}>
                    <button className="board-btn" onClick={this.props.onHint}>
                        <i className="far fa-lightbulb"></i>{nbsp} Show Hint
                    </button>
                </div>
            </div>
        );
    }
}

class Pause extends React.Component {
    render() {
        const nbsp = '\u00A0';
        return (
            <div className="pause">
                <div className="board-btn-container">
                    <button className="board-btn" onClick={this.props.onClick}>
                        {!this.props.paused ?
                            <React.Fragment>
                                {<i className="fas fa-pause"></i>}
                                {nbsp + ' Pause'}
                            </React.Fragment> :
                            <React.Fragment>
                                {<i className="fas fa-play"></i>}
                                {nbsp + ' Start'}
                            </React.Fragment> 
                        }
                    </button>
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    render() {
        const classNames = 'board';
        return (
            <div className={classNames}>
                <Logo/>
                <Game
                    squares={this.props.squares}
                    onClick={this.props.onClick}    
                />
                <Hint onHint={this.props.onHint} />
                <Pause paused={this.props.paused} onClick={this.props.paused ? this.props.unpauseGame : this.props.pauseGame}/>
            </div>
        );
    }
}

class Navigation extends React.Component {
    render() {
        const playerClass = 'btn' + (this.props.playerPanel ? ' active' : '');
        const historyClass = 'btn' + (this.props.playerPanel ? '' : ' active');
        return (
            <div className="menu-wrapper">
                <div className="menu">
                    <button className={playerClass} onClick={this.props.togglePanel}>Players</button><button className={historyClass} onClick={this.props.togglePanel}>History</button>
                </div>
            </div>
        );
    }
}

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.editName = this.editName.bind(this);
    }

    componentDidMount() {
        const middle = document.getElementById('middle' + this.props.number);
        if (middle) middle.addEventListener('click', () => {
            if (this.props.ai) {
                this.props.toggleLevel();
            }
            else {
                if (!this.props.editing_name) {
                    this.props.toggleEdit();
                }
            }
        });

        const third = document.getElementById('third' + this.props.number);
        if (third) third.addEventListener('click', () => {
            if (this.props.ai) {
                this.props.toggleAI();
            }
            else {
                if (this.props.editing_name) {
                    this.props.saveName();
                    this.props.toggleEdit();
                }
                else {
                    this.props.toggleAI();
                }
            }
        });
    }

    componentWillUnmount() {
        
    }

    editName(e) {
        this.props.editName(e.target.value);
    }

    render() {
        const nbsp = '\u00A0';
        const str1 = ' Player ' + this.props.number + (this.props.ai ? ' (AI)' : ' (Human)') + ' :' + nbsp + (this.props.number === 1 ? 'X' : 'O');
        let str2_ai =  'Unbeatable Mode ' + nbsp + nbsp;
        str2_ai = <React.Fragment>
            {str2_ai} 
            {this.props.unbeatable ? <i className="fas fa-check-circle"></i> : <i className="far fa-circle"></i>}
        </React.Fragment>
        const name = this.props.name;
        const editing = <input type="text" spellCheck="false" value={name} onChange={this.editName}/>;
        
        const icon_edit = <i className="fas fa-user-edit"></i>;
        const nameTag = '' + name + nbsp + nbsp + nbsp;
        const not_editing = <React.Fragment>{nameTag}{icon_edit}</React.Fragment>
        
        const str2_human = this.props.editing_name ? editing : not_editing;
        const str2 = this.props.ai ? str2_ai : str2_human;
        const save = <React.Fragment>{<i className="fas fa-check"></i>} Save</React.Fragment>;
        const str3 = this.props.ai ? ' Replace with Human ' : (this.props.editing_name ? save : ' Replace with AI ');

        const classWrapper = this.props.number === 1 ? 'player-wrapper pd_top_forty' : 'player-wrapper';
        const class1 = 'tab border-tab pd_bottom_two';
        const class2 = this.props.editing_name ? 'tab border-tab pd_bottom_two' : 'tab border-tab hover pd_bottom_two';
        const class3 = 'tab bottom-tab hover pd_bottom_two';

        return (
            <div className={classWrapper}>
                <div className="player">
                    <div className={class1}>{str1}</div>
                    <div className={class2} id={'middle'+this.props.number}>{str2}</div>
                    <div className={class3} id={'third'+this.props.number}>{str3}</div>
                </div>
            </div>
        );
    }
}

class History extends React.Component {
    render() {
        const size = this.props.history.length - 1;
        const moves = this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            const classNames = 'tab hover pd_bottom_two ' + (move === size ? 'bottom-tab' : 'border-tab');
            return (
                <div key={move} className={classNames} onClick={() => this.props.jumpTo(move)}>{desc}</div>
            );
        });
        return (
            <div className={size <= 8 ? 'pd_top_twenty' : 'pd_top_ten'}>
                <div className="history">
                    {moves}
                </div>
            </div>
        );
    }
}

class Options extends React.Component {
    // componentDidMount() {
    //     console.log('Options');
    //     console.log(this.props);
    // }
    render() {
        return (
            <div className='options'>
                <Navigation playerPanel={this.props.playerPanel} togglePanel={this.props.togglePanel} />
                {this.props.playerPanel ? 
                    <React.Fragment>
                        <Player
                            number={1} 
                            ai={this.props.player1_ai} 
                            unbeatable={this.props.player1_unbeatable} 
                            name={this.props.player1_name}
                            editing_name={this.props.player1_editing}    
                            toggleAI={this.props.togglePlayer1AI}
                            toggleLevel={this.props.toggleLevelPlayer1}
                            toggleEdit={this.props.toggleEditPlayer1}
                            editName={this.props.handleNameChange1}
                            saveName={this.props.savePlayer1Name}
                        />
                        <Player
                            number={2} 
                            ai={this.props.player2_ai} 
                            unbeatable={this.props.player2_unbeatable} 
                            name={this.props.player2_name}
                            editing_name={this.props.player2_editing}
                            toggleAI={this.props.togglePlayer2AI}
                            toggleLevel={this.props.toggleLevelPlayer2}
                            toggleEdit={this.props.toggleEditPlayer2}
                            editName={this.props.handleNameChange2}
                            saveName={this.props.savePlayer2Name}  
                        />
                    </React.Fragment>
                    :
                    <History
                        history={this.props.history}
                        jumpTo={this.props.jumpTo}
                    />
                }
            </div>
        );
    }
}

class GamePanel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            paused: true,
            player1_ai: false,
            player1_unbeatable: true,
            player1_name: 'Player One',
            player1_editing: false,
            player2_ai: false,
            player2_unbeatable: true,
            player2_name: 'Player Two',
            player2_editing: false,
            playerPanel: true,
            xIsNext: true,
            tempPaused: false,
        };
        this.togglePlayer1AI=this.togglePlayer1AI.bind(this);
        this.toggleLevelPlayer1=this.toggleLevelPlayer1.bind(this);
        this.toggleEditPlayer1=this.toggleEditPlayer1.bind(this);
        this.handleNameChange1=this.handleNameChange1.bind(this);
        this.savePlayer1Name=this.savePlayer1Name.bind(this);
        this.togglePlayer2AI=this.togglePlayer2AI.bind(this);
        this.toggleLevelPlayer2=this.toggleLevelPlayer2.bind(this);
        this.toggleEditPlayer2=this.toggleEditPlayer2.bind(this);
        this.handleNameChange2=this.handleNameChange2.bind(this);
        this.savePlayer2Name=this.savePlayer2Name.bind(this);

        this.handleClick=this.handleClick.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.unpauseGame = this.unpauseGame.bind(this);
        this.onHint = this.onHint.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    jumpTo(step) {
        this.setState ({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        }, () => {
            this.pauseGame();
        });
    }

    togglePanel() {
        this.setState((state) => {
            return {playerPanel: !state.playerPanel};
        });
    }

    autoMove() {
        if (this.state.xIsNext && this.state.player1_ai) {
            this.AIMove();
        }
        else if (!this.state.xIsNext && this.state.player2_ai) {
            this.AIMove();
        }
    }

    AIMove() {
        this.setState ({
            tempPaused: true,
        }, () => {
            setTimeout(() => {
                const bestMove = this.giveHint();
                this.setState ({
                    tempPaused: false,
                }, () => {
                    if (bestMove !== null) {
                        this.handleClick(bestMove);
                    }
                });
            }, 1000);
        });
    }

    onHint() {
        if (!this.state.tempPaused) {
            const current = this.state.history[this.state.stepNumber];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || !calcFreeSquares(squares))
                return;
            this.setState ({
                tempPaused: true,
            }, () => {
                const bestMove = findBestMove(squares, this.state.xIsNext, 100);
                const delay = 250;
                
                this.setState ((state) => {
                    state.history[state.stepNumber].squares[bestMove] = 'hint' + (this.state.xIsNext ? '_X' : '_O');
                    return {history : state.history};
                }, () => {
                    setTimeout(() => {
                        this.setState ((state) => {
                            state.history[state.stepNumber].squares[bestMove] = null;
                            return {history : state.history};
                        }, () => {
                            setTimeout(() => {
                                this.setState ((state) => {
                                    state.history[state.stepNumber].squares[bestMove] = 'hint' + (this.state.xIsNext ? '_X' : '_O');
                                    return {history : state.history};
                                }, () => {
                                    setTimeout(() => {
                                        this.setState ((state) => {
                                            state.history[state.stepNumber].squares[bestMove] = null;
                                            return {history : state.history};
                                        }, () => {
                                            setTimeout(() => {
                                                this.setState ((state) => {
                                                    state.history[state.stepNumber].squares[bestMove] = 'hint' + (this.state.xIsNext ? '_X' : '_O');
                                                    return {history : state.history};
                                                }, () => {
                                                    setTimeout(() => {
                                                        this.setState ((state) => {
                                                            state.history[state.stepNumber].squares[bestMove] = null;
                                                            return {history : state.history};
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.setState ({
                                                                    tempPaused: false,
                                                                });
                                                            }, delay);
                                                        });
                                                    }, delay);
                                                });
                                            }, delay);
                                        });
                                    }, delay);
                                });
                            }, delay);
                        });
                    }, delay);
                });
                
            });
        }
    }

    giveHint() {
        const current = this.state.history[this.state.stepNumber];
        const squares = current.squares.slice();
        const maxDepth = this.state.xIsNext ? (this.state.player1_unbeatable ? 100 : 3) : (this.state.player2_unbeatable ? 100 : 5);
        let bestMove = null;
        if (this.state.xIsNext && !this.state.stepNumber && !this.state.player1_unbeatable)
            bestMove = 7;
        else
            bestMove = findBestMove(squares, this.state.xIsNext, maxDepth);
        // console.log('Best Move: ', bestMove, maxDepth);
        return bestMove;
    }

    handleClick(i) {
        if (!this.state.paused && !this.state.tempPaused) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            }, () => {
                if (calculateWinner(squares) || !calcFreeSquares(squares)) {
                    this.pauseGame();
                } else {
                    this.autoMove();
                }
            });
        }
    }

    pauseGame() {
        this.setState({
            paused: true,
        })
    }

    unpauseGame() {
        if (!this.state.tempPaused) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || !calcFreeSquares(squares)) {
                this.setState({
                    paused: false,
                    xIsNext: true,
                    stepNumber: 0,
                    history: [{
                        squares: Array(9).fill(null),
                    }], 
                }, () => {
                    this.autoMove();
                });
            }
            else {
                this.setState({
                    paused: false,
                }, () => {
                    this.autoMove();
                });
            }
        }
    }

    togglePlayer1AI() {
        this.pauseGame();
        this.setState((state) => {
            return {player1_ai: !state.player1_ai,};
        });
    }

    toggleLevelPlayer1() {
        this.pauseGame();
        this.setState((state) => {
            return {player1_unbeatable: !state.player1_unbeatable,};
        });
    }

    toggleEditPlayer1() {
        this.setState((state) => {
            return {player1_editing: !state.player1_editing,};
        });
    }

    togglePlayer2AI() {
        this.pauseGame();
        this.setState((state) => {
            return {player2_ai: !state.player2_ai,};
        });
    }

    toggleLevelPlayer2() {
        this.pauseGame();
        this.setState((state) => {
            return {player2_unbeatable: !state.player2_unbeatable,};
        });
    }

    toggleEditPlayer2() {
        this.setState((state) => {
            return {player2_editing: !state.player2_editing,};
        });
    }

    savePlayer1Name() {
        this.setState((state) => {
            return {player1_name: state.player1_name === '' ? 'Player One' : state.player1_name};
        });
    }

    savePlayer2Name() {
        this.setState((state) => {
            return {player2_name: state.player2_name === '' ? 'Player Two' : state.player2_name};
        });
    }

    handleNameChange1(name) {
        this.setState({
            player1_name : name,
        });
    }

    handleNameChange2(name) {
        this.setState({
            player2_name : name,
        });
    }

    render() {
        const classNames = 'game-panel';
        const current = this.state.history[this.state.stepNumber];
        const squares = current.squares.slice();
        return (
            <div className={classNames}>
                <Board
                    squares={squares}
                    onClick={this.handleClick}
                    paused={this.state.paused}
                    pauseGame={this.pauseGame}
                    unpauseGame={this.unpauseGame}
                    onHint={this.onHint}
                />
                <Options
                    playerPanel={this.state.playerPanel}
                    togglePanel={this.togglePanel}
                    history={this.state.history}
                    jumpTo={this.jumpTo}
                    
                    player1_ai={this.state.player1_ai}
                    player1_unbeatable={this.state.player1_unbeatable}
                    player1_name={this.state.player1_name}
                    player1_editing={this.state.player1_editing}
                    player2_ai={this.state.player2_ai}
                    player2_unbeatable={this.state.player2_unbeatable}
                    player2_name={this.state.player2_name}
                    player2_editing={this.state.player2_editing}
                    
                    togglePlayer1AI={this.togglePlayer1AI}
                    toggleLevelPlayer1={this.toggleLevelPlayer1}
                    toggleEditPlayer1={this.toggleEditPlayer1}
                    handleNameChange1={this.handleNameChange1}
                    savePlayer1Name={this.savePlayer1Name}
                    togglePlayer2AI={this.togglePlayer2AI}
                    toggleLevelPlayer2={this.toggleLevelPlayer2}
                    toggleEditPlayer2={this.toggleEditPlayer2}
                    handleNameChange2={this.handleNameChange2}
                    savePlayer2Name={this.savePlayer2Name}
                />
            </div>
        );
    }
}

class Page extends React.Component {
    render() {
        const classNames = 'background-checkers square';
        return (
            <React.Fragment>
                <div className={classNames}>
                    <div className="row">
                        <div className="tile-black"></div>
                        <div className="tile-white"></div>
                    </div>
                    <div className="row">    
                        <div className="tile-white"></div>
                        <div className="tile-black"></div>
                    </div>
                </div>
                <GamePanel/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calcFreeSquares(squares) {
    let freeSquares = 0;
    for (let i = 0; i < 9; i++) {
        if (squares[i] === null)
            freeSquares++;
    }
    return freeSquares;
}

function evaluate(squares, depth) {
    const winner = calculateWinner(squares);
    if (winner) {
        if (winner === 'X') return 10 - depth;
        else return -10 + depth;
    }
    else {
        return 0;
    }
}

function minimax(squares, depth, xIsNext, maxDepth) {
    const score = evaluate(squares, depth);
    if (score !== 0) return score;
    let best = xIsNext ? -1000 : 1000;
    let freeSquares = calcFreeSquares(squares);
    if (freeSquares === 0)
        return 0;
    if (xIsNext) {
        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) {
                if (depth < maxDepth) {
                    squares[i] = 'X';
                    best = Math.max(best, minimax(squares, depth + 1, !xIsNext, maxDepth));
                    squares[i] = null;
                }
            }
        }
    }
    else {
        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) {
                if (depth < maxDepth) {
                    squares[i] = 'O';
                    best = Math.min(best, minimax(squares, depth + 1, !xIsNext, maxDepth));
                    squares[i] = null;
                }
            }
        }
    }
    // console.log(squares, best, xIsNext);
    return best;
}

function findBestMove(squares, xIsNext, maxDepth) {
    // console.log('Called');
    let bestScore = xIsNext ? -1000 : 1000;
    let bestMove = null;
    if (xIsNext) {
        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) {
                squares[i] = 'X';
                const val = minimax(squares, 0, !xIsNext, maxDepth);
                squares[i] = null;
                // console.log(val, i);
                if (val >= bestScore) {
                    bestScore = val;
                    bestMove = i;
                }
            }
        }
    }
    else {
        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) {
                squares[i] = 'O';
                const val = minimax(squares, 0, !xIsNext, maxDepth);
                // console.log(val, i);
                squares[i] = null;
                if (val <= bestScore) {
                    bestScore = val;
                    bestMove = i;
                }
            }
        }
    }

    const val = minimax(squares, 0, !xIsNext, 100);
    if (val === 9 && !xIsNext && maxDepth !== 100) {
        bestMove = findBestMove(squares, !xIsNext, 100);
        // console.log('Fix :', bestMove);
    }
    if (val === -9 && xIsNext && maxDepth !== 100) {
        bestMove = findBestMove(squares, !xIsNext, 100);
        // console.log('Fix :', bestMove);
    }

    return bestMove;
}
