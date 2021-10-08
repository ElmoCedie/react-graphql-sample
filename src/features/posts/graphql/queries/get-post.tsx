import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { PostData } from "../../../../entities";

const QUERY = gql`
    query ($id: ID!) {
        post(id: $id) {
            id
            title
            body
            user {
                username
            }
        }
    }
`;

const getPost = (id: string): QueryResult<PostData, OperationVariables> => {
    return useQuery<PostData>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            id: id,
        },
    });
};

export default getPost;
