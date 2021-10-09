import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { Users } from "../../../../entities";

const QUERY = gql`
    query users($options: PageQueryOptions) {
        users(options: $options) {
            meta {
                totalCount
            }
            data {
                id
                name
                username
                email
            }
        }
    }
`;

const getListUser = ({ search = "", pagination = 1 }): QueryResult<Users, OperationVariables> => {
    return useQuery<Users>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            options: {
                paginate: {
                    page: pagination,
                    limit: 5,
                },
                search: {
                    q: search,
                },
            },
        },
    });
};

export default getListUser;
