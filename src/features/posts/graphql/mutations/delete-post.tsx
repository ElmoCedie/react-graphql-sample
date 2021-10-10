import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation removePost($id: ID!) {
        removePost(id: $id) {
            id
        }
    }
`;

const deletePost = () => {
    return useMutation(MUTATION);
};

export default deletePost;
