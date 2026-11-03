import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn/SignIn";
import Layout from "./layout/layout";
import Info from "./views/Info/Info"
import NotFound from "./views/NotFound/NotFound";
import GrantPermission from "./views/GrantPermission/GrantPermission";
import Users from "./views/Users/Users";
import UserHistory from "./views/UserHistory/UserHistory";
import CreateCommission from "./views/Commission/CreateCommission";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />

                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Info />} />
                    <Route path="/grant-permission" element={<GrantPermission />} />
                    <Route path="/admin" element={<Users />} />
                    <Route path="/user/:userId" element={<Info />} />
                    <Route path="/user/:userId/history" element={<UserHistory />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/user/:userId/commission/:commissionId" element={<CreateCommission />} />
                    <Route path="/apps" element={<Users />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
export default App;
