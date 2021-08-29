import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {RegPage} from "./pages/RegPage";
import {MainPage} from "./pages/MainPage";
import {MyCollectionsPage} from "./pages/MyCollectionsPage";
import {CollectionPage} from "./pages/CollectionPage";
import {ItemPage} from "./pages/ItemPage";
import {SearchPage} from "./pages/SearchPage";
import {AdminPage} from "./pages/AdminPage";
import {CategoryPage} from "./pages/CategoryPage";

export const useRoutes = (isAuthenticated) => {
    if (!isAuthenticated) {
        return (
            <Switch>
                <Route path="/Category/:category">
                    <CategoryPage/>
                </Route>
                <Route path="/Search/:value" exact>
                    <SearchPage/>
                </Route>
                <Route path="/Item/:id">
                    <ItemPage/>
                </Route>
                <Route path="/Collection/:id">
                    <CollectionPage/>
                </Route>
                <Route path="/Auth" exact>
                    <AuthPage/>
                </Route>
                <Route path="/Reg" exact>
                    <RegPage/>
                </Route>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/Admin">
                <AdminPage/>
            </Route>
            <Route path="/Category/:category">
                <CategoryPage/>
            </Route>
            <Route path="/Search/:value" exact>
                <SearchPage/>
            </Route>
            <Route path="/Item/:id">
                <ItemPage/>
            </Route>
            <Route path="/Collection/:id">
                <CollectionPage/>
            </Route>
            <Route path="/MyCol" exact>
                <MyCollectionsPage/>
            </Route>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>

    )
}