import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editUser, getUser } from '../api/authClient';

export default function useAuth(email) {
	const queryClient = useQueryClient();
	const userQuery = useQuery({
    queryKey: ['user', email],
    queryFn: () => getUser(email),
    staleTime: 60 * 1000 * 3,
  });

	const updateUser = useMutation({
    mutationFn: ({ email, userInfo, pwd }) => {
			// console.log(userInfo);
			// console.log(userInfo);
			return editUser(email, userInfo ?? pwd)},

    onSuccess: () => queryClient.invalidateQueries(['user', email]),
  });

	return {userQuery, updateUser}
}