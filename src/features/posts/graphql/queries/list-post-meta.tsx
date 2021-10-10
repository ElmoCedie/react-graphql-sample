import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";

const QUERY = gql`
    query listPostMeta($page: Int!, $search: String!) {
        _allPostsMeta(page: $page, perPage: 5, filter: { q: $search }) {
            count
        }
    }
`;

const getListPostMeta = ({ search = "", pagination = 1 }): QueryResult<any, OperationVariables> => {
    return useQuery(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            search,
            page: pagination == 0 ? 0 : pagination - 1,
        },
    });
};

export default getListPostMeta;
