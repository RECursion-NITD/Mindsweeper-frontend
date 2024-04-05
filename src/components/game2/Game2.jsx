import {useEffect, useState} from 'react'
import { NetworkDiagram } from './NetworkDiagram';
//import { data } from './data';
import useAuth from '../../hooks/useAuth';
import { createGame, validate, fetchGame2 } from '../../api/game2';

const Game2 = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState({
        "nodes": [
            {
                "id": "1",
                "group": "team1",
                "value": "0"
            },
            {
                "id": "2",
                "group": "team2",
                "value": "0"
            },
            {
                "id": "3",
                "group": "team3",
                "value": "0"
            },
            {
                "id": "4",
                "group": "team4",
                "value": "0"
            },
            {
                "id": "5",
                "group": "team4",
                "value": "0"
            },
            {
                "id": "6",
                "group": "team4",
                "value": "0"
            },
            {
                "id": "7",
                "group": "team4",
                "value": "0"
            }
        ],
        "links": [
            {
                "source": 1,
                "target": 4,
                "value": "1"
            },
            {
                "source": 4,
                "target": 5,
                "value": "1"
            },
            {
                "source": 5,
                "target": 2,
                "value": "1"
            },
            {
                "source": 2,
                "target": 6,
                "value": "1"
            },
            {
                "source": 6,
                "target": 3,
                "value": "1"
            },
            {
                "source": 3,
                "target": 7,
                "value": "1"
            }
        ]
    });

    useEffect(() => {
        fetchGame2(token.access, user.phone_number)
            .then((tree) => {
                console.log('tree', tree);
                setData(tree); // Update the state with fetched data
                console.log('data', data); // This might not show the updated data immediately due to closure
            });
    }, [token.access, user.phone_number]); // Add dependencies for useEffect

    return (
        <div>
            <NetworkDiagram data={data} width={800} height={800} />
        </div>
    );
}

export default Game2;