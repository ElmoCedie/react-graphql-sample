import { gql, useQuery } from "@apollo/client";
import { User } from "../../../../entities";

const QUERY = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            name
            username
            email
            address {
                street
                suite
                city
                zipcode
            }
            phone
            website
            company {
                name
                bs
                catchPhrase
            }
        }
    }
`;

export const getUser = (id?: string) => {
    return useQuery<{ user: User }>(QUERY, {
        fetchPolicy: "no-cache",
        variables: {
            id: id ?? "",
        },
        skip: !id,
    });
};
