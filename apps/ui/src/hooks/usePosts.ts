import { useQuery } from "urql";

const GET_POSTS = `
  query{
    getPosts{
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

const usePosts = () => {
    const [result] = useQuery<ApiResponse>({
        query: GET_POSTS,
        variables: { limit: 10 },
    });

    const filteredResult = result.data?.getPosts;
    return { data: filteredResult, error: result.error, loading: result.fetching };
};

export default usePosts;
