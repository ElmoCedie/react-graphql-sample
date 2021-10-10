import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { Users } from "../../../../entities";

const QUERY = gql`
    query listUser($page: Int!, $search: String!) {
        allUsers(page: $page, perPage: 5, filter: { q: $search }) {
            id
            name
            username
            email
            phone
        }
    }
`;

const getListUser = ({ search = "", pagination = 1 }): QueryResult<Users, OperationVariables> => {
    return useQuery<Users>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            search,
            page: pagination == 0 ? 0 : pagination - 1,
        },
    });
};

export default getListUser;
