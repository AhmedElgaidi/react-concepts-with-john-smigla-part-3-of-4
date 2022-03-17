import React, { useState, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'; // for defining a default values for our passing data
import { login } from './utils';

import { data } from './data';
import { data2 } from './data2';

import defaultImage from '../src/assets/default-image.jpeg';

// [3] useContext api:
// this returns two componetns (provider) and (consumer)
// you just need to convert the provider component into for example PersonContext and pass the props as object in value key. and then use them in your target component after importing your PersonContext there.
const PersonContext = React.createContext();


const App = () => {
    // [1] useReducer();
    const [state, dispatch] = useReducer(loginReducer, defaultValue);
    const { 
        username,
        password,
        isLoading,
        error,
        isLoggedIn
    } = state;

    const submitHandler = async event => {
        event.preventDefault();

        dispatch({
            type: 'login'
        })
        try {
            await login({ username, password });
            dispatch({
                type: 'success'
            });
        } catch (error) {
            dispatch({
                type: 'error'
            })
        }
    };



    // [2] prop drilling: (not an official term)
    const [people, setPeople] = useState(data);

    const removePerson = id => {
        setPeople(people => {
            return people.filter(person => person.id !== id);
        });
    };
    // now we really have an interesting problem, which is we have an handler in the main controller and we want to pass to the SinglePerson component, depending on what we have learned, we will pass this handler as a prop to down from top until reaching our target component
    // so, we can conclude, that we can pass whatever we want as prop not just our state!!
    // Here, comes useContext api to solve this prop drilling problem, especially, if you have a long tree and you want to pass props top to down throught multiple components.


    // [3] useContext api:
    // we can follow the prop drilling value if we want to pass the props may be for only one level, we have have more levels we should use ths context api.
    const removePerson2 = id => {
        setPeople(people => {
            return people.filter(person => person.id !== id);
        });
    };


    // [5] prop types:
    const url2 = 'https://course-api.com/react-prop-types-example';
    const { products } = useFetch(url2);

















// since the the App component is the provider in our case, lets' change it's wrapper into
    return (
        <PersonContext.Provider value={{ removePerson2 }} className="container">
            <h2>UseReducer:</h2>
            {isLoggedIn ? (
                <>
                    <h2>Welcome, { username }!</h2>
                    <button className='btn' onClick={ () => dispatch({ type: 'logout' }) }>
                        log out 
                    </button>
                </>
            ) : (
                <>
                    <form className='form' onSubmit={ submitHandler }>
                        {error && <p style={{ color: 'red' }}>{ error }</p>}
                        <h2>Login</h2>
                        <input 
                            className='item' 
                            type="text"
                            placeholder='username'
                            value={ username }
                            onChange={
                                e => {
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'username',
                                        payload: e.target.value
                                    })
                                }
                            }
                        />                
                        <input 
                            className='item' 
                            type="password"
                            placeholder='password'
                            value={ password }
                            onChange={
                                e => {
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'password',
                                        payload: e.target.value
                                    })
                                }
                            }
                        />
                        <button
                            className='btn'
                            type='submit'
                            // to prevent double pressing
                            disabled={ isLoading }
                        >
                            { isLoading ? 'logging in...': 'login' }
                        </button>
                    </form>
                </>
            )}

            <hr style={{ margin: '20px' }}/>
            <h2>Prop drilling with john</h2>
            {/* 
                let's pass our removePerson handler
            */}
            <List people={people} removePerson={ removePerson } />

            <hr style={{ margin: '20px' }}/>
            <h2>Custom hooks:</h2>
            <Example/>

            <hr style={{ margin: '20px'}}/>
            <h2>Products | default values</h2>
            <div className="container">
            <section className='products'>
                {products.map((product) => {
                    return <Product key={product.id} {...product} />
                })}
            </section>
        </div>
        </PersonContext.Provider>
    );
};




const loginReducer = (state, action) => {
    switch(action.type) {
        // case 1
        case 'login':
            return {
                ...state,
                isLoading: true
            }
        // case 2
        case 'success':
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true
            }
        // case 3
        case 'error':
            return {
                ...state,
                error: 'Incorrect username or password',
                isLoading: false,
                isLoggedIn: false,
                username: '',
                password: ''
            }
        // case 4
        case 'logout':
            return {
                ...state,
                isLoggedIn: false
            }
        // case 5
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        // default case
        default:
            return state;
    }
};
const defaultValue = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
};


//================================
// List component
const List = ({ people, removePerson }) => {
    // return our fragment
    return (
        <div>
            {people.map(person => {
                // now, let's pass the person itself so we can use it in our singlePerson component.
                return (
                    <SinglePerson 
                        key={ person.id } 
                        {  ...person }//now we can use it's propeties in down components
                        removePerson={ removePerson }
                    />
                );
            })}
        </div>
    );
};

// SinglePerson component
const SinglePerson = ({ id, name, removePerson }) => {
    // Now, let's destructure the context data
    const { removePerson2 } = useContext(PersonContext);

    return (
        <div className='item'>
            <p>{ name }</p>
            <button 
                className='button'
                onClick={ () => removePerson(id) }
            >Remove by using prop drilling</button>
            <button 
                className='button'
                onClick={ () => removePerson2(id) }
            >Remove by using useContext / context API</button>
        </div>
    );
};

// custom hooks:
const url = 'https://course-api.com/javascript-store-products';
const Example = () => {
    const { isLoading, products } = useFetch(url);
    console.log(products);


    return (
        <div className="container">
            <h3>
                { isLoading ? 'loading...' : 'Products' }
            </h3>
        </div>
    );

    // what is we want to use this component with another url? here appears the custom hooks benefit, so let's split our code and make it more usable
};
// This would be our reusable component:
const useFetch = url => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);
        setIsLoading(false);
    };

    useEffect(() => {// to show it once the app is rendered one time only
        getProducts();
    }, [url]);// we added url here, to make the useEffect get invoked once the url changes for any reson.

    // Now, let's make this function/ component return our desired values
    return {
        isLoading,
        products
    }

};

// prop types

const Product = ({ name, image, price }) => {
    const url = image && image.url;// if it wasn't there it'll return undefined.
    // what if one of these properties doesn't havea value? here comes the benefitsof default values.
    return <article className='product'>
        <img src={ url || defaultImage } alt={ name } />
        {/* <img src={ image.url } alt={ name } /> */}
        <h4>{ name }</h4>
        <p>{ price }</p>
    </article>
};
// let's define our propTypes
Product.propTypes = {
    // now, we solved the problem (one object of a large array doesn't have on of those props)
    image: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};
// this is the next step (default values if there is no values)
// this is the react way, but we can solve this by ordinary js way by using or, and operators
Product.defaultProps = {
  name: 'default name',
  price: 3.99,
  image: {
    url: defaultImage
  }
};

export default App;