import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { Params } from "react-router-dom";
  
export type RouterProps = {
    location: Location,
    navigate: NavigateFunction,
    params: Readonly<Params<string>>,
}

export function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
  
    return ComponentWithRouterProp;
  }