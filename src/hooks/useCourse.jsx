import { getCourse, postCourse } from "../api/course";
import { useQuery, useMutation } from "@tanstack/react-query";

function useCourse(){
  const courseQuery = useQuery({
    queryKey: ['course'],
    queryFn: () => getCourse(),
  });

  const addCourse = useMutation ({
    mutationFn: ({post}) => postCourse(post),
  });

  return {courseQuery, addCourse};
}

export default useCourse;