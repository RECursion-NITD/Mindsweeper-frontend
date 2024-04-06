import { useEffect, useState } from 'react'
import { NetworkDiagram } from './NetworkDiagram';
import { data } from './data';
import useAuth from '../../hooks/useAuth';
import { createGame, validate, fetchGame2 } from '../../api/game2';
import { ToastContainer, toast } from 'react-toastify';
import Alert from '../alert/Alert';
import Alert2 from '../alert/Alert2';
import './game2.css'
import 'react-toastify/dist/ReactToastify.css';

const Game2 = () => {
    const { user, token } = useAuth();
    const [tree, setTree] = useState(data);
    const [colorCode,setColorCode] = useState('0000000');
    const [edgeValidity, setEdgeValidity] = useState(Array(tree.links.length).fill('0'));
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    function handleReset(event) {
        createGame(token.access, user.phone_number)
            .then((data) => {
                if(data.message === "Done"){
                    setColorCode('0000000')
                    fetchGame2(token.access, user.phone_number)
                    .then((data) => {
                        setTree(data); // Update the state with fetched data
                        setColorCode('0000000')
                        setEdgeValidity(Array(data.links.length).fill('0'));
                    });
                }
                else{
                    setShowAlert(true);
                    setMessage(data.message)
                }
            })
    }

    function handleSubmit(event) {
        console.log('data', tree)
        validate(tree, user.phone_number, token.access)
            .then((data) => {
                console.log(data.verdict);
                const validity = data.validate.join("")
                setColorCode(validity);
                setEdgeValidity(data.edgeValidate);
                if(data.verdict === 1){
                    setGameOver(true);
                    setMessage('Correct Answer');
                }
            })
        
    }

    useEffect(() => {
        fetchGame2(token.access, user.phone_number)
            .then((data) => {
                setTree(data); // Update the state with fetched data
            });
    }, [colorCode]); // Add dependencies for useEffect

    return (
        <div className='container'>
            <NetworkDiagram data={tree} width={800} height={800} colorCode={colorCode} edgeValidity={edgeValidity}/>
            <div className='btn-container'> 
                <button className='btn' onClick={handleReset}>Reset</button>
                <button className='btn' onClick={handleSubmit}>Submit</button>
            </div>
            {gameOver && <Alert heading={message} points={5} setGameOver={setGameOver}/>}
            {showAlert && <Alert2 heading={message} points={0} setGameOver={setShowAlert}/>}
            <ToastContainer />
        </div>
    );
}

export default Game2;