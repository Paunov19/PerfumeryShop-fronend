import { useParams } from "react-router-dom";

export default function UseId() {
    const { id } = useParams();
    return id;
}
