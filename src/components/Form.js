import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    sauce: yup.string().required("Please select your sauce"),
    size: yup.string().required("Please select your pizza size"),
    pepperoni: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
    sausage: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
    bacon: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
    onions: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
    peppers: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
    mushrooms: yup.bool().oneOf([true], "Please agree to the terms and conditions"),
});

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    //   marginTop: "-6%"
},
    media: {
    height: 140,
  },});


const Form = (props) => {

    const classes = useStyles();

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        sauce: "",
        size: "",
        pepperoni: false,
        sausage: false,
        bacon: false,
        onions: false,
        peppers: false,
        mushrooms: false,
        
    });

    console.log("FormState", formState)

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        sauce: "",
        size: "",
        // pepporoni: false,
    })

   

    console.log("errorState", errorState)

    const inputChange = (e) => {
        console.log("input change", formState)
        console.log("event target", e.target)
        e.persist();
        validate(e);
        let value = e.target.name === "pepperoni" || e.target.name === "sausage" || e.target.name === "bacon" || e.target.name === "onions" || e.target.name === "peppers" || e.target.name === "mushrooms" ? e.target.checked: e.target.value;
        setFormState({...formState, [e.target.name]: value})
        console.log("value", value)
    }

    const validate = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
        .then(valid => {
            setErrorState({
                ...errorState, [e.target.name]: ""
            });
        })
        .catch(err => {
            console.log("errors", err.errors);
            setErrorState({
                ...errorState, [e.target.name]: err.errors[0]
            });
        });
    };

    let history = useHistory();

    const SubmitButton = () =>{
           return history.push("/members");   
    }

    

    const submitMember = (e) => {
        e.preventDefault();
        // props.addMember(formState);
        setFormState({name: "", email:"", password: "", sauce: "", role: "", pepperoni: false, sausage: false, bacon: false, onions: false, peppers: false, mushrooms: false,})
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {console.log(response); props.addMember(response.data)})
        .catch(err => console.log(err));
        SubmitButton()
    }


    return(
       
        <div className="form-container">
             <Card className={classes.root}>
             <CardMedia
          className={classes.media}
          image="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          title="Order Pizza"
        />
      <CardContent>
          <h3 style={{textAlign: "center"}}>Build Your Own Pizza</h3>
            <form onSubmit={submitMember} style={{marginTop: "5%"}}>
                <br />
                <label htmlFor="name">
                    Name:
                    <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter First Name"
                    value={formState.name}
                    onChange={inputChange}
                    required
                    />
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.name}</p>
                <label htmlFor="email">
                    Email:
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={formState.email}
                    onChange={inputChange}
                    required
                    />
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.email}</p>
               
                <label htmlFor="size">
                Size: 
                <select
                value={formState.size}
                name="size"
                id="size"
                onChange={inputChange}
                required
                >
                <option value="">--Select Size--</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XLarge">XLarge</option>
                </select>
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.size}</p>
               
               
                <label htmlFor="sauce">
                Sauce:
                <select
                value={formState.sauce}
                name="sauce"
                id="sauce"
                onChange={inputChange}
                required
                >
                <option value="">--Select Sauce--</option>
                <option value="Original Red">Original Red</option>
                <option value="Garlic Ranch">Garlic Ranch</option>
                <option value="BBQ Sauce">BBQ Sauce</option>
                <option value="Spinach Alfredo">Spinach Alfredo</option>
                </select>
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.sauce}</p>
                <br />
                <h4>Add Toppings</h4>
                <div className="checkbox-container">
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input 
                    type="checkbox"
                    name="pepperoni"
                    id="pepperoni"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                    value={!formState.pepperoni}
                    required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                <label htmlFor="sausage">
                    Sausage
                    <input 
                    type="checkbox"
                    name="sausage"
                    id="sausage"
                    checked={formState.sausage}
                    onChange={inputChange}
                    value={!formState.sausage}
                    required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                <label htmlFor="bacon">
                    Bacon
                    <input 
                    type="checkbox"
                    name="bacon"
                    id="bacon"
                    checked={formState.bacon}
                    onChange={inputChange}
                    value={!formState.bacon}
                    required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                <label htmlFor="onions">
                    Onions
                    <input 
                    type="checkbox"
                    name="onions"
                    id="onions"
                    checked={formState.onions}
                    onChange={inputChange}
                    value={!formState.onions}
                    required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                <label htmlFor="peppers">
                    Peppers
                    <input 
                    type="checkbox"
                    name="peppers"
                    id="peppers"
                    checked={formState.peppers}
                    onChange={inputChange}
                    value={!formState.peppers}
                    required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                <label htmlFor="mushrooms">
                    Mushrooms
                    <input 
                    type="checkbox"
                    name="mushrooms"
                    id="mushrooms"
                    checked={formState.mushrooms}
                    onChange={inputChange}
                    value={!formState.mushrooms}
                    required
                    />
                </label>
                </div>
                <button>Place Order</button>
                
            </form>
            </CardContent>
        </Card>
        </div>
        
    )
}

export default Form;