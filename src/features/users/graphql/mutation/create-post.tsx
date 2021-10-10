import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation createUser($name: String!, $email: String!, $username: String!, $phone: String!) {
        createUser(name: $name, email: $email, username: $username, phone: $phone) {
            id
        }
    }
`;

const createUser = () => {
    return useMutation(MUTATION);
};

export default createUser;
