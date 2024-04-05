import {useEffect, useState} from 'react'
import { NetworkDiagram } from './NetworkDiagram';
import { data } from './data';
import useAuth from '../../hooks/useAuth';
import { createGame, validate, fetchGame2 } from '../../api/game2';

const Game2 = () => {
    const { user, token } = useAuth();
    const [tree, setTree] = useState(data);

    useEffect(() => {
        fetchGame2(token.access, user.phone_number)
            .then((data) => {
                console.log('tree', tree);
                console.log('data', data);
                setTree(data); // Update the state with fetched data
            });
    }, []); // Add dependencies for useEffect

    return (
        <div>
            <NetworkDiagram data={tree} width={800} height={800} />
        </div>
    );
}

export default Game2;