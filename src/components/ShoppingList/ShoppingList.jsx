import { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingForm from './ShoppingForm.jsx'
import ShoppingItem from './ShoppingItem.jsx';


function ShoppingList() {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [listOfItems, setListOfItems] = useState([]);
    

    const fetchItemList = () => {
        axios.get('/list').then((response) => {
            setListOfItems(response.data);
        }).catch((error) => {
            console.log(`Error in GET ${error}`);
            alert('Something went wrong');
        });
    }

    const  deleteList = () => {
        console.log(`Clearing shopping list`);
        axios.delete(`/list/deleteList`)
        .then((response) => {
            console.log(response);
            fetchItemList()
        }).catch((error) => {
                console.log(error)
            alert('Something went wrong')
        });
    }


    useEffect(() => {
        // At this point, React is ready!
        fetchItemList();
    }, []); // ! Remember the empty Array


    return (
        <div>
            <ShoppingForm 
            itemName={itemName}
            setItemName={setItemName}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
            fetchItemList={fetchItemList}
            />
        
            <button>Reset</button>
            {/* Do Not USE () */}
            <button onClick ={deleteList}>Clear</button> 
            <ul> 
                {
                    listOfItems.map((item) => (
                        <ShoppingItem
                        key={item.id}
                        item={item}
                        fetchItemList={fetchItemList}
                   />
                    ))
                }
            </ul>
        </div>
    )
}


export default ShoppingList;