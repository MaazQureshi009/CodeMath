import { useNavigate } from 'react-router-dom';

function Display(){

    const Navigate = useNavigate();

    return(
        <div>
            <h1>Display</h1>
            <button onClick={() =>{Navigate("/products");}}>AddProduct</button>
            <button onClick={() =>{Navigate("/users");}}>AddUsers</button>
        </div>
    );
};

export default Display;