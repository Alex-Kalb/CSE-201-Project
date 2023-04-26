import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from '../PostItem'

export default function ProtectedPostItem() {
    const [user, loading, error] = useAuthState(auth);

    return (
        loading? <h2>Loading</h2> : user ? <PostItem/> : <Navigate to="/user/login"/>
    )
}
