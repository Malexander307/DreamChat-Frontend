import gql from "graphql-tag";

export default gql`
    mutation SIGN_IN($nickname: String!, $password: String!) {
        signIn(
            nickname: $nickname
            password: $password
        ) {
            token
        }
    }
`