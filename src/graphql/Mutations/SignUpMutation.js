import gql from "graphql-tag";

export default gql`
    mutation SIGN_UP($nickname: String!, $password: String!) {
        signUp(
            nickname: $nickname
            password: $password
        ) {
            token
        }
    }
`