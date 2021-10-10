import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation updatePost($id: ID!, $author: String, $title: String, $body: String) {
        updatePost(id: $id, author: $author, title: $title, body: $body) {
            id
        }
    }
`;

const updatePost = () => {
    return useMutation(MUTATION);
};

export default updatePost;
