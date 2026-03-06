import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@synu/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { DocsLayout, LandingLayout } from './components/SiteLayout';
import { Landing } from './pages/Landing';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AboutPage } from './pages/AboutPage';
import { IntroductionPage } from './pages/docs/IntroductionPage';
import { InstallationPage } from './pages/docs/InstallationPage';
import { ThemingPage } from './pages/docs/ThemingPage';
import { ButtonPage } from './pages/docs/ButtonPage';
import { TypographyPage } from './pages/docs/TypographyPage';
import { TextFieldPage } from './pages/docs/TextFieldPage';
import { CheckboxPage } from './pages/docs/CheckboxPage';
import { RadioPage } from './pages/docs/RadioPage';
import { SelectPage } from './pages/docs/SelectPage';
import { SwitchPage } from './pages/docs/SwitchPage';
import { SliderPage } from './pages/docs/SliderPage';
import { CardPage } from './pages/docs/CardPage';
import { LayoutPage } from './pages/docs/LayoutPage';
import { AvatarPage } from './pages/docs/AvatarPage';
import { BadgePage } from './pages/docs/BadgePage';
import { ChipPage } from './pages/docs/ChipPage';
import { AlertPage } from './pages/docs/AlertPage';
import { ProgressPage } from './pages/docs/ProgressPage';
import { DialogPage } from './pages/docs/DialogPage';
import { DrawerPage } from './pages/docs/DrawerPage';
import { AccordionPage } from './pages/docs/AccordionPage';
import { TabsPage } from './pages/docs/TabsPage';
import { TooltipPage } from './pages/docs/TooltipPage';
import { PopoverPage } from './pages/docs/PopoverPage';
import { MenuPage } from './pages/docs/MenuPage';
import { TablePage } from './pages/docs/TablePage';
import { SnackbarPage } from './pages/docs/SnackbarPage';
import { BreadcrumbsPage } from './pages/docs/BreadcrumbsPage';

// New component pages
import { PaginationPage } from './pages/docs/PaginationPage';
import { TimelinePage } from './pages/docs/TimelinePage';
import { TreeViewPage } from './pages/docs/TreeViewPage';
import { StatisticPage } from './pages/docs/StatisticPage';
import { EmptyStatePage } from './pages/docs/EmptyStatePage';
import { ResultPage } from './pages/docs/ResultPage';
import { StepperPage } from './pages/docs/StepperPage';
import { BottomNavPage } from './pages/docs/BottomNavPage';
import { NavigationRailPage } from './pages/docs/NavigationRailPage';
import { CircularProgressPage } from './pages/docs/CircularProgressPage';
import { ConfirmDialogPage } from './pages/docs/ConfirmDialogPage';
import { HoverCardPage } from './pages/docs/HoverCardPage';
import { ContextMenuPage } from './pages/docs/ContextMenuPage';
import { SearchFieldPage } from './pages/docs/SearchFieldPage';
import { TogglePage } from './pages/docs/TogglePage';
import { DropdownPage } from './pages/docs/DropdownPage';
import { CommandPalettePage } from './pages/docs/CommandPalettePage';
import { ChartsPage } from './pages/docs/ChartsPage';
import { VirtualizedListPage } from './pages/docs/VirtualizedListPage';
import { InfiniteScrollPage } from './pages/docs/InfiniteScrollPage';
import { AppBarPage } from './pages/docs/AppBarPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Landing */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Docs */}
          <Route path="/docs" element={<DocsLayout />}>
            {/* Getting Started */}
            <Route index element={<Navigate to="/docs/introduction" replace />} />
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="theming" element={<ThemingPage />} />

            {/* Foundations */}
            <Route path="typography" element={<TypographyPage />} />
            <Route path="layout" element={<LayoutPage />} />

            {/* Components */}
            <Route path="button" element={<ButtonPage />} />
            <Route path="avatar" element={<AvatarPage />} />
            <Route path="badge" element={<BadgePage />} />
            <Route path="chip" element={<ChipPage />} />
            <Route path="card" element={<CardPage />} />

            {/* Forms */}
            <Route path="input" element={<TextFieldPage />} />
            <Route path="textfield" element={<TextFieldPage />} />
            <Route path="checkbox" element={<CheckboxPage />} />
            <Route path="radio" element={<RadioPage />} />
            <Route path="select" element={<SelectPage />} />
            <Route path="switch" element={<SwitchPage />} />
            <Route path="slider" element={<SliderPage />} />
            <Route path="search-field" element={<SearchFieldPage />} />
            <Route path="toggle" element={<TogglePage />} />

            {/* Feedback */}
            <Route path="alert" element={<AlertPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="circular-progress" element={<CircularProgressPage />} />
            <Route path="snackbar" element={<SnackbarPage />} />

            {/* Navigation */}
            <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
            <Route path="tabs" element={<TabsPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="stepper" element={<StepperPage />} />
            <Route path="bottom-nav" element={<BottomNavPage />} />
            <Route path="nav-rail" element={<NavigationRailPage />} />
            <Route path="app-bar" element={<AppBarPage />} />

            {/* Overlay */}
            <Route path="dialog" element={<DialogPage />} />
            <Route path="confirm-dialog" element={<ConfirmDialogPage />} />
            <Route path="drawer" element={<DrawerPage />} />
            <Route path="tooltip" element={<TooltipPage />} />
            <Route path="popover" element={<PopoverPage />} />
            <Route path="hover-card" element={<HoverCardPage />} />
            <Route path="context-menu" element={<ContextMenuPage />} />
            <Route path="dropdown" element={<DropdownPage />} />
            <Route path="command-palette" element={<CommandPalettePage />} />

            {/* Data Display */}
            <Route path="accordion" element={<AccordionPage />} />
            <Route path="table" element={<TablePage />} />
            <Route path="pagination" element={<PaginationPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="treeview" element={<TreeViewPage />} />
            <Route path="statistic" element={<StatisticPage />} />
            <Route path="emptystate" element={<EmptyStatePage />} />
            <Route path="result" element={<ResultPage />} />

            {/* Charts */}
            <Route path="charts" element={<ChartsPage />} />

            {/* Performance */}
            <Route path="virtual-list" element={<VirtualizedListPage />} />
            <Route path="infinite-scroll" element={<InfiniteScrollPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/docs/introduction" replace />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
