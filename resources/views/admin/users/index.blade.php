@extends('admin.layouts.app')

@section('content')
    <div class="container-fluid">

        <div class="main-content">
            <div class="create-event-head">
                <div class="view-event-text">
                    <h2>Users</h2>
                    <p>Here you can find all Users</p>
                    <button type="button" class="login-btn" onclick="prepareCreateForm()" data-bs-toggle="modal" data-bs-target="#userModal">
                        <i class="fa-solid fa-circle-plus"></i> Create User
                    </button>
                </div>
            </div>
            <div class="row">
                @foreach($users as $user)
                    <div class="col-md-4 mb-4" onclick="prepareEditForm({{ $user->id }})" style="cursor: pointer">
                        <div class="event-card">
                            <div class="event-card-header">
                                <h3>{{ $user->name }}</h3>
                            </div>
                            <span class="plan-badge text-capitalize">{{ $user->email }}</span>
                            <div class="event-card-list">
                                <i class="fa-solid fa-calendar-days"></i>
                                <h5><span>Created on</span> {{ $user->created_at->format('d M Y') }}</h5>
                            </div>
                            @if($user->activeSubscription()->first()->payment_method === 'free')
                                <div class="event-card-btn">
                                    Free Subscription
                                </div>
                            @else
                                <div class="event-card-btn">
                                    Paid Subscription
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>


    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content add-event">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalLabel">Manage User</h5>
                    <button type="button" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-area">
                        <form id="userForm" method="POST">
                            @csrf
                            <input type="hidden" id="formMethod" name="_method" value="POST">
                            <input type="hidden" id="userId" name="user_id">

                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <div class="input-wrapper">
                                    <input type="text" id="name" name="name" placeholder="Full Name" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-wrapper">
                                    <input type="email" id="email" name="email" placeholder="Email" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="input-wrapper">
                                    <input type="password" id="password" name="password" placeholder="Password">
                                    <small class="text-muted">Leave blank to keep current password (for updates)</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="is_paid">Type</label>
                                <p>If it is checked user will be Paid Member</p>
                                <li class="animation-checkbox" style="list-style-type: none">
                                    <input class="styled-checkbox" id="is_paid" name="is_paid" type="checkbox" value="1">
                                    <label for="is_paid">Paid Member</label>
                                </li>
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="submit" class="login-btn mb-3">
                                    <span id="submitButtonText">Create User</span>
                                </button>
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="button" id="deleteButton" class="login-btn"
                                        style="display: none;" onclick="confirmDelete()">
                                    Delete User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content add-event">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModal">Confirm Delete</h5>
                    <button type="button" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-area">

                            <p>Are you sure you want to delete this user? This action cannot be undone.</p>

                            <div class="d-flex justify-content-between">
                                <button type="button" id="deleteButton" class="login-btn"
                                        onclick="deleteUser()">
                                    Delete User
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function prepareCreateForm() {
            document.getElementById('userModalLabel').innerText = 'Create User';
            document.getElementById('formMethod').value = 'POST';
            document.getElementById('userForm').action = "{{ route('admin.users.store') }}";
            document.getElementById('userId').value = '';
            document.getElementById('submitButtonText').innerText = 'Create User';

            // Reset form
            document.getElementById('userForm').reset();
            document.getElementById('password').required = true;
        }

        function prepareEditForm(userId) {
            document.getElementById('userModalLabel').innerText = 'Edit User';
            document.getElementById('formMethod').value = 'PUT';
            document.getElementById('userForm').action = `/admin/users/${userId}`;
            document.getElementById('userId').value = userId;
            document.getElementById('submitButtonText').innerText = 'Update User';
            document.getElementById('deleteButton').style.display = 'block';

            // Fetch user data with subscription
            fetch(`/admin/users/${userId}/edit`)
                .then(response => response.json())
                .then(data => {
                    const user = data.user;

                    document.getElementById('name').value = user.name;
                    document.getElementById('email').value = user.email;

                    // Set is_paid checkbox based on subscription
                    document.getElementById('is_paid').checked = data.is_paid;

                    // Password not required for updates
                    document.getElementById('password').required = false;

                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('userModal'));
                    modal.show();
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    alert('Failed to load user data');
                });
        }

        function confirmDelete() {
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();
        }

        function deleteUser() {
            const userId = document.getElementById('userId').value;
            fetch(`/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        alert('Failed to delete user');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the user');
                });
        }
    </script>

@endsection
