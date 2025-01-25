<?php
    $hostname_sKhalid = "skhalid.ng";
    $database_sKhalid = "skhalidn_consult";
    $username_sKhalid = "skhalidn_consult";
    $password_sKhalid = "skhalid@2022";
    $sKhalid = mysqli_connect($hostname_sKhalid, $username_sKhalid, $password_sKhalid, $database_sKhalid) or trigger_error(mysqli_error($sKhalid),E_USER_ERROR);
?>