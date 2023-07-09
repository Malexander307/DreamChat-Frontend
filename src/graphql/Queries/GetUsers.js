import gql from "graphql-tag";

export default gql`
    query getUsers {
        user(id: 1) {
            id
            name
        }
    }
`