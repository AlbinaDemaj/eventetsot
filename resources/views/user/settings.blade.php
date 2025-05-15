@extends('user.layouts.app')

@section('content')
    <div class="container-fluid event-setting">

        <div class="setting-content">
            <div class="settings-container">
                <!-- Sidebar Tabs -->
                <div class="sidebar">
                    <div class="tab active" onclick="switchTab('general')">
                        <i class="fa-solid fa-briefcase"></i> General
                    </div>
                    <div class="tab" onclick="switchTab('appearance')">
                        <i class="fa-solid fa-book-journal-whills"></i> Appearance
                    </div>
                </div>

                <!-- Content Area -->
                <div class="tab-content" id="general">
                    <div class="form-group">
                        <label for="name">Event Name</label>
                        <p>It'll be used through the app and will be showed to your guests.</p>
                        <div class="form-area">
                            <div class="form-group">
                                <div class="input-wrapper">
                                    <input type="text" name="name" id="name" value="{{ $selectedEvent->name }}" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="event_date">Event Date</label>
                        <p>Set when your event is scheduled to start.</p>
                        <div class="form-area">
                            <div class="form-group">
                                <div class="input-wrapper">
                                    <input type="date" name="event_date" id="event_date" value="{{ $selectedEvent->event_date }}" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="appearance" style="display:none;">
                    <!-- Event Logo -->
                    <div class="setting-group">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="setting-info">
                                    <h3>Event Logo</h3>
                                    <p>Brand your event with a logo that will be publically shown throughout the event. For best results, use square photos (1:1).</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="upload-box">
                                    <canvas id="canv1"></canvas>
                                    <input type="file" name="logo" multiple="false" accept="image/*" id="finput" onchange="upload()">
                                    <h3>Upload</h3>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Display Language -->
                    <div class="setting-group">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="setting-info">
                                    <h3>Display Language</h3>
                                    <p>Localize the experience according your audience lanaguage.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="lang-select">
                                    <select class="my-select selectpicker" name="locale" data-container="body">
                                        <option value="en" {{ $selectedEvent->locale === 'en' ? 'selected' : '' }}>English</option>
                                        <option value="sq" {{ $selectedEvent->locale === 'sq' ? 'selected' : '' }}>Albanian</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Welcome Screen -->
                    <div class="setting-group">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="setting-info">
                                    <h3>Welcome Screen</h3>
                                    <p>Set up an introductory screen for guests' first visit, with a form to collect their info.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-area">
                                    <div class="form-group">
                                        <div class="input-wrapper">
                                            <input type="text" id="note" name="note" placeholder="Add Note" value="{{ $selectedEvent->note }}" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
