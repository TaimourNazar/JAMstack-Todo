import React, {useContext} from "react";
import {Redirect, Router,Link } from "@reach/router";
import { Heading, Button, Flex, NavLink, Container} from "theme-ui";
import {IdentityContext} from "../../identity-context";
//import dashboard from "./dashboard";
/*
let Dash = () => {
    const {user, identity:netlifyIdentity}= useContext(IdentityContext);

    return <Container>
    <Flex as='nav'>
        <NavLink as={Link} to="/" p={2}>
            Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
            Dashboard
        </NavLink>
        {user && (
        <NavLink href='#!' p={2}
            onClick={()=>{
                netlifyIdentity.open();
            }}
        >
           Log out {user.user_metadata.full_name}
        </NavLink>)}
    </Flex>
    <div>Dash hasUser: {user && user.user_metadata.full_name}</div>
    </Container>
};
*/
let DashLoggedOut = props => {
    const {user, identity:netlifyIdentity}= useContext(IdentityContext);
    return <Container>
        <Flex as='nav'>
            <NavLink as={Link} to="/" p={2}>
                Home
            </NavLink>
            <NavLink as={Link} to={"/app"} p={2}>
                Dashboard
            </NavLink>
            {user && (<NavLink href='#!' p={2}>
                 {user.user_metadata.full_name}
            </NavLink>)}
        </Flex>
        <Flex sx={{flexDirection: "column",padding: 3}}>
            <Heading as="h1">Get Stuff Done</Heading>
            <Button 
                sx={{marginTop:2}}
                onClick={()=>{
                    netlifyIdentity.open();
                }}
            >
             Log In
            </Button>
        </Flex>
    </Container>
}

export default props =>{
    const {user}= useContext(IdentityContext);

    if(!user){
        return (
            <Router>
                <DashLoggedOut path="/app" />
            </Router>
        );
    }

    return (<Redirect to='/dashboard'/>);
    //<dashboard/>;
    //(<Redirect to='/dashboard'/>);
};