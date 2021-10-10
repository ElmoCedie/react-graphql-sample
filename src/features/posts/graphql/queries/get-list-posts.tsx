import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { Posts } from "../../../../entities";

const QUERY = gql`
    query listPost($page: Int!, $search: String!) {
        allPosts(page: $page, perPage: 5, filter: { q: $search }) {
            id
            title
            body
            author
        }
    }
`;

const getListPost = ({ search = "", pagination = 1 }): QueryResult<Posts, OperationVariables> => {
    return useQuery<Posts>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            search,
            page: pagination == 0 ? 0 : pagination - 1,
        },
    });
};

export default getListPost;
