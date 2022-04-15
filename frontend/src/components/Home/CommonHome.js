import { useEffect, useState } from "react";
//import  Images  from './src/images/15.jpg';

function CommonHome()
{
    const[data,setData]=useState([]);

    function importAll(r) {
        let images = {};
        r.keys().map(item => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    
    //const images = importAll(require.context('./images', false, '/\.jpg/'));
    const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
    
    useEffect(async ()=> {
        let result = await fetch("http://localhost:8080/allproducts");
        result = await result.json();
        //console.log(result);
        setData(result)
    },[])
  
    // useEffect(async ()=> {
    //     fetch("http://localhost:8080/allproducts")
    //     .then (response=>response.json()).then(records => {
    //         this.setState({
    //             records: records
    //         })
    //     })
    //     .catch(error => console.log(error))
    // })
                
    return(

        <div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Deposit</td>
                        <td>Image</td>
                    </tr>
                </thead>
                    <tbody>
                    {
                        data.map((item) => 
                            <tr>
                                <td>{item.productName}</td>
                                <td>{item.productDescription}</td>
                                <td>{item.rentPrice}</td>
                                <td>{item.deposit}</td>
                                //<td><img src={images[item.image]} /></td>
                            </tr>

                        )
                    }
                    </tbody>
                

            </table>
            
        </div>
        
    )
}
export default CommonHome;
