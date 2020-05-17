import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Must include a password"),
    team: yup.string().required("Please select your team"),
    role: yup.string().required("Please select your role"),
    terms: yup.bool().oneOf([true], "Please agree to the terms and conditions")
});

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: "-6%"
}});


const Form = (props) => {

    const classes = useStyles();

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        team: "",
        role: "",
        terms: false,
    });

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        team: "",
        role: "",
        terms: "",
    })

   

    console.log("errorState", errorState)

    const inputChange = (e) => {
        console.log("input change", formState)
        console.log("event target", e.target)
        e.persist();
        validate(e);
        let value = e.target.name === "terms" ? e.target.checked: e.target.value;
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
        setFormState({name: "", email:"", password: "", team: "", role: "", terms: false})
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {console.log(response); props.addMember(response.data)})
        .catch(err => console.log(err));
        SubmitButton()
    }


    return(
       
        <div className="form-container">
             <Card className={classes.root} variant="outlined" style={{backgroundColor: "white", height: "80%"}}>
      <CardContent>
            <form onSubmit={submitMember} style={{marginTop: "20%"}}>
                <br />
                <label htmlFor="name">
                    Name:
                    <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter First and Last Name"
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
                <label htmlFor="password">
                    Password:
                    <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Please Create a Strong Password"
                    value={formState.password}
                    onChange={inputChange}
                    required
                    />
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.password}</p>
                <label htmlFor="team">
                Team:
                <select
                value={formState.team}
                name="team"
                id="team"
                onChange={inputChange}
                required
                >
                <option value="">--Select Team--</option>
                <option value="Avenger">Avenger</option>
                <option value="Blue Thunder">Blue Thunder</option>
                <option value="Gravedigger">Gravedigger</option>
                <option value="Megalodon">Megalodon</option>
                </select>
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.team}</p>
                <label htmlFor="role">
                Role: 
                <select
                value={formState.role}
                name="role"
                id="role"
                onChange={inputChange}
                required
                >
                <option value="">--Select Role--</option>
                <option value="Driver">Driver</option>
                <option value="Crew">Crew</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Media">Media</option>
                </select>
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.role}</p>
                <br />
                <label htmlFor="terms">
                    <input 
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                    value={!formState.terms}
                    required
                    />
                    I agree to the Terms and Conditions.
                </label>
                <p style={{color: 'red', fontSize: '10px'}}>{errorState.terms}</p>
                <button>Submit</button>
                
            </form>
            </CardContent>
        </Card>
        </div>
        
    )
}

export default Form;