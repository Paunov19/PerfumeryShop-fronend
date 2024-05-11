import { useNavigate } from "react-router";

export const handleUnauthorized = () => {
    const navigate = useNavigate();

    return navigate("/signin");
};
