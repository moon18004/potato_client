import { getCourse } from "../api/course";
import { useQuery } from "@tanstack/react-query";

function useCourse(){
  const courseQuery = useQuery({
    queryKey: ['course'],
    queryFn: () => getCourse(),
  });

  return {courseQuery};
}

export default useCourse;