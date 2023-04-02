import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


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
        <Grid item xs={12} md={4}>
            <Card xs={{minWidth: 275}}>
                {item.name} - {item.quantity}
                <button onClick={(e) => markItem(e)}>BUY</button>
                <button onClick={(e) => removeItem(e)}>Delete</button>
            </Card>
        </Grid>
    )

}

export default ShoppingItem;