<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { 
    User, 
    Mail, 
    Lock, 
    Upload, 
    Save, 
    Link2, 
    LogOut, 
    Trash2,
    Github,
    Chrome,
    Facebook,
    Apple,
    Monitor,
    Search, 
    Key, 
    Type, 
    ExternalLink,
    Settings
  } from 'lucide-svelte';
  import grab from 'grab-api.js'

  let {
    user = null,
  } = $props();
  

  let passwordData = {
    currentPassword: '',
    newPassword: ''
  };

  let loading = {
    profile: false,
    email: false,
    password: false,
    avatar: false,
    providers: {},
    signOut: false,
    deleteAccount: false,
    settings: false
  };

  let avatarInput: HTMLInputElement;
  let showDeleteConfirm = false;
  let activeTab = $state('profile'); // 'profile' or 'settings'

  // Settings form store
  const formStore = writable({
    searchEngine: 'google',
    groqApiKey: '...',
    favoriteFont: 'Inter',
    darkMode: false
  });

  const searchEngines = [
    { value: "google", label: "Google" },
    { value: "bing", label: "Bing" },
    { value: "duckduckgo", label: "DuckDuckGo" },
  ];

  let selectedEngine = $state("");
  const triggerContent = $derived(
    searchEngines.find((engine) => engine.value === selectedEngine)?.label ?? "Select search engine"
  );

  const fonts = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
  ];
  let selectedFont = $state("");

  // Initialize profile data
  onMount(() => {

  });

  // Avatar upload handler
  function handleAvatarClick() {
    avatarInput?.click();
  }

  async function handleAvatarUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;

    loading.avatar = true;
    try {
      const imageUrl = URL.createObjectURL(file);
      user.avatar = imageUrl;
      console.log('Avatar uploaded successfully');
    } catch (error) {
      console.error('Avatar upload failed:', error);
    } finally {
      loading.avatar = false;
    }
  }

  // Profile update handlers
  async function updateProfile() {
    loading.profile = true;
    try {
      console.log('Profile updated:', user.name);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      loading.profile = false;
    }
  }

  async function updateEmail() {
    loading.email = true;
    try {
      console.log('Email updated:', user.email);
    } catch (error) {
      console.error('Email update failed:', error);
    } finally {
      loading.email = false;
    }
  }

  async function changePassword() {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert('Please fill in both password fields');
      return;
    }

    loading.password = true;
    try {
      console.log('Password changed successfully');
      passwordData = { currentPassword: '', newPassword: '' };
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      loading.password = false;
    }
  }

  // Provider linking handlers
  async function linkProvider(provider: string) {
    loading.providers[provider] = true;
    try {
      console.log(`${provider} linked successfully`);
    } catch (error) {
      console.error(`${provider} linking failed:`, error);
    } finally {
      loading.providers[provider] = false;
    }
  }

  // Session management
  async function handleSignOut() {
    loading.signOut = true;
    try {
      grab('auth/sign-out', {post: true}).then(()=>  window.location.reload() )
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      loading.signOut = false;
    }
  }

  // Account deletion
  async function deleteAccount() {
    if (!showDeleteConfirm) {
      showDeleteConfirm = true;
      return;
    }

    loading.deleteAccount = true;
    try {
      console.log('Account deleted');
    } catch (error) {
      console.error('Account deletion failed:', error);
    } finally {
      loading.deleteAccount = false;
      showDeleteConfirm = false;
    }
  }

  // Settings form handler
  function handleSettingsSubmit(event: Event) {
    event.preventDefault();
    loading.settings = true;
    try {
      console.log('Settings saved:', $formStore);
    } catch (error) {
      console.error('Settings save failed:', error);
    } finally {
      loading.settings = false;
    }
  }



export const getProviderLogo = (providerName: string) => {
    switch (providerName.toLowerCase()) {
      case "google":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
 </svg>`;
      case "discord":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#7289DA" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
 </svg>`;
      case "linkedin":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
 </svg>`;
      case "facebook":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
 </svg>`;
      case "resend":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#2563EB" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
 </svg>`;
      case "microsoft entra id":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>`;
      case "github":
        return `<svg class="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"><path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"> </path> </g> </g> </g> </g></svg>`;
      default:
        return "";
    }
  };

  const providers = [
    { name: 'GitHub', icon: Github, connected: false },
    { name: 'Google', icon: Chrome, connected: false },
    { name: 'Facebook', icon: Facebook, connected: false },
    { name: 'Apple', icon: Apple, connected: false }
  ];
</script>

<svelte:head>
  <title>Profile Settings</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
  <!-- Tab Navigation -->
  <div class="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
    <button 
      class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 {activeTab === 'profile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
      onclick={() => activeTab = 'profile'}
    >
      <User size={16} />
      Profile
    </button>
    <button 
      class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 {activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
      onclick={() => activeTab = 'settings'}
    >
      <Settings size={16} />
      Settings
    </button>
  </div>

  {#if activeTab === 'profile'}
    <!-- Profile Tab Content -->
    <div class="space-y-6">
      <!-- Avatar Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User size={20} />
          Avatar
        </h2>
        
        <div class="flex items-center gap-4">
          <button 
            onclick={handleAvatarClick}
            class="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300 hover:border-primary-500 flex items-center justify-center group"
            disabled={loading.avatar}
          >
            {#if user.avatar}
              <img src={user.avatar} alt="Avatar" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <Upload size={20} class="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            {:else}
              <Upload size={24} class="text-gray-400 group-hover:text-primary-500" />
            {/if}
          </button>
          
          <div>
            <p class="text-sm text-gray-600 mb-1">Click on the avatar to upload a custom one from your files.</p>
            <p class="text-xs text-gray-500">An avatar is optional but strongly recommended.</p>
          </div>
        </div>

        <input 
          bind:this={avatarInput}
          type="file" 
          accept="image/*" 
          class="hidden" 
          onchange={handleAvatarUpload}
        />
      </div>

      <!-- Name Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Name</h2>
        <p class="text-sm text-gray-600 mb-4">Please enter your full name, or a display name.</p>
        
        <div class="flex gap-3">
          <input 
            bind:value={user.name}
            type="text" 
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your name"
            maxlength="32"
          />
          <Button 
            onclick={updateProfile}
            disabled={loading.profile}
            variant="outline"
          >
            {#if loading.profile}
              <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            {:else}
              Save
            {/if}
          </Button>
        </div>
        
        <p class="text-xs text-gray-500 mt-2">Please use 32 characters at maximum.</p>
      </div>

      <!-- Email Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Mail size={20} />
          Email
        </h2>
        <p class="text-sm text-gray-600 mb-4">Enter the email address you want to use to log in.</p>
        
        <div class="flex gap-3">
          <input 
            bind:value={user.email}
            type="email" 
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          <Button 
            onclick={updateEmail}
            disabled={loading.email}
            variant="outline"
          >
            {#if loading.email}
              <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            {:else}
              Save
            {/if}
          </Button>
        </div>
        
        <p class="text-xs text-gray-500 mt-2">Please use a valid email address.</p>
      </div>

      <!-- Change Password Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Lock size={20} />
          Change Password
        </h2>
        <p class="text-sm text-gray-600 mb-4">Enter your current password and a new password.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              bind:value={passwordData.currentPassword}
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Current Password"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              bind:value={passwordData.newPassword}
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="New Password"
            />
          </div>
          
          <div class="flex justify-between items-center">
            <p class="text-xs text-gray-500">Please use 8 characters at minimum.</p>
            <Button 
              onclick={changePassword}
              disabled={loading.password}
              variant="outline"
            >
              {#if loading.password}
                <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              {:else}
                Save
              {/if}
            </Button>
          </div>
        </div>
      </div>

      <!-- Providers Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Providers</h2>
        <p class="text-sm text-gray-600 mb-4">Connect your account with a third-party service.</p>
        
        <div class="space-y-3">
          {#each providers as provider}
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div class="flex items-center gap-3">
                <svelte:component this={provider.icon} size={20} class="text-gray-600" />
                <span class="font-medium text-gray-900">{provider.name}</span>
              </div>
              
              <Button 
                onclick={() => linkProvider(provider.name.toLowerCase())}
                disabled={loading.providers[provider.name.toLowerCase()]}
                size="sm"
              >
                {#if loading.providers[provider.name.toLowerCase()]}
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {:else}
                  Link
                {/if}
              </Button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Sessions Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Sessions</h2>
        <p class="text-sm text-gray-600 mb-4">Manage your active sessions and revoke access.</p>
        
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-md">
          <div class="flex items-center gap-3">
            <Monitor size={20} class="text-gray-600" />
            <span class="font-medium text-gray-900">Current Session</span>
          </div>
          
          <Button 
            onclick={handleSignOut}
            disabled={loading.signOut}
            variant="outline"
            size="sm"
          >
            {#if loading.signOut}
              <div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            {:else}
              <LogOut size={16} />
              Sign Out
            {/if}
          </Button>
        </div>
      </div>

      <!-- Delete Account Section -->
      <div class="bg-white rounded-lg shadow-sm border border-red-200 p-6">
        <h2 class="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
          <Trash2 size={20} />
          Delete Account
        </h2>
        <p class="text-sm text-red-600 mb-4">
          Permanently remove your account and all of its contents. This action is not reversible, so please continue with caution.
        </p>
        
        {#if showDeleteConfirm}
          <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p class="text-sm text-red-800 font-medium mb-2">Are you absolutely sure?</p>
            <p class="text-sm text-red-700">This action cannot be undone. This will permanently delete your account and remove all associated data.</p>
          </div>
          
          <div class="flex gap-3">
            <Button 
              onclick={() => showDeleteConfirm = false}
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onclick={deleteAccount}
              disabled={loading.deleteAccount}
              variant="destructive"
            >
              {#if loading.deleteAccount}
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {:else}
                Yes, Delete Account
              {/if}
            </Button>
          </div>
        {:else}
          <Button 
            onclick={deleteAccount}
            variant="destructive"
          >
            Delete Account
          </Button>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Settings Tab Content -->
    <form onsubmit={handleSettingsSubmit} class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Search Engine -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Search size={20} />
              Preferred Search Engine
            </label>

            <Select.Root bind:value={selectedEngine}>
              <Select.Trigger class="w-full">
                <span class="text-gray-700">
                  {triggerContent}
                </span>
              </Select.Trigger>
              <Select.Content>
                {#each searchEngines as engine}
                  <Select.Item value={engine.value}>{engine.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Groq API Key -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <label for="groq-api-key" class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Key size={20} />
                Groq API Key
              </label>
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                Get Free API Key 
                <ExternalLink size={14} />
              </a>
            </div>
            <Input id="groq-api-key" type="password" bind:value={$formStore.groqApiKey} placeholder="Enter your Groq API key" />
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Font Selection -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Type size={20} />
              Preferred Font
            </label>
          
            <Select.Root bind:value={selectedFont}>
              <Select.Trigger class="w-full">
                <span class="text-gray-700">
                  {fonts.find((font) => font.value === selectedFont)?.label ?? "Select font"}
                </span>
              </Select.Trigger>
              <Select.Content>
                {#each fonts as font}
                  <Select.Item value={font.value}>{font.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Dark Mode -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <label for="dark-mode" class="text-lg font-semibold text-gray-900">Dark Mode</label>
              <Switch id="dark-mode" bind:checked={$formStore.darkMode} />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-6">
        <Button 
          onclick={handleSignOut}
          variant="outline"
          class="flex-1"
        >
          Sign Out
        </Button>
        <Button 
          type="submit" 
          disabled={loading.settings}
          class="flex-1"
        >
          {#if loading.settings}
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {/if}
          Save Settings
        </Button>
      </div>
    </form>
  {/if}
</div>

<style>
  label {
    font-weight: 500;
  }
</style>