import React, { useContext, useReducer, useRef} from "react";
import { Link } from "@reach/router";
import { Button, Flex, NavLink, Container, Input, Label, Checkbox } from "theme-ui";
import { IdentityContext } from "../../identity-context";

const todosReducer = (state,action) => {
    switch(action.type){
        case "addTodo":
            return [{done: false, value: action.payload}, ...state];
        case "toggleTodoDone":
            const newState = [...state];
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            return newState;          
    }
}

export default () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext);
    const inputRef = useRef();
    //const [todos,SetTodos] = useState([]);
    const [todos, dispatch] = useReducer(todosReducer, []);
    /*
    if(!user){
        return (<Redirect to='/'/>);
    }
    */
    return (<Container>
        <Flex as='nav'>
            <NavLink as={Link} to="/" p={2}>
                Home
            </NavLink>
            <NavLink as={Link} to={"/dashboard"} p={2}>
                Dashboard
            </NavLink>
            {user && (
                <NavLink href='#!' p={2}
                    onClick={() => {
                        netlifyIdentity.open();
                    }}
                >
                    Log out {user.user_metadata.full_name}
                </NavLink>)}
        </Flex>
        <Flex
            as="form"
            onSubmit={e => {
                e.preventDefault();
                dispatch({
                    type: "addTodo",
                    payload: inputRef.current.value
                });
                inputRef.current.value="";
            }}
        >
            <Label sx={{display:"flex"}}>
                <span>Add&nbsp;Todo</span>
                <Input ref={inputRef} sx={{ marginLeft: 1}}/>
            </Label>
            <Button sx={{marginLeft: 1}}>Submit</Button>
        </Flex>
        <Flex sx={{flexDirection: "column"}}>
            <ul>
                {todos.map((todo, i) => (
                    <Flex 
                        as="li"
                        onClick = {() => {
                            dispatch({
                                type: "toggleTodoDone",
                                payload: i
                            });
                        }}>
                        <Checkbox checked={todo.done} />
                        <span>{todo.value}</span>
                    </Flex>
                ))}
            </ul>
        </Flex>
    </Container>
    );
};