import LoaderContainer from "../../containers/LoaderContainer";
import Loading from "../../assets/images/loading/Loading";

const Loader = () => {
    return (
        <LoaderContainer>
            <Loading width={250} />
        </LoaderContainer>
    );
};

export default Loader;