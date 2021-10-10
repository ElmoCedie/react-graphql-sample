import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation createPost($formData: CreatePostInput!) {
        createPost(input: $formData) {
            id
            title
            body
        }
    }
`;

const createUser = () => {
    return useMutation(MUTATION);
};

export default createUser;
