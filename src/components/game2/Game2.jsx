import { useEffect, useState } from 'react'
import { NetworkDiagram } from './NetworkDiagram';
import { data } from './data';
import useAuth from '../../hooks/useAuth';
import { createGame, validate, fetchGame2 } from '../../api/game2';
import { ToastContainer, toast } from 'react-toastify';
import './Game2.css'

const Game2 = () => {
    const { user, token } = useAuth();
    const [tree, setTree] = useState(data);
    const [colorCode,setColorCode] = useState('1111111');

    function handleReset(event) {
        createGame(token.access, user.phone_number)
            .then((data) => {
                setTree(data);
                setColorCode('1111111')
            })
    }

    function handleSubmit(event) {
        console.log('data', tree)
        validate(tree, user.phone_number, token.access)
            .then((data) => {
                const validity = data.Valid.join("")
                console.log(validity);
                if(validity === '0000000'){
                    toast("YOU WON!!");
                }
                setColorCode(validity);
            })
    }

    useEffect(() => {
        fetchGame2(token.access, user.phone_number)
            .then((data) => {
                // console.log('tree', tree);
                // console.log('data', data);
                setTree(data); // Update the state with fetched data
            });
    }, []); // Add dependencies for useEffect

    return (
        <div>
            <ToastContainer/>
            <NetworkDiagram data={tree} width={800} height={800} colorCode={colorCode} />
            <div className="btns">
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Game2;