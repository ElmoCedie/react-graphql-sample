import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation createPost($author: String!, $title: String!, $body: String!) {
        createPost(author: $author, title: $title, body: $body) {
            id
        }
    }
`;

const createPost = () => {
    return useMutation(MUTATION);
};

export default createPost;
