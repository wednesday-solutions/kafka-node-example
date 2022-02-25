import { useQuery, useSubscription } from "urql";

const GET_POSTS = `
  query ($sortBy: String!){
    getPosts(sortBy: $sortBy) {
      id
      createdAt
      updatedAt
      title
      userName
    }
  }
`;

interface ApiResponse {
    getPosts: [
        {
            id: string;
            createdAt: string;
            title: string;
            userName: string;
        }
    ];
}

export const useReadPosts = (limit = 10) => {
    const [result] = useQuery<ApiResponse>({
        query: GET_POSTS,
        variables: { sortBy: "createdAt" },
    });

    const filteredResult = result.data?.getPosts;
    return { data: filteredResult, error: result.error, loading: result.fetching };
};

export default useReadPosts;

const newPosts = `
  subscription{
    newPosts{
      createdAt
      updatedAt
      title
      userName
    }
  }
`;

export interface PostInterface {
    id: string;
    createdAt: string;
    title: string;
    userName: string;
}

interface SubscriptionApiResponse {
    newPosts: {
        id: string;
        createdAt: string;
        title: string;
        userName: string;
    };
}

export const useSubscribePosts = (pause?: boolean) => {
    return useSubscription<SubscriptionApiResponse>({ query: newPosts, pause });
};
