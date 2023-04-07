import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function withAuth(Component) {
  return function WithAuth(props) {
    const isAuthenticated = useSelector((state) => state.token);

    const router = useRouter();

    if (!isAuthenticated) {
      router.push("/auth");
    }

    return <Component {...props} />;
  };
}
