import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation updateUser(
        $id: ID!
        $name: String!
        $email: String!
        $username: String!
        $phone: String!
    ) {
        updateUser(id: $id, name: $name, email: $email, username: $username, phone: $phone) {
            id
        }
    }
`;

const updateUser = () => {
    return useMutation(MUTATION);
};

export default updateUser;
