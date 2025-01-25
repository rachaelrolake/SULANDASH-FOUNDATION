let HOST = "https://sulandsahfoundation.org/php/index.php"

let datax = localStorage.getItem("userData")

console.log(datax.id)

// $("#name").html(THE_SESSION.fullname)

$("#aside").html(`

<ul id="sidebarnav">
<li class="nav-small-cap">
  <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
  <span class="hide-menu">Home</span>
</li>
<li class="sidebar-item">
  <a class="sidebar-link" href="./dashboard.html" aria-expanded="false">
    <span>
      <i class="ti ti-layout-dashboard"></i>
    </span>
    <span class="hide-menu">Dashboard</span>
  </a>
</li>
<li class="sidebar-item ">
  <a class="sidebar-link dggg" href="./primary.html" aria-expanded="false">
    <span>
    <i class="ti ti-user-plus"></i>
    </span>
    <span class="hide-menu">Primary</span>
  </a>
</li>
<li class="sidebar-item">
  <a class="sidebar-link dgg" href="./secondary.html" aria-expanded="false">
    <span>
    <i class="ti ti-user-plus"></i>
    </span>
    <span class="hide-menu">Secondary</span>
  </a>
</li>
<li class="sidebar-item">
  <a class="sidebar-link dg" href="./college.html" aria-expanded="false">
    <span>
    <i class="ti ti-user-plus"></i>
    </span>
    <span class="hide-menu">College</span>
  </a>
</li>
</ul>


`)


$("#side").html(`

<nav class="navbar navbar-expand-lg navbar-light">
<ul class="navbar-nav">
  <li class="nav-item d-block d-xl-none">
    <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
      <i class="ti ti-menu-2"></i>
    </a>
  </li>
</ul>
<div class="navbar-collapse justify-content-end px-0" id="navbarNav">
 
  <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
  <p >Admin</p>
  <a href="" class="btn btn-outline-primary mx-3 mt-2 d-block" id="logout">Logout</a>
  </ul>
</div>
</nav>

`)


$("#logout").on("click", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "You want to Logout",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Your Account have been successfully Logged out.", "success");
      localStorage.removeItem("userData");
      window.location.href = "../";
    }
  });
});