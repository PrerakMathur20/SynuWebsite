import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@tokis/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import { DocsLayout, LandingLayout } from './components/SiteLayout';
import { Landing } from './pages/Landing';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';

// Docs — Getting Started
import { GettingStartedPage } from './pages/docs/GettingStartedPage';
import { IntroductionPage } from './pages/docs/IntroductionPage';
import { InstallationPage } from './pages/docs/InstallationPage';
import { ThemingPage } from './pages/docs/ThemingPage';

// Docs — Foundations
import { FoundationsPage } from './pages/docs/FoundationsPage';
import { TypographyPage } from './pages/docs/TypographyPage';
import { LayoutPage } from './pages/docs/LayoutPage';

// Docs — Components
import { ComponentsOverviewPage } from './pages/docs/ComponentsOverviewPage';
import { ButtonPage } from './pages/docs/ButtonPage';
import { AvatarPage } from './pages/docs/AvatarPage';
import { BadgePage } from './pages/docs/BadgePage';
import { ChipPage } from './pages/docs/ChipPage';
import { CardPage } from './pages/docs/CardPage';

// Docs — Forms
import { FormsOverviewPage } from './pages/docs/FormsOverviewPage';
import { TextFieldPage } from './pages/docs/TextFieldPage';
import { CheckboxPage } from './pages/docs/CheckboxPage';
import { RadioPage } from './pages/docs/RadioPage';
import { SelectPage } from './pages/docs/SelectPage';
import { SwitchPage } from './pages/docs/SwitchPage';
import { SliderPage } from './pages/docs/SliderPage';
import { SearchFieldPage } from './pages/docs/SearchFieldPage';
import { TogglePage } from './pages/docs/TogglePage';

// Docs — Feedback
import { FeedbackOverviewPage } from './pages/docs/FeedbackOverviewPage';
import { AlertPage } from './pages/docs/AlertPage';
import { ProgressPage } from './pages/docs/ProgressPage';
import { CircularProgressPage } from './pages/docs/CircularProgressPage';
import { SnackbarPage } from './pages/docs/SnackbarPage';

// Docs — Navigation
import { NavigationOverviewPage } from './pages/docs/NavigationOverviewPage';
import { BreadcrumbsPage } from './pages/docs/BreadcrumbsPage';
import { TabsPage } from './pages/docs/TabsPage';
import { MenuPage } from './pages/docs/MenuPage';
import { StepperPage } from './pages/docs/StepperPage';
import { BottomNavPage } from './pages/docs/BottomNavPage';
import { NavigationRailPage } from './pages/docs/NavigationRailPage';
import { AppBarPage } from './pages/docs/AppBarPage';

// Docs — Overlay
import { OverlayOverviewPage } from './pages/docs/OverlayOverviewPage';
import { DialogPage } from './pages/docs/DialogPage';
import { ConfirmDialogPage } from './pages/docs/ConfirmDialogPage';
import { DrawerPage } from './pages/docs/DrawerPage';
import { TooltipPage } from './pages/docs/TooltipPage';
import { PopoverPage } from './pages/docs/PopoverPage';
import { HoverCardPage } from './pages/docs/HoverCardPage';
import { ContextMenuPage } from './pages/docs/ContextMenuPage';
import { DropdownPage } from './pages/docs/DropdownPage';
import { CommandPalettePage } from './pages/docs/CommandPalettePage';

// Docs — Data Display
import { DataDisplayOverviewPage } from './pages/docs/DataDisplayOverviewPage';
import { AccordionPage } from './pages/docs/AccordionPage';
import { TablePage } from './pages/docs/TablePage';
import { PaginationPage } from './pages/docs/PaginationPage';
import { TimelinePage } from './pages/docs/TimelinePage';
import { TreeViewPage } from './pages/docs/TreeViewPage';
import { StatisticPage } from './pages/docs/StatisticPage';
import { EmptyStatePage } from './pages/docs/EmptyStatePage';
import { ResultPage } from './pages/docs/ResultPage';

// Docs — Charts
import { ChartsPage } from './pages/docs/ChartsPage';

// Docs — Performance
import { PerformanceOverviewPage } from './pages/docs/PerformanceOverviewPage';
import { VirtualizedListPage } from './pages/docs/VirtualizedListPage';
import { InfiniteScrollPage } from './pages/docs/InfiniteScrollPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Landing & top-level */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>

          {/* Docs */}
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="/docs/introduction" replace />} />

            {/* Getting Started */}
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="theming" element={<ThemingPage />} />

            {/* Foundations */}
            <Route path="foundations" element={<FoundationsPage />} />
            <Route path="typography" element={<TypographyPage />} />
            <Route path="layout" element={<LayoutPage />} />

            {/* Components */}
            <Route path="components" element={<ComponentsOverviewPage />} />
            <Route path="button" element={<ButtonPage />} />
            <Route path="avatar" element={<AvatarPage />} />
            <Route path="badge" element={<BadgePage />} />
            <Route path="chip" element={<ChipPage />} />
            <Route path="card" element={<CardPage />} />

            {/* Forms */}
            <Route path="forms" element={<FormsOverviewPage />} />
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
            <Route path="feedback" element={<FeedbackOverviewPage />} />
            <Route path="alert" element={<AlertPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="circular-progress" element={<CircularProgressPage />} />
            <Route path="snackbar" element={<SnackbarPage />} />

            {/* Navigation */}
            <Route path="nav-overview" element={<NavigationOverviewPage />} />
            <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
            <Route path="tabs" element={<TabsPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="stepper" element={<StepperPage />} />
            <Route path="bottom-nav" element={<BottomNavPage />} />
            <Route path="nav-rail" element={<NavigationRailPage />} />
            <Route path="app-bar" element={<AppBarPage />} />

            {/* Overlay */}
            <Route path="overlay" element={<OverlayOverviewPage />} />
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
            <Route path="data-display" element={<DataDisplayOverviewPage />} />
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
            <Route path="performance" element={<PerformanceOverviewPage />} />
            <Route path="virtual-list" element={<VirtualizedListPage />} />
            <Route path="infinite-scroll" element={<InfiniteScrollPage />} />

            <Route path="*" element={<Navigate to="/docs/introduction" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
