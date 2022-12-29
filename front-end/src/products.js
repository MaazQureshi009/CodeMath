import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'

function Products(){

    const Navigate = useNavigate();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ Price , setPrice ] = useState(0);
    const [ Duration , setDuration ] = useState(0);
    const [ Discount , setDiscount ] = useState(null);
    const [ State , setState ] = useState(null);
    const [ Type , setType ] = useState(null);
    const [ Course , setCourse ] = useState(null);
    const [ Age , setAge ] = useState(null);
    const [ File , setFile ] = useState(null);

    //const fileref = ref(storage, "Files/");

    const upload = () => {
            if (File == null) return;
            const FileReference = ref(storage , `Product_DP/${File.name+Name}`);
            uploadBytes(FileReference , File).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    Axios.post("http://localhost:3001/addProduct" , 
                    {
                        image_url : url,
                        name : Name,
                        description : Description,
                        price : Price,
                        discount : Discount,
                        type : Type,
                        duration : Duration,
                        course : Course,
                        age : Age,
                        state : State,
                    });
                });
            });
            alert("Product Added");
        };

    return(
        <div>
            <h1>Products</h1>
            <form>
                <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/><br/>
                <input type="text" placeholder="Description" onChange={(e) => {setDescription(e.target.value)}}/><br/>
                <input type="text" placeholder="Price"onChange={(e) => {setPrice(e.target.value)}}/><br/>
                <input type="text" placeholder="Discount" onChange={(e) => {setDiscount(e.target.value)}}/><br/>
                <select onChange={(e) => {setType(e.target.value)}}>
                    <option value="null">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediated">Intermediated</option>
                    <option value="Advanced">Advanced</option>
                </select><br/>
                <select onChange={(e) => {setCourse(e.target.value)}}>
                    <option value="null">Select</option>
                    <option value="Web-dev">Web-Development</option>
                    <option value="App-dev">App-Development</option>
                    <option value="Game-dev">Game-Development</option>
                    <option value="Schooling">Schooling</option>
                </select><br/>
                <select onChange={(e) => {setAge(e.target.value)}}>
                    <option value="null">Select</option>
                    <option value="3+">3+</option>
                    <option value="10+">10+</option>
                    <option value="13+">13+</option>
                    <option value="all">All</option>
                </select><br/>
                <input type="radio" name="status" value="True" onChange={(e) => {setState(e.target.value)}}/>ON<br/>
                <input type="radio" name="status" value="False" onChange={(e) => {setState(e.target.value)}}/>OFF<br/>
                <input type="file" accept="image/*" onChange={(e) => {setFile(e.target.files[0])}}/><br/>
                <input type="text" placeholder="No.Of Weeks"onChange={(e) => {setDuration(e.target.value)}}/><br/>
                <button onClick={upload} type="button">Submit</button>
                <br></br>
                <button onClick={() => {Navigate("/");}}>Switch</button>
            </form>
        </div>
    );
};

export default Products;