import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import ListItems from "./pages/items/ListItems";
import CreatItem from "./pages/items/CreatItem";
import ShowItem from "./pages/items/ShowItem";
import UpdateItem from "./pages/items/UpdateItem";
import ItemsLayout from "./pages/items/Layout";

const router = createBrowserRouter([{
    path:"/",
    element:<RootLayout/>,
    children:[
        {index: true, element: <Home/>},
        {
            path:"/items",
            element:<ItemsLayout/>,
            children:[
                {index: true, element: <ListItems/>},
                {path:"new", element: <CreatItem/>},
                {path:":id", element: <ShowItem/>},
                {path:":id/update", element: <UpdateItem/>},
            ]
        }
    ]
}])

export default router