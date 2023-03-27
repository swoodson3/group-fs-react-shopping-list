import axios from 'axios';

function ShoppingItem({ item, fetchItemList }) {

    const removeItem = (e) => {
        console.log(`removeItem ${item.id}`)
        axios.delete(`/list/deleteOne/${item.id}`)
        .then((response) => {
            fetchItemList();
        }).catch((error) => {
            console.log(`Error in removeCreature ${error}`);
            alert('Something went wrong!')
        })
    }


    const markItem = () => {
        console.log(`markItem ${item}`)
        if (item.quantity > 0) {
            let quantity = {quantity: item.quantity -1};
            axios.put(`/list/${item.id}`, quantity)
            .then((response) => {
                console.log(response);
                fetchItemList();
            }).catch((error) => {
                console.log(`Error in PUT ${error}`);
                alert('Something went wrong');
            })
        }
    }



    return (
        <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={(e) => markItem(e)}>BUY</button>
            <button onClick={(e) => removeItem(e)}>Delete</button>
        </li>
    )

}

export default ShoppingItem;