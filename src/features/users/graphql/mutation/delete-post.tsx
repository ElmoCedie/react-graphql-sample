import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation removeUser($id: ID!) {
        removeUser(id: $id) {
            id
        }
    }
`;

const deleteUser = () => {
    return useMutation(MUTATION);
};

export default deleteUser;
