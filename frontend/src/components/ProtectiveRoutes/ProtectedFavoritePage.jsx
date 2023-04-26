import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FavoritePage from "../FavoritePage";

export default function ProtectedFavoritePage() {
    const [user, loading, error] = useAuthState(auth);

    return (
        loading? <h2>Loading</h2> : user ? <FavoritePage/> : <Navigate to="/user/login"/>
    )
}
