import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  //FILTER
  const filterValue = searchParams.get("status")
  const filter = !filterValue || filterValue === "all" ? null : { method: "eq", field: "status", value: filterValue }

  //SORT
  const sortValue = searchParams.get("sortBy") || "startDate-desc"
  const [field, direction] = sortValue && sortValue.split("-")
  const sortBy = { field, direction }

  //PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));


  // QUERY
  const { data: { data: bookings, count } = {}, error, isLoading } = useQuery({
    queryKey: ["bookings", filter, page, sortBy], //here we are passing filter varible ,so reactquery know to fetch data when filter value change
    queryFn: () => getBookings({ filter, page, sortBy }),
  });

  //PRE-FETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE)

  // for prefetching next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1, sortBy],
      queryFn: () => getBookings({ filter, page: page + 1, sortBy }),
    })
  }
  
  // for prefetching previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1, sortBy],
      queryFn: () => getBookings({ filter, page: page - 1, sortBy }),
    })
  }


  return { bookings, count, error, isLoading }
}