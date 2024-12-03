import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get("status")
  const filter = !filterValue || filterValue === "all" ? null : { method: "eq",   field: "status", value: filterValue }

  const { data: bookings, error, isLoading } = useQuery({
    queryKey: ["bookings", filter], //here we are passing filter varible ,so reactqery know to frtch data when filter value change
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, error, isLoading }
}