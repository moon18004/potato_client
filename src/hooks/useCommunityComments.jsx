import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editComment, getCommentsByPostId, postCommunityComment, removeComment } from '../api/communityComments';


export default function useCommunityComments(postId){
	const queryClient = useQueryClient();

	const commentsQuery = useQuery({
		queryKey : ['comments', postId],
		queryFn: () => getCommentsByPostId(postId),
		staleTime: 60 * 1000 * 3,
	});

	const addComment = useMutation({
		mutationFn: ({comment}) => postCommunityComment(postId, comment),
		onSuccess: () => queryClient.invalidateQueries(['comments', postId])
	})

	const deleteComment = useMutation({
		mutationFn: (id) => removeComment(id, postId),
		onSuccess:()=> queryClient.invalidateQueries(['comments', postId])
	})

	const updateComment = useMutation({
		mutationFn: ({id, eComment}) => editComment(id, eComment),
		onSuccess: () => queryClient.invalidateQueries(['comments', postId])
	})


	return { commentsQuery, addComment, deleteComment, updateComment }
}