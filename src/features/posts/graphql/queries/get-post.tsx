import { gql, OperationVariables, QueryResult, useLazyQuery, useQuery } from "@apollo/client";
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

export const getPost = (id: string): QueryResult<PostData, OperationVariables> => {
    return useQuery<PostData>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            id: id,
        },
    });
};

export const lazyGetPost = (id?: string) => {
    return useLazyQuery(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            id: id ?? "",
        },
    });
};
