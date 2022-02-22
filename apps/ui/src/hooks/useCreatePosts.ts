import { useMutation } from "urql";

const CREATE_POST = `
  mutation ($userName: String!, $title: String!) {
    addPost (input: {userName: $userName, title: $title}) {
      id
      userName
      title
    }
  }
`;

interface ApiResponse {
    addPost: [
        {
            id: string;
            createdAt: string;
            title: string;
            userName: string;
        }
    ];
}

const useCreatePost = () => {
    return useMutation<ApiResponse>(CREATE_POST);
};

export default useCreatePost;
