import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunity, getCommunityById } from '../api/community';

export default function useCommunityDetail(id) {
	const queryClient = useQueryClient();

	const postQuery = useQuery({
    queryKey: ['community', id],
    queryFn: () => getCommunityById(id),
    staleTime: 60 * 1000 * 3,
  });

	return {postQuery};
}


