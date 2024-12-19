import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({bookingId,breakfast}) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast
        }),//mutationfn parameter can accept only one value, so we have to pass object
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} succesfully checked in`)
            queryClient.invalidateQueries({ active: true })
            navigate("/")
        },//the "data" prop is the updateBooking api return
        onError: () => {
            toast.error("There was an error while checking in")
        }
    })

    return {checkin, isCheckingIn}
}