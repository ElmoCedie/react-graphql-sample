import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { Posts } from "../../../../entities";

const QUERY = gql`
    query post($options: PageQueryOptions) {
        posts(options: $options) {
            meta {
                totalCount
            }
            data {
                id
                title
                body
                user {
                    id
                    username
                }
            }
        }
    }
`;

const getListPost = ({ search = "", pagination = 1 }): QueryResult<Posts, OperationVariables> => {
    return useQuery<Posts>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            options: {
                paginate: {
                    page: pagination,
                    limit: 9,
                },
                search: {
                    q: search,
                },
            },
        },
    });
};

export default getListPost;
