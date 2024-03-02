import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCommunity,
  editCommunity,
  editType,
  getCommunity,
  getCommunityById,
  getCrucials,
  postCommunity,
} from '../api/community';

export default function useCommunity() {
  const queryClient = useQueryClient();

  const communityQuery = useQuery({
    queryKey: ['community'],
    queryFn: () => getCommunity(),
    staleTime: 60 * 1000 * 3,
  });
  const crucialsQuery = useQuery({
    queryKey: ['crucials'],
    queryFn: () => getCrucials(),
    staleTime: 60 * 1000 * 3,
  });

  // const postQuery = useQuery({
  //   queryKey: ['community', id],
  //   queryFn: () => getCommunityById(id),
  //   staleTime: 60 * 1000 * 3,
  // });
  const addPost = useMutation({
    mutationFn: ({ post }) => postCommunity(post),

    onSuccess: () => queryClient.invalidateQueries(['community']),
  });
  const deletePost = useMutation({
    mutationFn: (id) => deleteCommunity(id),

    onSuccess: () => queryClient.invalidateQueries(['community']),
  });
  const updatePost = useMutation({
    mutationFn: ({ id, ePost }) => editCommunity(id, ePost),

    onSuccess: () => queryClient.invalidateQueries(['community']),
  });
  const uptateType = useMutation({
    mutationFn: ({ id, type }) => {
      return editType(id, type);
    },

    onSuccess: () => queryClient.invalidateQueries(['community'], ['crucials']),
  });

  return {
    communityQuery,
    crucialsQuery,
    addPost,
    deletePost,
    updatePost,
    uptateType,
  };
}
