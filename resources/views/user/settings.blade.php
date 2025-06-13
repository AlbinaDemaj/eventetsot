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
                    <div class="form-group">
                        <div for="event_link" class="event-link">Event Custom Link
                            <p><i class="fa-solid fa-star"></i> Pro <a href="#">Upgrade</a></p>
                        </div>
                        <p>Choose a unique link ending to easily share your event with guests.</p>
                        <div class="form-area custom-url-main">
                            <div class="input-wrapper setting-event-custom">
                                <input type="text" value="{{ url('events/') }}/" readonly class="event-url"/>
                                <input type="text" name="code" class="custom-url" id="url" value="{{ $selectedEvent->code }}" required>
                                <button class="opn-btn">Save</button>
                            </div>
                            <button type="button" class="login-btn suggest-btn">
                                <i class="fa-solid fa-wand-magic-sparkles"></i> Suggestions
                            </button>
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
                                        <div class="input-wrapper text-end">
                                            <button type="button" class="login-btn add-welcome" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Add Welcome Screen
                                            </button>
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


    {{-- Welcome screen --}}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <form action="{{ route('user.events.update', $selectedEvent) }}" id="guestForm" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="modal-header">
                        <div class="modal-head">
                            <h5 class="modal-title" id="exampleModalLabel">Welcome Screen Settings</h5>
                            <p>Set up a welcome screen that appears once for first-time guests.</p>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="welcome-tabbing">
                            <div class="row">
                                <div class="col-md-8">
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-appearance-tab" data-bs-toggle="pill" data-bs-target="#pills-appearance" type="button" role="tab" aria-controls="pills-appearance" aria-selected="true">Appearance</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-guest-tab" data-bs-toggle="pill" data-bs-target="#pills-guest" type="button" role="tab" aria-controls="pills-guest" aria-selected="false">Guest Form</button>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="pills-tabContent" style="display: block">
                                        <!-- Appearance Tab -->
                                        <div class="tab-pane fade show active" id="pills-appearance" role="tabpanel" aria-labelledby="pills-appearance-tab">
                                            <div class="welcome-screen-appearnce">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <label for="title">Title</label>
                                                            <p>Enter the main title for your welcome screen.</p>
                                                            <div class="form-area">
                                                                <div class="form-group">
                                                                    <div class="input-wrapper">
                                                                        <input type="text" name="title" id="title" value="{{ old('title', $selectedEvent->name) }}" required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="font"></label>
                                                            <p class="pt-1">Choose font:</p>
                                                            <div class="form-area">
                                                                <div class="form-group">
                                                                    <div class="input-wrapper">
                                                                        <input type="text" name="font" id="font" value="{{ old('font', $selectedEvent->font) }}" required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="description">Description</label>
                                                            <p>Add a introduction text below the main title.</p>
                                                            <div class="form-area">
                                                                <div class="form-group">
                                                                    <div class="input-wrapper">
                                                                        <input type="text" name="description" id="description" value="{{ old('description', $selectedEvent->description) }}" required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <div class="form-group">
                                                            <label for="button_text">Button</label>
                                                            <p>Set the text of the submission button.</p>
                                                            <div class="form-area">
                                                                <div class="form-group">
                                                                    <div class="input-wrapper">
                                                                        <input type="text" name="button_text" id="button_text" value="{{ old('button_text', $selectedEvent->button_text ?? 'Continue') }}" required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label for="is_animated">Background</label>
                                                                    <p>Set a background for the welcome screen.</p>
                                                                    <li class="animation-checkbox">
                                                                        <input class="styled-checkbox" id="is_animated" name="is_animated" type="checkbox" value="1" {{ old('is_animated', $selectedEvent->is_animated) ? 'checked' : '' }}>
                                                                        <label for="is_animated">Animated</label>
                                                                    </li>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="change-bg">
                                                                    @if($selectedEvent->background)
                                                                        <img id="background-preview" src="{{ asset('storage/' . $selectedEvent->background) }}" />
                                                                    @else
                                                                        <img id="background-preview" src="../user/assets/img/colored-paper.jpg" />
                                                                    @endif
                                                                    <input type="file" name="background" id="background" style="display: none;" accept="image/*">
                                                                    <button type="button" class="btn change-bg-btn" onclick="document.getElementById('background').click()">Change</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Guest Form Tab -->
                                        <div class="tab-pane fade" id="pills-guest" role="tabpanel" aria-labelledby="pills-guest-tab">
                                            <div class="guest-tab-detail">
                                                <p>Create a form to collect guest information before they proceed to your album. Add new fields as needed, or rearrange existing ones by dragging.</p>

                                                <div id="dynamic-fields-container">
                                                    @foreach(old('dynamic_fields', $selectedEvent->dynamic_fields ?? []) as $index => $field)
                                                        <div class="form-group dynamic-field mb-3 p-3 border rounded" data-index="{{ $index }}">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Field Label</label>
                                                                        <input type="text"
                                                                               name="dynamic_fields[{{ $index }}][label]"
                                                                               value="{{ $field['label'] ?? '' }}"
                                                                               class="form-control field-label"
                                                                               placeholder="e.g. Full Name"
                                                                               required>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group">
                                                                        <label>Field Type</label>
                                                                        <select name="dynamic_fields[{{ $index }}][type]" class="form-control field-type">
                                                                            <option value="text" {{ isset($field['type']) && $field['type'] == 'text' ? 'selected' : '' }}>Text</option>
                                                                            <option value="email" {{ isset($field['type']) && $field['type'] == 'email' ? 'selected' : '' }}>Email</option>
                                                                            <option value="tel" {{ isset($field['type']) && $field['type'] == 'tel' ? 'selected' : '' }}>Telephone</option>
                                                                            <option value="number" {{ isset($field['type']) && $field['type'] == 'number' ? 'selected' : '' }}>Number</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label>Required</label>
                                                                        <div class="form-check">
                                                                            <input type="checkbox"
                                                                                   name="dynamic_fields[{{ $index }}][required]"
                                                                                   class="form-check-input field-required">
                                                                            <label class="form-check-label">Required field</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-1 d-flex align-items-end">
                                                                    <button type="button" class="btn btn-sm btn-danger remove-field mb-3">
                                                                        <i class="fas fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                </div>

                                                <button type="button" id="add-field" class="btn btn-primary mt-3">
                                                    <i class="fas fa-plus"></i> Add Field
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Preview Column -->
                                <div class="col-md-4">
                                    <div class="welcomescreen-mbl-view">
                                        <div class="center-card">
                                            <div class="card-caption">
                                                <div class="img-wrap">
                                                    @if($selectedEvent->logo)
                                                        <img src="{{ asset('storage/' . $selectedEvent->logo) }}">
                                                    @else
                                                        <img src="{{ asset('website/img/img-round.jpg') }}">
                                                    @endif
                                                </div>
                                                <h4 class="m-0" id="preview-title">{{ $selectedEvent->name }}</h4>
                                                <p id="preview-description">{{ $selectedEvent->description ?? 'Share your photo & video with us' }}</p>
                                                <div id="preview-fields-container">
                                                    @foreach($selectedEvent->dynamic_fields ?? [] as $index => $field)
                                                        <div class="input-wrap mb-2" data-index="{{ $index }}">
                                                            <input type="{{ $field['type'] ?? 'text' }}"
                                                                   class="form-control"
                                                                   placeholder="{{ $field['label'] ?? 'Field ' . ($index + 1) }}"
                                                                {{ isset($field['required']) && $field['required'] ? 'required' : '' }}>
                                                        </div>
                                                    @endforeach
                                                </div>
                                                <div class="submit-wrap">
                                                    <button type="button" class="login-btn" id="preview-button">{{ $selectedEvent->button_text ?? 'Continue' }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer welcome-modal-ft">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn login-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection
