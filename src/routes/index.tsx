
import { Routes, Route} from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ECommerce from '../pages/Dashboard/Principal';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Chart from '../pages/Chart';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';

export const AppRoutes = () =>  {
  return (
    <Routes>
    <Route
      index
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <ECommerce />
        </>
      }
    />
    <Route
      path="/projetos/novo"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <FormElements />
        </>
      }
    />
    <Route
      path="/projetos/lista"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <FormLayout />
        </>
      }
    />
    <Route
      path="/calendar"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Calendar />
        </>
      }
    />
    <Route
      path="/profile"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Profile />
        </>
      }
    />
    <Route
      path="/forms/form-elements"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <FormElements />
        </>
      }
    />
    <Route
      path="/forms/form-layout"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <FormLayout />
        </>
      }
    />
    <Route
      path="/tables"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Tables />
        </>
      }
    />
    <Route
      path="/settings"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Settings />
        </>
      }
    />
    <Route
      path="/chart"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Chart />
        </>
      }
    />
    <Route
      path="/ui/alerts"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Alerts />
        </>
      }
    />
    <Route
      path="/ui/buttons"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <Buttons />
        </>
      }
    />
    <Route
      path="/auth/signin"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <SignIn />
        </>
      }
    />
    <Route
      path="/auth/signup"
      element={
        <>
          <PageTitle title="Doit API - Gerador de LPS" />
          <SignUp />
        </>
      }
    />
</Routes>
  )
}