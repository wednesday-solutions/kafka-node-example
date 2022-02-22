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

const useReadPosts = (limit = 10) => {
    const [result] = useQuery<ApiResponse>({
        query: GET_POSTS,
        variables: { limit },
    });

    const filteredResult = result.data?.getPosts;
    return { data: filteredResult, error: result.error, loading: result.fetching };
};

export default useReadPosts;
