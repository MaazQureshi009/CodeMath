import { useNavigate  , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
import Axios from 'axios';
import NavBar from './navbar';

function Display(){

    const delete_product = (id) => {
        Axios.post('http://localhost:3001/DeleteProduct' , {id : id});
        alert("Product Deleted")
    };

    const [ Products , setProducts ] = useState([]);

    useEffect( () => {
        Axios.get('http://localhost:3001/getAllFeaturedProducts').then((response) => {
            setProducts(response.data);
        });
    } , [] );

    const Navigate = useNavigate();
    const Location = useLocation();

    return(
        <div>
            <h1>Display</h1>
            {
                (Location.state === null)?
                <div><p>Not Logged</p></div>:
                <>
                    <NavBar />
                    <div><p>Logged By : {Location.state.type}</p></div>
                </>
            }
            <p>{Math.floor((Math.random()*9999)+1000)}</p>
            <button onClick={() =>{Navigate("/products");}}>AddProduct</button>
            <button onClick={() =>{Navigate("/Login");}}>AddUsers</button>
            <button onClick={() =>{Navigate("/addWorkshops");}}>AddWorkshops</button>
            <br/>
            {Products.map((key) => {
                return(
                    <div>
                        <hr/>
                        <img src={key.image} alt={key.name}></img>
                        <h1>ID : {key._id}</h1>
                        <h1>Name : {key.name}</h1>
                        <h2>Description : {key.description}</h2>
                        <h1>NewPrice : {key.newprice}</h1>
                        <h1>OldPrice : {key.oldprice}</h1>
                        <h1>Topic : {key.category}</h1>
                        <h1>Duration : {key.tags}</h1>
                        <h1>DISCOUNT : {parseInt(((key.oldprice - key.newprice)/key.oldprice)*100)}%</h1>
                        <h1>Visibility : {key.status}</h1>
                        <button onClick={() => {delete_product(key._id)}}>DELETE</button>
                        <button onClick={() => {
                            Axios.post("http://localhost:3001/getProducts",{id : key._id}); 
                            Navigate('/editProducts' , {state:{id : key._id , name: key.name , description : key.description , newprice : key.newprice , oldprice : key.oldprice , category : key.category , tags : key.tags , status : key.status}} )}}>EDIT</button>
                    </div>
                );
            }
            )
        }
        </div>
    );
};

export default Display;