// Konfigurasi Supabase
const SUPABASE_URL = 'https://nfsjebcittzopcndvyrg.supabase.co'
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mc2plYmNpdHR6b3BjbmR2eXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzkwNzIsImV4cCI6MjA3NjcxNTA3Mn0.2X0N2zWbzxt6wyHH6knPdfi-LmwPbbF6jCmhhLcALKY"; // Ganti dengan anon key dari Supabase
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// Fungsi Alert
// ============================================================
function showAlert(message, type = "info") {
    const alertContainer = document.getElementById("alert-container");
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert ${type}">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 4000);
}

// ============================================================
// Tab Login / Register
// ============================================================
function switchTab(tab) {
    const loginTab = document.querySelector(".tab:nth-child(1)");
    const registerTab = document.querySelector(".tab:nth-child(2)");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (tab === "login") {
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    } else {
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    }
}

// ============================================================
// Fungsi Login
// ============================================================
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });

        if (error) throw error;

        showAlert("Login berhasil! Mengalihkan ke galeri...", "success");

        // Simpan sesi login
        localStorage.setItem("session", JSON.stringify(data.session));

        // Redirect ke gallery.html
        setTimeout(() => {
            window.location.href = "gallery.html";
        }, 1200);

    } catch (error) {
        showAlert(`Login gagal: ${error.message}`, "error");
    }
}

// ============================================================
// Fungsi Register
// ============================================================
async function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;

    if (password !== confirm) {
        showAlert("Password tidak cocok, silakan periksa kembali!", "error");
        return;
    }

    try {
        const { data, error } = await sb.auth.signUp({ email, password });

        if (error) throw error;

        showAlert("Pendaftaran berhasil! Silakan cek email untuk verifikasi.", "success");
        switchTab("login");

    } catch (error) {
        showAlert(`Pendaftaran gagal: ${error.message}`, "error");
    }
}

// ============================================================
// Fungsi Logout
// ============================================================
async function handleLogout() {
    await sb.auth.signOut();
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

// ============================================================
// Fungsi Social Login
// ============================================================
async function handleSocialLogin(provider) {
    const { data, error } = await sb.auth.signInWithOAuth({ provider });

    if (error) showAlert(`Gagal login dengan ${provider}: ${error.message}`, "error");
    else showAlert(`Mengalihkan ke ${provider}...`, "info");
}

// ============================================================
// Fungsi Lupa Password
// ============================================================
async function handleForgotPassword() {
    const email = prompt("Masukkan email Anda untuk reset password:");
    if (!email) return;

    const { error } = await sb.auth.resetPasswordForEmail(email);

    if (error) showAlert(`Gagal mengirim email reset: ${error.message}`, "error");
    else showAlert("Email reset password telah dikirim!", "success");
}

// ============================================================
// Cek Status Login Saat Halaman Dibuka
// ============================================================
async function checkSession() {
    const { data } = await sb.auth.getSession();
    if (data?.session) {
        // Sudah login → langsung ke gallery.html
        window.location.href = "gallery.html";
    }
}

// Jalankan saat halaman login dibuka
checkSession();
