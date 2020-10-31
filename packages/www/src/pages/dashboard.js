import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Heading, Button, Flex, NavLink, Container } from "theme-ui";
import { IdentityContext } from "../../identity-context";

export default () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext);

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
                    onClick={() => {
                        netlifyIdentity.open();
                    }}
                >
                    Log out {user.user_metadata.full_name}
                </NavLink>)}
        </Flex>
        <div>Dash hasUser: {user && user.user_metadata.full_name}</div>
    </Container>
};