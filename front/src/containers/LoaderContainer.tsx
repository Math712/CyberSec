import { useContext } from "react";
import { motion } from "framer-motion";
import LoaderContext from "../contexts/LoaderContext";
import './LoaderContainer.scss';

const LoaderContainer = (props: any) => {
    const {setIsLoading} = useContext(LoaderContext)
    return (
        <motion.div
            initial={{
                y:0
            }}
            animate={{
                y:"-100vh"
            }}
            transition={{
                delay:0.5,
                duration:0.2
            }}
            onAnimationComplete={definition => {
                setIsLoading(false)
            }}
            className="loaderContainer"
            >
            <div className="loaderContent">{props.children}</div>
        </motion.div>
    );
};

export default LoaderContainer;

