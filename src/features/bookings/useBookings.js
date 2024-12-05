import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams()

  //FILTER
  const filterValue = searchParams.get("status")
  const filter = !filterValue || filterValue === "all" ? null : { method: "eq", field: "status", value: filterValue }

  //SORT
  const sortValue = searchParams.get("sortBy") ||"startDate-desc"
  const[field, direction] = sortValue && sortValue.split("-")
  const sortBy = {field, direction}

  //PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));


  const { data: { data: bookings, count } = {}, error, isLoading } = useQuery({
    queryKey: ["bookings", filter, page, sortBy], //here we are passing filter varible ,so reactquery know to fetch data when filter value change
    queryFn: () => getBookings({ filter, page, sortBy }),
  });

  return { bookings, count, error, isLoading }
}