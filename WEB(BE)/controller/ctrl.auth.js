'use strict';
import { Result } from './ctrl.common.js';
import { auth } from '../firebase/auth.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';

const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = new Result();

    try {
        console.log(email);
        console.log(password);
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        result.success = true;
        result.data = credential;
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;
    }

    return res.json(result);
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password; 

    const result = new Result();

    try {
        console.log(email);
        console.log(password);
        const credential = await signInWithEmailAndPassword(auth, email, password)
        result.success = true;
        result.data = credential.user;
    } catch (error) {
        result.error_code = error.code;
        result.error_msg = error.message;   
    }

    return res.json(result);
};

export const ctrl_auth = {
    register,
    login,
};