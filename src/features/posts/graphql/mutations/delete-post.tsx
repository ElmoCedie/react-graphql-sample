import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

const deletePost = () => {
    return useMutation(MUTATION);
};

export default deletePost;
