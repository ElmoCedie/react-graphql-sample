import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

const deleteUser = () => {
    return useMutation(MUTATION);
};

export default deleteUser;
