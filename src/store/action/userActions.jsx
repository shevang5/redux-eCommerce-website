import axios from '../../api/config'
import { loadUser, removeuser } from '../reducers/userSlice';

export const asyncRegisterUser = (user) => async(dispatch, getState)=>{
    try {
        const res = await axios.post("/users", user);
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }
} 


export const asyncLoginUsers = (user) => async(dispatch, getState)=>{
    try {
        
         const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`)
         console.log(data[0]);
         localStorage.setItem("user", JSON.stringify(data[0]))
    } catch (error) {
        console.log(error);
        
    }
}

export const asyncCurrentUsers = () => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch(loadUser(user));
        } else {
            console.log("User not logged in");
        }
    } catch (error) {
        console.log(error);
    }
};



export const asyncLogoutUsers = () => async(dispatch, getState)=>{
    try {
        
         localStorage.removeItem("user", null)
         dispatch(removeuser())
         console.log("user loged out");
         
    } catch (error) {
        console.log(error);
        
    }
}