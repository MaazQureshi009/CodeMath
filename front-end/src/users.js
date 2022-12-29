import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'

function Products(){

    const Navigate = useNavigate();

    const [ Name , setName ] = useState(null);
    const [ Email , setEmail ] = useState(null);
    const [ Mobile , setMobile ] = useState(0);
    const [ USD , setUSD ] = useState(0);
    const [ Gender , setGender ] = useState(null);
    const [ Age , setAge ] = useState(0);
    const [ DOB , setDOB ] = useState(null);
    const [ House , setHouse ] = useState(null);
    const [ Street , setStreet ] = useState(null);
    const [ Area , setArea ] = useState(null);
    const [ City , setCity ] = useState(null);
    const [ State , setState ] = useState(null);
    const [ PinCode , setPinCode ] = useState(null);
    const [File , setFile ] = useState(null);

    //const fileref = ref(storage, "Files/");

    const upload = () => {
            if (File == null) return;
            const FileReference = ref(storage , `User_DP/${File.name+Name+Email}`);
            uploadBytes(FileReference , File).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    Axios.post("http://localhost:3001/addUser" , 
                    {
                        image_url : url,
                        name : Name,
                        email : Email,
                        usd : USD,
                        mobile : Mobile,
                        gender : Gender,
                        dob : DOB,
                        age : Age,
                        house : House,
                        street : Street,
                        area : Area,
                        city : City,
                        state : State,
                        pincode : PinCode,
                    });
                });
            });
            alert("User Added");
        };

    return(
        <div>
            <h1>Products</h1>
            <form>
                <input type="text" placeholder="FullName" onChange={(e) => {setName(e.target.value)}}/><br/>
                <input type="email" placeholder="Email"onChange={(e) => {setEmail(e.target.value)}}/><br/>
                <input type="text" placeholder="Usd"onChange={(e) => {setUSD(e.target.value)}}/><br/>
                <input type="tel" pattern="[0-9]{10}" placeholder="MobileNo" onChange={(e) => {setMobile(e.target.value)}}/><br/>
                <input type="text" placeholder="Age"onChange={(e) => {setAge(e.target.value)}}/><br/>
                <input type="date" placeholder="DOB" onChange={(e) => {setDOB(e.target.value)}}/><br/>
                <select onChange={(e) => {setGender(e.target.value)}}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select><br/>
                <input type="text" placeholder="HouseNo"onChange={(e) => {setHouse(e.target.value)}}/><br/>
                <input type="text" placeholder="Street"onChange={(e) => {setStreet(e.target.value)}}/><br/>
                <input type="text" placeholder="Area"onChange={(e) => {setArea(e.target.value)}}/><br/>
                <input type="text" placeholder="City"onChange={(e) => {setCity(e.target.value)}}/><br/>
                <input type="text" placeholder="State"onChange={(e) => {setState(e.target.value)}}/><br/>
                <input type="text" placeholder="PinCode"onChange={(e) => {setPinCode(e.target.value)}}/><br/>
                <input type="file" accept="image/*" onChange={(e) => {setFile(e.target.files[0])}}/><br/>
                <button onClick={upload} type="button">Submit</button>
                <br></br>
                <button onClick={() => {Navigate("/");}}>Switch</button>
            </form>
        </div>
    );
};

export default Products;