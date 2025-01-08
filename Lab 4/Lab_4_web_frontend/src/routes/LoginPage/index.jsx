import Author from "../../components/Sections/Author";
import AppBody from "../../components/AppBody";
import Footer from "../../components/Sections/Footer";
import LogIn from "../../components/Sections/LogIn";
import {Toaster} from "react-hot-toast";

function LoginPage() {

    return (
        <AppBody>
            <Author />
            <LogIn />
            <Footer />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </AppBody>
    );

}

export default LoginPage;
