@extends('admin.layouts.app')

@section('content')
<div class="container-fluid py-4 admin-dashboard">

    @php
        $totalUsers = $totalUsers ?? 0;
        $totalEvents = $totalEvents ?? 0;
        $totalSubscriptionPlans = $totalSubscriptionPlans ?? 0;
        $totalMedia = $totalMedia ?? 0;

        $newUsersToday = $newUsersToday ?? 0;
        $eventsThisMonth = $eventsThisMonth ?? 0;
        $activePlans = $activePlans ?? $totalSubscriptionPlans;
        $expiredPlans = $expiredPlans ?? 0;
        $pendingUsers = $pendingUsers ?? 0;
        $missingTranslations = $missingTranslations ?? 0;

        $chartMonths = $chartMonths ?? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        $chartUsers = $chartUsers ?? [12, 18, 14, 25, 32, 40];
        $chartEvents = $chartEvents ?? [5, 9, 7, 14, 19, 24];
        $chartMedia = $chartMedia ?? [3, 5, 8, 11, 15, 18];
        $chartRevenue = $chartRevenue ?? [120, 180, 160, 240, 300, 360];

        $weeklyActivityLabels = $weeklyActivityLabels ?? ['Users', 'Events', 'Plans', 'Media', 'Alerts', 'Traffic'];
        $weeklyActivityData = $weeklyActivityData ?? [70, 58, 80, 62, 40, 86];

        $recentActivities = $recentActivities ?? [];
        $upcomingEvents = $upcomingEvents ?? collect();
        $latestUsers = $latestUsers ?? collect();
        $latestEvents = $latestEvents ?? collect();

        $lastUsers = count($chartUsers) > 1 ? $chartUsers[count($chartUsers)-2] : 0;
        $currentUsers = count($chartUsers) ? $chartUsers[count($chartUsers)-1] : 0;
        $userGrowth = $lastUsers > 0 ? round((($currentUsers - $lastUsers) / $lastUsers) * 100) : 0;

        $lastEvents = count($chartEvents) > 1 ? $chartEvents[count($chartEvents)-2] : 0;
        $currentEvents = count($chartEvents) ? $chartEvents[count($chartEvents)-1] : 0;
        $eventGrowth = $lastEvents > 0 ? round((($currentEvents - $lastEvents) / $lastEvents) * 100) : 0;

        $mediaCompletion = ($totalMedia > 0 && $totalEvents > 0) ? min(100, round(($totalMedia / max($totalEvents, 1)) * 10)) : 0;
        $planHealth = ($totalSubscriptionPlans > 0) ? round(($activePlans / max($totalSubscriptionPlans, 1)) * 100) : 0;
        $translationHealth = max(0, 100 - ($missingTranslations * 5));
        $reviewLoad = min(100, $pendingUsers * 10);
    @endphp

    {{-- HERO --}}
    <div class="hero-card mb-4">
        <div class="hero-overlay"></div>
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-body p-4 p-lg-5 position-relative">
                <div class="row align-items-center g-4">
                    <div class="col-lg-8">
                        <div class="d-inline-flex align-items-center hero-badge mb-3">
                            <i class="fas fa-shield-alt me-2"></i>
                            Platform Control Center
                        </div>

                        <h1 class="hero-title mb-2">Admin Dashboard</h1>
                        <p class="hero-subtitle mb-4">
                            Monitor users, events, subscriptions, media and overall system performance from one clean and powerful control center.
                        </p>

                        <div class="d-flex flex-wrap gap-2">
                            <span class="hero-pill">
                                <i class="fas fa-users me-1"></i> {{ $totalUsers }} Users
                            </span>
                            <span class="hero-pill">
                                <i class="fas fa-calendar-alt me-1"></i> {{ $totalEvents }} Events
                            </span>
                            <span class="hero-pill">
                                <i class="fas fa-layer-group me-1"></i> {{ $totalSubscriptionPlans }} Plans
                            </span>
                            <span class="hero-pill">
                                <i class="fas fa-photo-video me-1"></i> {{ $totalMedia }} Media
                            </span>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="hero-side-panel ms-lg-auto">
                            <div class="small text-muted mb-1">Today</div>
                            <div class="fs-3 fw-bold text-dark">{{ now()->format('d M Y') }}</div>
                            <div class="small text-muted mb-4">{{ now()->format('l') }}</div>

                            <div class="hero-mini-grid">
                                <div class="hero-mini-box">
                                    <span>New Users</span>
                                    <strong>{{ $newUsersToday }}</strong>
                                </div>
                                <div class="hero-mini-box">
                                    <span>Events / Month</span>
                                    <strong>{{ $eventsThisMonth }}</strong>
                                </div>
                                <div class="hero-mini-box">
                                    <span>Active Plans</span>
                                    <strong>{{ $activePlans }}</strong>
                                </div>
                                <div class="hero-mini-box">
                                    <span>Expired</span>
                                    <strong>{{ $expiredPlans }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- KPI CARDS --}}
    <div class="row g-4 mb-4">
        <div class="col-12 col-md-6 col-xl-3">
            <div class="kpi-card kpi-blue">
                <div class="kpi-top">
                    <div class="kpi-icon"><i class="fas fa-users"></i></div>
                    <span class="kpi-badge {{ $userGrowth >= 0 ? 'up' : 'down' }}">
                        <i class="fas {{ $userGrowth >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down' }} me-1"></i>
                        {{ abs($userGrowth) }}%
                    </span>
                </div>
                <p class="kpi-label">Total Users</p>
                <h2 class="kpi-value">{{ $totalUsers }}</h2>
                <p class="kpi-note mb-0">Growth compared to last period</p>
            </div>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
            <div class="kpi-card kpi-green">
                <div class="kpi-top">
                    <div class="kpi-icon"><i class="fas fa-calendar-check"></i></div>
                    <span class="kpi-badge {{ $eventGrowth >= 0 ? 'up' : 'down' }}">
                        <i class="fas {{ $eventGrowth >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down' }} me-1"></i>
                        {{ abs($eventGrowth) }}%
                    </span>
                </div>
                <p class="kpi-label">Total Events</p>
                <h2 class="kpi-value">{{ $totalEvents }}</h2>
                <p class="kpi-note mb-0">Event movement this cycle</p>
            </div>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
            <div class="kpi-card kpi-orange">
                <div class="kpi-top">
                    <div class="kpi-icon"><i class="fas fa-credit-card"></i></div>
                    <span class="kpi-badge neutral">
                        <i class="fas fa-layer-group me-1"></i> {{ $activePlans }}
                    </span>
                </div>
                <p class="kpi-label">Subscription Plans</p>
                <h2 class="kpi-value">{{ $totalSubscriptionPlans }}</h2>
                <p class="kpi-note mb-0">Active and available plan overview</p>
            </div>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
            <div class="kpi-card kpi-purple">
                <div class="kpi-top">
                    <div class="kpi-icon"><i class="fas fa-photo-video"></i></div>
                    <span class="kpi-badge neutral">
                        <i class="fas fa-database me-1"></i> Library
                    </span>
                </div>
                <p class="kpi-label">Total Media</p>
                <h2 class="kpi-value">{{ $totalMedia }}</h2>
                <p class="kpi-note mb-0">Uploaded media across the platform</p>
            </div>
        </div>
    </div>

    {{-- INSIGHTS + SYSTEM HEALTH --}}
    <div class="row g-4 mb-4">
        <div class="col-xl-8">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">Operational Insights</h4>
                            <p class="text-muted small mb-0">A fast visual summary of the most important platform indicators.</p>
                        </div>
                    </div>

                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="insight-card">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="fw-semibold">Plan Health</span>
                                    <span class="fw-bold">{{ $planHealth }}%</span>
                                </div>
                                <div class="progress modern-progress mb-3">
                                    <div class="progress-bar bg-success" style="width: {{ $planHealth }}%"></div>
                                </div>
                                <p class="small text-muted mb-0">Measures the share of active subscription plans versus total plans.</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="insight-card">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="fw-semibold">Translations Coverage</span>
                                    <span class="fw-bold">{{ $translationHealth }}%</span>
                                </div>
                                <div class="progress modern-progress mb-3">
                                    <div class="progress-bar bg-primary" style="width: {{ $translationHealth }}%"></div>
                                </div>
                                <p class="small text-muted mb-0">Tracks how complete the multilingual content currently looks.</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="insight-card">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="fw-semibold">Review Queue Load</span>
                                    <span class="fw-bold">{{ $reviewLoad }}%</span>
                                </div>
                                <div class="progress modern-progress mb-3">
                                    <div class="progress-bar bg-warning" style="width: {{ $reviewLoad }}%"></div>
                                </div>
                                <p class="small text-muted mb-0">Indicates how much pending admin review is waiting in the queue.</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="insight-card">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="fw-semibold">Media Activity</span>
                                    <span class="fw-bold">{{ $mediaCompletion }}%</span>
                                </div>
                                <div class="progress modern-progress mb-3">
                                    <div class="progress-bar bg-info" style="width: {{ $mediaCompletion }}%"></div>
                                </div>
                                <p class="small text-muted mb-0">Represents media growth relation across created event activity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">System Health</h4>
                            <p class="text-muted small mb-0">Current platform status and alerts at a glance.</p>
                        </div>
                    </div>

                    <div class="health-list">
                        <div class="health-item success">
                            <div class="health-left">
                                <div class="health-icon"><i class="fas fa-user-plus"></i></div>
                                <div>
                                    <h6 class="mb-1">New Users Today</h6>
                                    <p class="small text-muted mb-0">Fresh registrations in the last 24 hours</p>
                                </div>
                            </div>
                            <strong>{{ $newUsersToday }}</strong>
                        </div>

                        <div class="health-item warning">
                            <div class="health-left">
                                <div class="health-icon"><i class="fas fa-user-clock"></i></div>
                                <div>
                                    <h6 class="mb-1">Pending Users</h6>
                                    <p class="small text-muted mb-0">Accounts waiting for admin review</p>
                                </div>
                            </div>
                            <strong>{{ $pendingUsers }}</strong>
                        </div>

                        <div class="health-item danger">
                            <div class="health-left">
                                <div class="health-icon"><i class="fas fa-ban"></i></div>
                                <div>
                                    <h6 class="mb-1">Expired Plans</h6>
                                    <p class="small text-muted mb-0">Plans that may require renewal</p>
                                </div>
                            </div>
                            <strong>{{ $expiredPlans }}</strong>
                        </div>

                        <div class="health-item info">
                            <div class="health-left">
                                <div class="health-icon"><i class="fas fa-language"></i></div>
                                <div>
                                    <h6 class="mb-1">Missing Translations</h6>
                                    <p class="small text-muted mb-0">Language items that still need completion</p>
                                </div>
                            </div>
                            <strong>{{ $missingTranslations }}</strong>
                        </div>
                    </div>

                    <div class="health-summary mt-4">
                        <div class="small text-muted mb-2">Admin Insight</div>
                        <div class="fw-semibold">
                            {{ $pendingUsers > 5 || $expiredPlans > 5 || $missingTranslations > 5 ? 'Some areas need attention soon.' : 'The platform looks healthy and stable.' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- ANALYTICS --}}
    <div class="card border-0 shadow-sm rounded-4 mb-4 analytics-wrapper">
        <div class="card-body p-4">
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h4 class="fw-bold mb-1">Analytics Overview</h4>
                    <p class="text-muted small mb-0">Track growth, distribution, performance and weekly platform activity.</p>
                </div>
                <div class="d-flex flex-wrap gap-2">
                    <span class="chip-light"><i class="fas fa-chart-line me-1"></i> Growth</span>
                    <span class="chip-light"><i class="fas fa-chart-pie me-1"></i> Distribution</span>
                    <span class="chip-light"><i class="fas fa-chart-column me-1"></i> Revenue</span>
                    <span class="chip-light"><i class="fas fa-bullseye me-1"></i> Activity</span>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-xl-8">
                    <div class="chart-card p-4 h-100">
                        <div class="chart-head mb-3">
                            <div>
                                <h5 class="fw-bold mb-1">Monthly Growth</h5>
                                <p class="text-muted small mb-0">Users, events and media movement by month</p>
                            </div>
                            <span class="chart-tag">Line</span>
                        </div>
                        <div class="chart-box chart-xl">
                            <canvas id="growthChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="chart-card p-4 h-100">
                        <div class="chart-head mb-3">
                            <div>
                                <h5 class="fw-bold mb-1">Platform Distribution</h5>
                                <p class="text-muted small mb-0">Main system module share</p>
                            </div>
                            <span class="chart-tag">Doughnut</span>
                        </div>
                        <div class="chart-box chart-md">
                            <canvas id="distributionChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-xl-7">
                    <div class="chart-card p-4 h-100">
                        <div class="chart-head mb-3">
                            <div>
                                <h5 class="fw-bold mb-1">Revenue / Performance</h5>
                                <p class="text-muted small mb-0">Business performance preview by month</p>
                            </div>
                            <span class="chart-tag">Bar</span>
                        </div>
                        <div class="chart-box chart-lg">
                            <canvas id="performanceChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-xl-5">
                    <div class="chart-card p-4 h-100">
                        <div class="chart-head mb-3">
                            <div>
                                <h5 class="fw-bold mb-1">Weekly Activity</h5>
                                <p class="text-muted small mb-0">Operational strength across core areas</p>
                            </div>
                            <span class="chart-tag">Radar</span>
                        </div>
                        <div class="chart-box chart-lg">
                            <canvas id="activityRadarChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- QUICK ACTIONS + SUMMARY --}}
    <div class="row g-4 mb-4">
        <div class="col-xl-8">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">Quick Actions</h4>
                            <p class="text-muted small mb-0">Fast access to the tools you will use most often.</p>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6 col-xl-4">
                            <a href="{{ route('admin.users.index') }}" class="action-card text-decoration-none">
                                <div class="action-icon blue"><i class="fas fa-user-cog"></i></div>
                                <h6>Manage Users</h6>
                                <p>Review, edit and control registered users.</p>
                                <span>Open <i class="fas fa-arrow-right ms-1"></i></span>
                            </a>
                        </div>

                        <div class="col-md-6 col-xl-4">
                            <a href="{{ route('admin.subscription-plans.index') }}" class="action-card text-decoration-none">
                                <div class="action-icon orange"><i class="fas fa-credit-card"></i></div>
                                <h6>Subscription Plans</h6>
                                <p>Update pricing, features and plan visibility.</p>
                                <span>Open <i class="fas fa-arrow-right ms-1"></i></span>
                            </a>
                        </div>

                        <div class="col-md-6 col-xl-4">
                            <a href="{{ route('admin.translations.index') }}" class="action-card text-decoration-none">
                                <div class="action-icon purple"><i class="fas fa-language"></i></div>
                                <h6>Translations</h6>
                                <p>Complete and manage multilingual platform content.</p>
                                <span>Open <i class="fas fa-arrow-right ms-1"></i></span>
                            </a>
                        </div>

                        <div class="col-md-6 col-xl-4">
                            <div class="action-card">
                                <div class="action-icon green"><i class="fas fa-calendar-plus"></i></div>
                                <h6>Create Event</h6>
                                <p>Add new platform events and prepare future activity.</p>
                                <span>Shortcut <i class="fas fa-bolt ms-1"></i></span>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-4">
                            <div class="action-card">
                                <div class="action-icon dark"><i class="fas fa-upload"></i></div>
                                <h6>Upload Media</h6>
                                <p>Keep galleries and uploaded assets organized.</p>
                                <span>Shortcut <i class="fas fa-bolt ms-1"></i></span>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-4">
                            <div class="action-card">
                                <div class="action-icon red"><i class="fas fa-cog"></i></div>
                                <h6>System Settings</h6>
                                <p>Review critical platform settings and configuration.</p>
                                <span>Shortcut <i class="fas fa-bolt ms-1"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">System Summary</h4>
                            <p class="text-muted small mb-0">Essential totals and platform status at a glance.</p>
                        </div>
                    </div>

                    <div class="summary-list">
                        <div class="summary-row">
                            <span>Registered Users</span>
                            <strong>{{ $totalUsers }}</strong>
                        </div>
                        <div class="summary-row">
                            <span>Created Events</span>
                            <strong>{{ $totalEvents }}</strong>
                        </div>
                        <div class="summary-row">
                            <span>Subscription Plans</span>
                            <strong>{{ $totalSubscriptionPlans }}</strong>
                        </div>
                        <div class="summary-row">
                            <span>Uploaded Media</span>
                            <strong>{{ $totalMedia }}</strong>
                        </div>
                        <div class="summary-row">
                            <span>Events This Month</span>
                            <strong>{{ $eventsThisMonth }}</strong>
                        </div>
                        <div class="summary-row">
                            <span>New Users Today</span>
                            <strong>{{ $newUsersToday }}</strong>
                        </div>
                    </div>

                    <div class="smart-note mt-4">
                        <i class="fas fa-lightbulb me-2"></i>
                        This layout is built to help admins scan data quickly, take action faster and keep the platform under control.
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- RECENT ACTIVITY + UPCOMING EVENTS --}}
    <div class="row g-4 mb-4">
        <div class="col-xl-6">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">Recent Activity</h4>
                            <p class="text-muted small mb-0">Latest admin and system actions.</p>
                        </div>
                    </div>

                    @if(count($recentActivities))
                        <div class="timeline">
                            @foreach($recentActivities as $activity)
                                <div class="timeline-item">
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h6 class="mb-1">{{ $activity['title'] ?? 'System update' }}</h6>
                                        <p class="small text-muted mb-1">{{ $activity['description'] ?? '-' }}</p>
                                        <span class="timeline-time">{{ $activity['time'] ?? '-' }}</span>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="empty-state text-center py-5">
                            <div class="empty-icon mb-3"><i class="fas fa-stream"></i></div>
                            <h6 class="fw-bold">No recent activity</h6>
                            <p class="text-muted small mb-0">Recent system actions will appear here automatically.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-xl-6">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="section-head mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">Upcoming Events</h4>
                            <p class="text-muted small mb-0">Next scheduled events on the platform.</p>
                        </div>
                    </div>

                    @if(isset($upcomingEvents) && $upcomingEvents->count())
                        @foreach($upcomingEvents as $event)
                            <div class="event-row">
                                <div class="event-date">
                                    <span>{{ optional($event->event_date)->format('d') ?? '--' }}</span>
                                    <small>{{ optional($event->event_date)->format('M') ?? '--' }}</small>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-1">{{ $event->title ?? $event->name ?? 'Untitled Event' }}</h6>
                                    <p class="small text-muted mb-0">Code: {{ $event->code ?? '-' }}</p>
                                </div>
                                <span class="badge rounded-pill text-bg-light border px-3 py-2">Upcoming</span>
                            </div>
                        @endforeach
                    @else
                        <div class="empty-state text-center py-5">
                            <div class="empty-icon mb-3"><i class="fas fa-calendar-times"></i></div>
                            <h6 class="fw-bold">No upcoming events</h6>
                            <p class="text-muted small mb-0">Future events will appear here once created.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    {{-- LATEST USERS / LATEST EVENTS --}}
    <div class="row g-4">
        <div class="col-xl-6">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4 class="fw-bold mb-1">Latest Users</h4>
                            <p class="text-muted small mb-0">Recently registered users.</p>
                        </div>
                        <a href="{{ route('admin.users.index') }}" class="btn btn-sm btn-outline-dark rounded-pill px-3">
                            View All
                        </a>
                    </div>

                    @if(isset($latestUsers) && $latestUsers->count())
                        <div class="table-responsive">
                            <table class="table align-middle dashboard-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($latestUsers as $user)
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center gap-3">
                                                    <div class="avatar-circle">
                                                        {{ strtoupper(substr($user->name ?? 'U', 0, 1)) }}
                                                    </div>
                                                    <div class="fw-semibold text-dark">
                                                        {{ $user->name ?? 'No Name' }}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-muted">{{ $user->email ?? '-' }}</td>
                                            <td>{{ optional($user->created_at)->format('d M Y') ?? '-' }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <div class="empty-state text-center py-5">
                            <div class="empty-icon mb-3"><i class="fas fa-users"></i></div>
                            <h6 class="fw-bold">No users found</h6>
                            <p class="text-muted small mb-0">New users will appear here after registration.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-xl-6">
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4 class="fw-bold mb-1">Latest Events</h4>
                            <p class="text-muted small mb-0">Most recently created events.</p>
                        </div>
                    </div>

                    @if(isset($latestEvents) && $latestEvents->count())
                        <div class="table-responsive">
                            <table class="table align-middle dashboard-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Code</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($latestEvents as $event)
                                        <tr>
                                            <td class="fw-semibold text-dark">
                                                {{ $event->title ?? $event->name ?? 'Untitled Event' }}
                                            </td>
                                            <td>
                                                <span class="badge text-bg-light border rounded-pill px-3 py-2">
                                                    {{ $event->code ?? '-' }}
                                                </span>
                                            </td>
                                            <td>{{ optional($event->created_at)->format('d M Y') ?? '-' }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <div class="empty-state text-center py-5">
                            <div class="empty-icon mb-3"><i class="fas fa-calendar-times"></i></div>
                            <h6 class="fw-bold">No events found</h6>
                            <p class="text-muted small mb-0">Recently created events will appear here.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

</div>

<style>
    .admin-dashboard {
        --bg-soft: #f5f7fb;
        --line: #e8edf5;
        --text-main: #111827;
        --text-soft: #6b7280;
        --white: #ffffff;
        --shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
        --blue: #2563eb;
        --green: #16a34a;
        --orange: #f59e0b;
        --purple: #7c3aed;
        --danger: #dc2626;
        --dark: #111827;
    }

    .admin-dashboard .card,
    .admin-dashboard .kpi-card,
    .admin-dashboard .action-card,
    .admin-dashboard .chart-card {
        transition: all .25s ease;
    }

    .admin-dashboard .card:hover,
    .admin-dashboard .kpi-card:hover,
    .admin-dashboard .action-card:hover,
    .admin-dashboard .chart-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08) !important;
    }

    .hero-card .card {
        background:
            radial-gradient(circle at top right, rgba(124, 58, 237, 0.08), transparent 25%),
            radial-gradient(circle at left bottom, rgba(37, 99, 235, 0.08), transparent 30%),
            linear-gradient(135deg, #ffffff 0%, #f8fbff 45%, #f7f8fc 100%);
        position: relative;
    }

    .hero-title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        color: var(--text-main);
        letter-spacing: -0.03em;
    }

    .hero-subtitle {
        color: var(--text-soft);
        max-width: 720px;
        font-size: 1rem;
    }

    .hero-badge {
        background: #eef2ff;
        color: #4338ca;
        border: 1px solid #dfe5ff;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
    }

    .hero-pill {
        background: rgba(255,255,255,.85);
        border: 1px solid var(--line);
        color: #334155;
        padding: 9px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
    }

    .hero-side-panel {
        background: rgba(255,255,255,.88);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 22px;
        backdrop-filter: blur(8px);
        max-width: 350px;
        box-shadow: var(--shadow);
    }

    .hero-mini-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .hero-mini-box {
        background: #f8fafc;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 14px;
    }

    .hero-mini-box span {
        display: block;
        color: var(--text-soft);
        font-size: 12px;
        margin-bottom: 4px;
    }

    .hero-mini-box strong {
        color: var(--text-main);
        font-size: 18px;
    }

    .kpi-card {
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 24px;
        height: 100%;
        box-shadow: var(--shadow);
        position: relative;
        overflow: hidden;
    }

    .kpi-card::before {
        content: "";
        position: absolute;
        inset: 0 auto auto 0;
        width: 100%;
        height: 4px;
    }

    .kpi-blue::before { background: linear-gradient(90deg, #2563eb, #60a5fa); }
    .kpi-green::before { background: linear-gradient(90deg, #16a34a, #4ade80); }
    .kpi-orange::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .kpi-purple::before { background: linear-gradient(90deg, #7c3aed, #a78bfa); }

    .kpi-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 18px;
    }

    .kpi-icon {
        width: 54px;
        height: 54px;
        border-radius: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
    }

    .kpi-blue .kpi-icon { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .kpi-green .kpi-icon { background: linear-gradient(135deg, #16a34a, #15803d); }
    .kpi-orange .kpi-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .kpi-purple .kpi-icon { background: linear-gradient(135deg, #7c3aed, #6d28d9); }

    .kpi-badge {
        border-radius: 999px;
        padding: 7px 11px;
        font-size: 12px;
        font-weight: 700;
    }

    .kpi-badge.up {
        background: #ecfdf3;
        color: #15803d;
    }

    .kpi-badge.down {
        background: #fef2f2;
        color: #b91c1c;
    }

    .kpi-badge.neutral {
        background: #f3f4f6;
        color: #374151;
    }

    .kpi-label {
        color: var(--text-soft);
        font-weight: 600;
        margin-bottom: 6px;
    }

    .kpi-value {
        color: var(--text-main);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 6px;
    }

    .kpi-note {
        color: #94a3b8;
        font-size: 13px;
    }

    .section-head h4 {
        color: var(--text-main);
    }

    .insight-card {
        background: #f9fbff;
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 18px;
        height: 100%;
    }

    .modern-progress {
        height: 10px;
        border-radius: 999px;
        background: #e9eef5;
        overflow: hidden;
    }

    .modern-progress .progress-bar {
        border-radius: 999px;
    }

    .health-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .health-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        border-radius: 18px;
        padding: 16px;
        border: 1px solid transparent;
    }

    .health-left {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .health-icon {
        width: 46px;
        height: 46px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }

    .health-item.success {
        background: #f0fdf4;
        border-color: #bbf7d0;
    }

    .health-item.success .health-icon {
        background: #dcfce7;
        color: #15803d;
    }

    .health-item.warning {
        background: #fffaf0;
        border-color: #fde68a;
    }

    .health-item.warning .health-icon {
        background: #fef3c7;
        color: #b45309;
    }

    .health-item.danger {
        background: #fff5f5;
        border-color: #fecaca;
    }

    .health-item.danger .health-icon {
        background: #fee2e2;
        color: #b91c1c;
    }

    .health-item.info {
        background: #eff6ff;
        border-color: #bfdbfe;
    }

    .health-item.info .health-icon {
        background: #dbeafe;
        color: #1d4ed8;
    }

    .health-summary {
        background: #f8fafc;
        border: 1px dashed var(--line);
        border-radius: 18px;
        padding: 16px;
    }

    .analytics-wrapper {
        background: linear-gradient(180deg, #ffffff 0%, #fafcff 100%);
    }

    .chip-light {
        background: #f8fafc;
        border: 1px solid var(--line);
        color: #334155;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
    }

    .chart-card {
        background: linear-gradient(135deg, #ffffff 0%, #fbfdff 100%);
        border: 1px solid var(--line);
        border-radius: 24px;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
    }

    .chart-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
    }

    .chart-tag {
        background: #f3f4f6;
        color: #374151;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 999px;
    }

    .chart-box {
        position: relative;
        width: 100%;
    }

    .chart-box canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
    }

    .chart-xl { height: 360px; }
    .chart-lg { height: 320px; }
    .chart-md { height: 320px; }

    .action-card {
        display: block;
        height: 100%;
        background: #fbfcfe;
        border: 1px solid var(--line);
        border-radius: 22px;
        padding: 20px;
        box-shadow: var(--shadow);
    }

    .action-card h6 {
        color: var(--text-main);
        font-weight: 700;
        margin-bottom: 8px;
        margin-top: 14px;
    }

    .action-card p {
        color: var(--text-soft);
        font-size: 13px;
        margin-bottom: 14px;
        min-height: 40px;
    }

    .action-card span {
        color: var(--dark);
        font-size: 13px;
        font-weight: 700;
    }

    .action-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .action-icon.blue { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .action-icon.green { background: linear-gradient(135deg, #16a34a, #15803d); }
    .action-icon.orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .action-icon.purple { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
    .action-icon.dark { background: linear-gradient(135deg, #111827, #374151); }
    .action-icon.red { background: linear-gradient(135deg, #dc2626, #b91c1c); }

    .summary-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px dashed var(--line);
        color: var(--text-soft);
    }

    .summary-row strong {
        color: var(--text-main);
    }

    .smart-note {
        background: linear-gradient(135deg, #eff6ff, #f8fbff);
        border: 1px solid #dbeafe;
        color: #1e3a8a;
        border-radius: 18px;
        padding: 16px;
        font-size: 14px;
        font-weight: 600;
    }

    .timeline {
        position: relative;
    }

    .timeline::before {
        content: "";
        position: absolute;
        left: 11px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #e5e7eb;
    }

    .timeline-item {
        position: relative;
        display: flex;
        gap: 16px;
        padding-left: 34px;
        padding-bottom: 22px;
    }

    .timeline-item:last-child {
        padding-bottom: 0;
    }

    .timeline-dot {
        position: absolute;
        left: 0;
        top: 4px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #eef2ff;
        border: 6px solid #4338ca;
    }

    .timeline-content {
        background: #f8fafc;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 14px 16px;
        width: 100%;
    }

    .timeline-time {
        color: #94a3b8;
        font-size: 12px;
        font-weight: 600;
    }

    .event-row {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid #edf2f7;
    }

    .event-row:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .event-date {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        background: linear-gradient(135deg, #111827, #374151);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        flex-shrink: 0;
    }

    .event-date span {
        font-size: 18px;
        font-weight: 800;
    }

    .event-date small {
        margin-top: 4px;
        font-size: 11px;
        opacity: .85;
    }

    .dashboard-table thead th {
        font-size: 13px;
        font-weight: 700;
        color: #475467;
        border-bottom: 1px solid #e9ecef;
        white-space: nowrap;
    }

    .dashboard-table tbody td {
        padding-top: 14px;
        padding-bottom: 14px;
        vertical-align: middle;
    }

    .avatar-circle {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: linear-gradient(135deg, #111827, #374151);
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .empty-state {
        color: #6b7280;
    }

    .empty-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto;
        border-radius: 18px;
        background: #f3f4f6;
        color: #6b7280;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 1200px) {
        .chart-xl { height: 320px; }
        .chart-lg { height: 300px; }
        .chart-md { height: 300px; }
    }

    @media (max-width: 992px) {
        .hero-side-panel {
            max-width: 100%;
        }
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2rem;
        }

        .chart-xl,
        .chart-lg,
        .chart-md {
            height: 260px;
        }

        .hero-mini-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 576px) {
        .hero-mini-grid {
            grid-template-columns: 1fr;
        }

        .timeline-item {
            padding-left: 30px;
        }
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const growthCanvas = document.getElementById('growthChart');
        const distributionCanvas = document.getElementById('distributionChart');
        const performanceCanvas = document.getElementById('performanceChart');
        const activityRadarCanvas = document.getElementById('activityRadarChart');

        if (growthCanvas) {
            new Chart(growthCanvas, {
                type: 'line',
                data: {
                    labels: @json($chartMonths),
                    datasets: [
                        {
                            label: 'Users',
                            data: @json($chartUsers),
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.08)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Events',
                            data: @json($chartEvents),
                            borderColor: '#16a34a',
                            backgroundColor: 'rgba(22, 163, 74, 0.08)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Media',
                            data: @json($chartMedia),
                            borderColor: '#7c3aed',
                            backgroundColor: 'rgba(124, 58, 237, 0.08)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: '#eef2f7' },
                            ticks: { color: '#64748b' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#64748b' }
                        }
                    }
                }
            });
        }

        if (distributionCanvas) {
            new Chart(distributionCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Users', 'Events', 'Plans', 'Media'],
                    datasets: [{
                        data: [
                            {{ $totalUsers }},
                            {{ $totalEvents }},
                            {{ $totalSubscriptionPlans }},
                            {{ $totalMedia }}
                        ],
                        backgroundColor: ['#2563eb', '#16a34a', '#f59e0b', '#7c3aed'],
                        borderWidth: 0,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 12,
                                color: '#475467'
                            }
                        }
                    }
                }
            });
        }

        if (performanceCanvas) {
            new Chart(performanceCanvas, {
                type: 'bar',
                data: {
                    labels: @json($chartMonths),
                    datasets: [{
                        label: 'Performance',
                        data: @json($chartRevenue),
                        backgroundColor: [
                            '#2563eb',
                            '#3b82f6',
                            '#16a34a',
                            '#22c55e',
                            '#f59e0b',
                            '#7c3aed'
                        ],
                        borderRadius: 12,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: '#eef2f7' },
                            ticks: { color: '#64748b' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#64748b' }
                        }
                    }
                }
            });
        }

        if (activityRadarCanvas) {
            new Chart(activityRadarCanvas, {
                type: 'radar',
                data: {
                    labels: @json($weeklyActivityLabels),
                    datasets: [{
                        label: 'Weekly Activity',
                        data: @json($weeklyActivityData),
                        borderColor: '#4338ca',
                        backgroundColor: 'rgba(67, 56, 202, 0.16)',
                        borderWidth: 2,
                        pointBackgroundColor: '#4338ca',
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: { color: '#e5e7eb' },
                            angleLines: { color: '#e5e7eb' },
                            pointLabels: {
                                color: '#475467',
                                font: { size: 12, weight: 600 }
                            },
                            ticks: {
                                backdropColor: 'transparent',
                                color: '#64748b'
                            }
                        }
                    }
                }
            });
        }
    });
</script>
@endsection